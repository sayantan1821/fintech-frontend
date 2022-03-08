import style from "./header.module.css";
import companyLogo from "../../assets/companyLogo.svg";
import logo from "../../assets/logo.svg";
import React from "react";

export const Header = () => {
  return (
    <div className={style.header}>
      <div className={style.companyLogo}>
        <img src={companyLogo} />
        <p>ABC Products</p>
      </div>
      <div className={style.logo}>
          <img src={logo} />
      </div>
    </div>
  );
};
