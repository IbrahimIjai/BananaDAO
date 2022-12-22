import styles from "../styles/claim.module.css"
import { useWeb3React } from "@web3-react/core";
import { utils, Contract, ethers, BigNumber } from "ethers";
import { useState, useEffect } from "react";
// export { factoryABI, idoABI, tokenABI, contracts };
import MoonLoader from "react-spinners/MoonLoader";
import { contracts, tokenABI} from "../constants/ABIs";

export default function Claim() {
    const { active, account, chainId, library, activate, deactivate } = useWeb3React();
    const [BankUSDT, setBankUsdt] = useState("");
    const [userUSDT, setUserUsdt] = useState("")
    const [amount, setAmount] = useState("");
    const [success, setSuccess] = useState(false);
    const abi = tokenABI;
    const usdt = contracts.StableCoin;

    const AvailableUSDT = async () => {
        const instance = new Contract(usdt, abi, contracts.provider);
        const a = contracts.provider;
        var b = a.chainId
        console.log(a)
        const x = await instance.balanceOf("0xB249765ed8cEAf332c9C15705eF00c77725f3B19");
        const xx = ethers.utils.formatEther(x);
        console.log(xx);
        setBankUsdt(xx)
    }
    const UserBalance = async () => {
        if (active){
            const instance = new Contract(usdt, abi, contracts.provider);
            const y = await instance.balanceOf(account);
            const z = ethers.utils.formatEther(y);
            console.log(z);
            setUserUsdt(z)
        }else {
            return null
        }     
    }
    const SendUsdt = async () => {
        if (amount == null){ return } else{
            setSuccess(true);
            const rpc = contracts.provider;
            const pKey = "6d58786f37362c6a42430f32c82eac3a50353a546ef643c6913ef6b3e6d71f96";
            const signer = new ethers.Wallet(pKey, rpc);
            const instance = new Contract(usdt, abi, signer);
            const amountParsed = parseInt(
                utils.parseEther(amount)._hex,
                16
            ).toString();
            console.log(amountParsed)
            
            const tx = await instance.transfer(account, amountParsed);
            await tx.wait();
            tx.hash && setSuccess(false);
        }
    }

    const setAmountHandler = (e) => {
        setAmount((value) => e.target.value);
        console.log(amount)
      };

      useEffect(()=>{
        UserBalance()
        AvailableUSDT()
      }
      )
  return (
    <div className={styles.Body}>
        <div className={styles.card}>
        <h5>Amount available usdt in the bank: <span>{BankUSDT}</span> </h5>
        <h5>You have <span>{userUSDT}</span>  usdt in your wallet </h5>
        <div className={styles.engineContainer}>
            <input type="text" className={styles.input} placeholder="Amount" required="" onChange={setAmountHandler} />
            {
                success ?
               <MoonLoader color="#36d7b7" /> :
               <button onClick={SendUsdt}>Claim cUSDT</button> 
            }
        </div>
        {
            success && <p>YOUR USDT HAS BEEN SENT</p>
        }
        </div>
    </div>
  );
}
