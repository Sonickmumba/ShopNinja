import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import FooterItem from "./FooterItem";
import "./Footer.css";

function Footer( { fetchUserProfile }) {
  const [activeItem, setActiveItem] = useState("Home");
  const navigate = useNavigate();

  const handleHomeClick = () => {
    setActiveItem("Home")
    navigate("/");
  };

  const handleCategoriesClick = () => {
    setActiveItem("Categories");
  };

  const handleUserClick = () => {
    setActiveItem("You");
    navigate("/user");
    fetchUserProfile()
  };

  const handleSearchClick = () => {
    setActiveItem("Search");
    console.log('clicked search button')
  };

  const handleCartClick = () => {
    setActiveItem("Cart");
    navigate("/cart");
  }
  return (
    <div className="footer">
      <FooterItem icon={AiOutlineHome} size={30}  label="Home" onClick={handleHomeClick} isActive={activeItem === "Home"}/>
      <FooterItem icon={BiCategory} size={30}  label="Categories" onClick={handleCategoriesClick} isActive={activeItem === "Categories"}/>
      <FooterItem icon={FiUser} size={30}  label="You" onClick={handleUserClick} isActive={activeItem === "You"}/>
      <FooterItem icon={FaRegHeart} size={30}  label="Search" onClick={handleSearchClick} isActive={activeItem === "Search"}/>
      <FooterItem icon={AiOutlineShoppingCart} size={30}  label="Cart" onClick={handleCartClick} isActive={activeItem === "Cart"}/>
    </div>
  );
}

export default Footer;
