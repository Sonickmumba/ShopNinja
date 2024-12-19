import React from "react";
import { useNavigate } from "react-router-dom";
import { FiSettings, FiChevronRight, FiMessageSquare } from "react-icons/fi";
import { FaRegCircleQuestion, FaCircleUser } from "react-icons/fa6";
import { BsCartCheck } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { LiaHandsHelpingSolid } from "react-icons/lia";
import { BiMap } from "react-icons/bi";
import "./user.css";
import { useSelector } from "react-redux";

const User = ({ handleSignout }) => {
  const { isSignedIn, userProfile } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  }

  return (
    <div className="user-component">
      <div className="user-profile">
        <div className="user-back">
          <MdKeyboardArrowLeft size={40} onClick={handleBackClick}/> <h3>My Profile</h3>
        </div>
        <button type="button" className="signout-button" onClick={handleSignout}>
          Sign out
        </button>
      </div>
      {isSignedIn ? (
        <div className="profile-section">
          <div className="pro-con">
            {userProfile?.image_url ? (<img
              src={userProfile?.image_url || "default-avatar.png"}
              alt="User Profile"
              className="profile-picture"
            />) : (<FaCircleUser className="profile-picture" size={50} color="gray" />)}
            <div className="profile-div">
              <p className="user-name">{userProfile?.name || "Guest User"}</p>
              <p>{userProfile?.email || "No email"}</p>
            </div>
          </div>
          <FiChevronRight size={20} className="right-arrow" />
        </div>
      ) : (
        <div className="sign-in-section">
          <p>Sign in for the best experience</p>
          <button className="sign-in-button" onClick={() => navigate("/login")}>
            Sign In
          </button>
        </div>
      )}
      <h3 className="account">Account</h3>
      <div className="user-options">
        <div className="user-option">
          <FiMessageSquare size={24} />
          <div className="message-arrow">
            <span>Messages</span>
            <FiChevronRight size={20} className="right-arrow" />
          </div>
        </div>
        <div className="user-option">
          <BsCartCheck size={24} />
          <div className="message-arrow">
            <span>Your Orders</span>
            <FiChevronRight size={20} className="right-arrow" />
          </div>
        </div>
        <div className="user-option">
          <AiOutlineHeart size={24} />
          <div className="message-arrow">
            <span>Your Reviews</span>
            <FiChevronRight size={20} className="right-arrow" />
          </div>
        </div>
        <div className="user-option">
          <BiMap size={24} />
          <div className="message-arrow">
            <span>Address</span>
            <FiChevronRight size={20} className="right-arrow" />
          </div>
        </div>
        <div className="user-option">
          <FiSettings size={24} />
          <div className="message-arrow">
            <span>Settings</span>
            <FiChevronRight size={20} className="right-arrow" />
          </div>
        </div>
      </div>
      <h3 className="account">help and support</h3>
      <div className="user-options">
        <div className="user-option">
          <LiaHandsHelpingSolid size={24} />
          <div className="message-arrow">
            <span>Help</span>
            <FiChevronRight size={20} className="right-arrow" />
          </div>
        </div>
        <div className="user-option">
          <FaRegCircleQuestion size={24} />
          <div className="message-arrow">
            <span>FAQ</span>
            <FiChevronRight size={20} className="right-arrow" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
