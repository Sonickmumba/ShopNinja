import React from "react";
import { useNavigate } from "react-router-dom";
import { FiSettings, FiChevronRight, FiMessageSquare } from "react-icons/fi";
import { BsCartCheck } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import "./user.css";

const User = ({ isSignedIn, onSignIn, userProfile }) => {
  const navigate = useNavigate();

  return (
    <div className="user-component">
      {/* {!isSignedIn && (
        <div className="sign-in-section">
          <p>Sign in for the best experience</p>
          <button className="sign-in-button" onClick={() => onSignIn(navigate)}>
            Sign In
          </button>
        </div>
      )} */}

      {isSignedIn ? (
        <div className="profile-section">
          <img
            src={userProfile?.image || "default-avatar.png"}
            alt="User Profile"
            className="profile-picture"
          />
          <p className="user-name">{userProfile?.name || "Guest User"}</p>
        </div>
      ) : (
        <div className="sign-in-section">
          <p>Sign in for the best experience</p>
          <button className="sign-in-button" onClick={() => onSignIn(navigate)}>
            Sign In
          </button>
        </div>
      )}

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
    </div>
  );
};

export default User;
