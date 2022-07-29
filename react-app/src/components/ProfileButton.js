import React, { useState, useEffect } from "react";
import {  useHistory } from "react-router-dom";
import LogoutButton from './auth/LogoutButton';
import { FiPlusSquare } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";

function ProfileButton({ user }) {
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
    };

    useEffect(() => {
      if (!showMenu) return;

      const closeMenu = () => {
        setShowMenu(false);
      };

      document.addEventListener('click', closeMenu);

      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

      const forCREATE = (e) => {
        e.preventDefault();
        history.push('/posts/create')
      }
      const forUSERS = (e) => {
        e.preventDefault();
        history.push('/users')
      }


    return (
        <div className='navbar'>
        <button type="button" className='usebutton' onClick={forCREATE}><FiPlusSquare size="23px"/></button>
        <button type="button" className='usebutton' onClick={forUSERS}><FaUsers size="23px"/></button>
        <button className='chairbutt' onClick={openMenu}>
        <i className="fa-solid fa-chair"></i>
      </button>
        {showMenu && (
        <ul className="profile-dropdown">
          <ul>Welcome {user.username}!</ul>
          <ul>
          <button type="button" className='usebutton'><LogoutButton/></button>
          </ul>
        </ul>
      )}
        </div>
    );
  }

  export default ProfileButton;
