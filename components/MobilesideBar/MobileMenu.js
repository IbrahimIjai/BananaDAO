import styles from "./MobileMenu.module.css";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HiOutlineHome } from "react-icons/hi"; //Home
import { GiMissileLauncher } from "react-icons/gi"; //launchpad
import { RiExchangeFundsFill } from "react-icons/ri"; //stake

export default function MobileMenu({ handleMobileClick, openMM }) {
  //states
  const [LaunchPadMenu, setLaunchPadMenu] = useState(false);
  const [stakingMenu, setStakingMenu] = useState(false);
  //states handlers
  const HandleLaunchPadMenu = () => {
    setLaunchPadMenu(!LaunchPadMenu);
  };
  const HandleStakingMenu = () => {
    setStakingMenu(!stakingMenu);
  };

  const itemVariants = {
    closed: {
      opacity: 0,
    },
    open: { opacity: 1 },
  };

  const sideVariants = {
    closed: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: 1,
      },
    },
  };
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (openMM && ref.current && !ref.current.contains(e.target)) {
        handleMobileClick();
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [handleMobileClick, openMM]);

  return (
    <AnimatePresence>
      <motion.div
        className={styles.Container}
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        exit={{
          opacity: 0,
          transition: { delay: 2, duration: 2 },
        }}
      >
        {openMM && (
          <motion.div
            className={styles.NavContainer}
            initial={{ width: 0 }}
            animate={{ width: "fit-content" }}
            transition={{ delay: 0.02, duration: 0.4 }}
            exit={{
              width: 0,
              transition: { delay: 1, duration: 2 },
            }}
            ref={ref}
          >
            <motion.div
              className={styles.NavlinkCont}
              initial="closed"
              animate="open"
              exit="closed"
              variants={sideVariants}
            >
              <motion.div
                className={styles.NavItemCont}
                variants={itemVariants}
              >
                <div className={styles.Links}>
                  <HiOutlineHome />
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </div>
              </motion.div>
              <motion.div
                className={styles.NavItemCont}
                variants={itemVariants}
              >
                <div onClick={HandleLaunchPadMenu} className={styles.Links}>
                  <GiMissileLauncher />
                  <p>Launchpad</p>
                </div>
                <AnimatePresence>
                  {LaunchPadMenu && (
                    <motion.div
                      className={styles.productNavList}
                      initial={{ opacity: 0, y: "-50%" }}
                      animate={{ opacity: 1, y: "0%" }}
                      exit={{
                        opacity: 0,
                        y: "-50%",
                        transition: { duration: "0.35" },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: "150",
                        duration: "0.75",
                      }}
                    >
                      <Link href="/launchpad">
                        <a>Go to App</a>
                      </Link>
                      <Link href="https://t.me/serratim">
                        <a target="_blank" rel="noopener noreferrer">
                          Apply for IDO
                        </a>
                      </Link>
                      <Link href="https://docs.texostarter.com">
                        <a target="_blank" rel="noopener noreferrer">
                          How to participate
                        </a>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              <motion.div
                className={styles.NavItemCont}
                variants={itemVariants}
              >
                <div onClick={HandleStakingMenu} className={styles.Links}>
                  <RiExchangeFundsFill />
                  <p>Staking</p>
                </div>
                {stakingMenu && (
                  <motion.div
                    className={styles.productNavList}
                    initial={{ opacity: 0, y: "-50%" }}
                    animate={{ opacity: 1, y: "0%" }}
                    exit={{
                      opacity: 0,
                      y: "-50%",
                      transition: { duration: "0.35" },
                    }}
                    transition={{
                      type: "spring",
                      stiffness: "150",
                      duration: "0.75",
                    }}
                  >
                    <Link href="/staking">
                      <a>Open App</a>
                    </Link>
                    <Link href="https://samaswap.com/#/pool/v2">
                      <a target="_blank" rel="noopener noreferrer">
                        Create Liquidity pool
                      </a>
                    </Link>
                  </motion.div>
                )}
              </motion.div>
              <motion.div
                className={styles.NavItemCont}
                variants={itemVariants}
              >
                
                <div onClick={HandleStakingMenu} className={styles.Links}>
                  <RiExchangeFundsFill />
                  <Link href="/claimUSDT">
                  <p>Claim USDT</p>
                  </Link>
                </div>
                
              </motion.div>
              {open && (
                <div className={styles.absoluteElements}>
                  <>
                    <Link href="https://docs.texostarter.com">
                      <a target="_blank" rel="noopener noreferrer">
                        Docs
                      </a>
                    </Link>
                    <Link href="https://docs.texostarter.com">
                      <a target="_blank" rel="noopener noreferrer">
                        About
                      </a>
                    </Link>
                  </>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
