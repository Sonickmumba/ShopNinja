import React from "react";
import { FiSettings, FiMessageSquare } from "react-icons/fi";
import { BsCartCheck } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import './user.css';

const User = ({ isSignedIn, onSignIn }) => {
  return (
    <div className="user-component">
      {!isSignedIn && (
        <div className="sign-in-section">
          <p>Sign in for the best experience</p>
          <button className="sign-in-button" onClick={onSignIn}>
            Sign In
          </button>
        </div>
      )}

      <div className="user-options">
        <div className="user-option">
          <FiMessageSquare size={24} />
          <span>Messages</span>
        </div>
        <div className="user-option">
          <BsCartCheck size={24} />
          <span>Your Orders</span>
        </div>
        <div className="user-option">
          <AiOutlineHeart size={24} />
          <span>Your Reviews</span>
        </div>
        <div className="user-option">
          <BiMap size={24} />
          <span>Address</span>
        </div>
        <div className="user-option">
          <FiSettings size={24} />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
};

export default User;
