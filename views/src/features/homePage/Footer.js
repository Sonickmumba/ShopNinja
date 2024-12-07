import React from "react";
import { AiOutlineHome, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import "./Footer.css"; // Optional: for styling

function Footer() {
  return (
    <div className="footer">
      <div className="footer-item">
        <AiOutlineHome size={30} />
        <span>Home</span>
      </div>
      <div className="footer-item">
        <BiCategory size={30} />
        <span>Categories</span>
      </div>
      <div className="footer-item">
        <FiUser size={24} />
        <span>You</span>
      </div>
      <div className="footer-item">
        <AiOutlineSearch size={30} />
        <span>Search</span>
      </div>
      <div className="footer-item">
        <AiOutlineShoppingCart size={30} />
        <span>Cart</span>
      </div>
    </div>
  );
}

export default Footer;
