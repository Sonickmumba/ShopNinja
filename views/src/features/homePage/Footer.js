import React from "react";
import { AiOutlineHome, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import FooterItem from "./FooterItem";
import "./Footer.css";

function Footer() {
  const handleHomeClick = () => {
    console.log('clicked home button')
  };

  const handleCategoriesClick = () => {
    console.log('clicked cartegories button')
  };

  const handleYouClick = () => {
    console.log('clicked you button')
  };

  const handleSearchClick = () => {
    console.log('clicked search button')
  };

  const handleCartClick = () => {
    console.log('clicked cart')
  }
  return (
    <div className="footer">
      <FooterItem icon={AiOutlineHome} size={30}  label="Home" onClick={handleHomeClick}/>
      <FooterItem icon={BiCategory} size={30}  label="Categories" onClick={handleCategoriesClick}/>
      <FooterItem icon={FiUser} size={30}  label="You" onClick={handleYouClick}/>
      <FooterItem icon={AiOutlineSearch} size={30}  label="Search" onClick={handleSearchClick}/>
      <FooterItem icon={AiOutlineShoppingCart} size={30}  label="Cart" onClick={handleCartClick}/>
    </div>
  );
}

export default Footer;
