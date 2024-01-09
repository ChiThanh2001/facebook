import React, { useEffect, useState } from 'react'
import './style.css'
export const Following = ({ user, setIsFollowing, isFollowing }) => {
    const toggleFollowing = () => {
      setIsFollowing(!isFollowing);
    };

    return (
      <div className="switch-container">
        <label className={`switch-label ${isFollowing ? 'following' : ''}`} onClick={toggleFollowing}>
          <span className="switch-label-text">Following post</span>
          <div className={`switch-label-background ${isFollowing ? 'active' : ''}`}>
            <div className="switch-handle"></div>
          </div>
        </label>
      </div>
    );
}
