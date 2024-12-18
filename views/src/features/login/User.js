import React from "react";
import { useNavigate } from "react-router-dom";
import { FiSettings, FiChevronRight, FiMessageSquare } from "react-icons/fi";
import { FaSignOutAlt } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { BiMap } from "react-icons/bi";
import "./user.css";
import { useSelector } from "react-redux";

const User = ({ handleSignout }) => {
  const { isSignedIn, userProfile } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="user-component">
      <div className="user-profile">
        <div className="user-back">
          <MdKeyboardArrowLeft size={40} /> <h3>My Profile</h3>
        </div>
        <button type="button" className="signout-button">
          Sign out
        </button>
      </div>
      {isSignedIn ? (
        <div className="profile-section">
          <div className="pro-con">
            <img
              src={userProfile?.image || "default-avatar.png"}
              alt="User Profile"
              className="profile-picture"
            />
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
      <h4>Account</h4>
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
        {isSignedIn && (
          <div className="user-option">
            <FaSignOutAlt size={24} />
            <div className="message-arrow" onClick={handleSignout}>
              <span>Sign out</span>
              <FiChevronRight size={20} className="right-arrow" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
