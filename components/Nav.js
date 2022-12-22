import styles from "./navbar.module.css";
import Link from "next/link";
import Connect from "../constants/Connect";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import useMediaQuery from "./hooks/useMediaQueryhooks";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Navbar({
  open,
  handleClick,
  openMM,
  handleMobileClick,
}) {
  const isDesktop = useMediaQuery("(min-width: 960px)");
  const isMobile = useMediaQuery("(min-width: 380px)");
  const [openMobileSideBar, setMobileSideBarOpen] = useState(false);

  const menuMovement = {
    sidebarOpen: {
      marginLeft: "13vw",
      marginTop: ".5rem",
      transition: {
        duration: 1,
      },
    },

    sidebarClosed: {
      marginLeft: "0vw",
      marginTop: ".2rem",
      transition: {
        duration: 1,
      },
    },
  };

  const MobileSideBarHandler = () => {
    setMobileSideBarOpen(!openMobileSideBar);
  };

  return (
    <div>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link href="/">
            <a className={styles.innerLogo}>
              {isDesktop ? (
                <>
                  <Image
                    src="/logo.png"
                    height="45px"
                    width="45px"
                    alt="logo"
                  />
                  <h2>Banana DAO</h2>
                  {isDesktop && (
                    <motion.div
                      className={styles.hamburger}
                      variants={menuMovement}
                      initial={{ marginLeft: "0" }}
                      animate={open ? "sidebarOpen" : "sidebarClosed"}
                      transition={{ duration: 1, origin: 1 }}
                    ></motion.div>
                  )}
                </>
              ) : (
                <>
                  <Image
                    src="/logo.png"
                    height="45px"
                    width="45px"
                    alt="logo"
                  />
                  {isMobile && <h4>Banana DAO</h4>}
                </>
              )}
            </a>
          </Link>
        </div>
        <div className={styles.mobileFallback}>
          <div className={styles.connect}>
            <div className={styles.connectBtn}>
              <Connect />
            </div>
          </div>
        </div>
        <div className={styles.collections}>
          <Connect />
        </div>
        <div className={styles.hamburgerMenu}>
          {isDesktop ? (
            open ? (
              <CgClose fontSize=".9em" onClick={handleClick} />
            ) : (
              <GiHamburgerMenu fontSize=".8em" onClick={handleClick} />
            )
          ) : openMM ? (
            <CgClose />
          ) : (
            <GiHamburgerMenu onClick={handleMobileClick} />
          )}
        </div>
      </nav>
    </div>
  );
}
