import React from "react";
import { Link } from "react-router-dom";
import style from './footer.module.css'
const Footer = () => {
  return (
    <div className={style.footer}>
      <p>
        <span>
          <Link to="#">Privacy Policy</Link>
        </span>{" "}
        | HighRadius Corporation. All rights reserved
      </p>
    </div>
  );
};

export default Footer;
