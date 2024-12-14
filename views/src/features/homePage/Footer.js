import React from "react";
import { AiOutlineHome, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import FooterItem from "./FooterItem";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <FooterItem icon={AiOutlineHome} size={30}  label="Home"/>
      <FooterItem icon={BiCategory} size={30}  label="Categories"/>
      <FooterItem icon={FiUser} size={30}  label="You"/>
      <FooterItem icon={AiOutlineSearch} size={30}  label="Search"/>
      <FooterItem icon={AiOutlineShoppingCart} size={30}  label="Cart"/>
    </div>
  );
}

export default Footer;
