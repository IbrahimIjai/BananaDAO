import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import Link from "next/link";
import { connectors } from "./connectors";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { utils } from "ethers";
import Image from "next/image";
import styles from "../styles/Connect.module.css";
export default function Connect() {
  const { active, account, chainId, library, activate, deactivate } =
    useWeb3React();
  const provider = library;
  const [balanceOfAccount, setBal] = useState(null);
  const bal = async () => {
    const balance = await provider.getBalance(account);
    const userBalance = utils.formatEther(balance);
    const bal = userBalance.toString();
    const kcs = bal.substring(0, 4);
    setBal(kcs);
  };
  if (active) {
    bal();
  }

  async function inChain() {
    if (!window.ethereum) {
      alert(
        "Metamask is not installed on your Browser. Install via https://metamask.io/download"
      );
      return false;
    }
    if (chainId === "322") {
      return true;
    }
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "322" }],
      });
      return true;
    } catch (switchError) {
      if (
        switchError.code === 4902 ||
        switchError.data?.originalError?.code === 4902
      ) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "322",
                chainName: "KCC Testnet",
                rpcUrls: ["https://rpc-testnet.kcc.network"],
                nativeCurrency: {
                  name: "KCS",
                  symbol: "tKCS",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://scan-testnet.kcc.network"],
              },
            ],
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        console.error(switchError);
      }
    }
    return false;
  }

  const connect = async () => {
    try {
      await activate(connectors.injected);
      await inChain();
      window.localStorage.setItem("isWalletConnected", true);
      setConnectModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  const connectWC = async () => {
    try {
      await activate(connectors.walletConnect);
      window.localStorage.setItem("isWalletConnected", true);
      setConnectModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const disconnect = async () => {
    try {
      deactivate(connectors.injected);
      window.localStorage.setItem("isWalletConnected", false);
      setDisconnectModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        try {
          await activate(connectors.injected);
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
  }, []);

  const [connectModal, setConnectModal] = useState(false);
  const [disconnectModal, setDisconnectModal] = useState(false);

  return (
    <div className={styles.container}>
      {active ? (
        <div
          className={styles.disconnect}
          onClick={() => setDisconnectModal(true)}
        >{`${account.slice(0, 6)}...${account.slice(37, 42)}`}</div>
      ) : (
        <div className={styles.connect} onClick={() => setConnectModal(true)}>
          Connect Wallet
        </div>
      )}
      {connectModal && (
        <div className={styles.modalContainer}>
          <div className={styles.modal}>
            <div
              className={styles.closeModal}
              onClick={() => setConnectModal(false)}
            >
              <IoIosCloseCircleOutline />
            </div>
            <div className={styles.modalMenu}>
              <div className={styles.modalInternal}>
                <h1>Connect Your Wallet</h1>
                <div className={styles.wallets}>
                  <p>Select an option to connect your wallet</p>
                  <div className={styles.walletLists}>
                    <div className={styles.walletList} onClick={connect}>
                      <Image
                        src="/metamask.png"
                        width={40}
                        height={40}
                        alt="imagelogo"
                      />
                      <span>Metamask</span>
                    </div>
                    <div className={styles.walletList} onClick={connect}>
                      <Image
                        src="/tokenpock.png"
                        width={40}
                        height={40}
                        alt="imagelogo"
                      />
                      <span>TokenPocket</span>
                    </div>
                    <div className={styles.walletList} onClick={connectWC}>
                      <Image
                        src="/walletcon2.png"
                        width={40}
                        height={40}
                        alt="imagelogo"
                      />
                      <span>WalletConnect</span>
                    </div>
                    <div className={styles.Learn}>
                      <Link href="https://kuswap.finance/#/swap">
                        <a>Learn How to Connect</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {disconnectModal && (
        <div className={styles.board}>
          <div>
            <div
              className={styles.closeModal}
              onClick={() => setDisconnectModal(false)}
            >
              <IoIosCloseCircleOutline />
            </div>
            <div className={styles.smallBoard}>
              <p>{`${account.slice(0, 6)}...${account.slice(38, 42)}`} </p>
              <p>Wallet balance: {balanceOfAccount}</p>
              <Link
                href={`https://scan.kcc.io/address/${account}`}
                className={styles.recentTxns}
              >
                <a style={{ color: "#ACAFB4" }}>
                  Check Recent transactions here
                </a>
              </Link>
              <button style={{ marginTop: "1.3rem" }} onClick={disconnect}>
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
