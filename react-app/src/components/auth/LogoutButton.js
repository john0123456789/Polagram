import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';
import { HiOutlineLogout } from 'react-icons/hi';


const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    dispatch(logout());
    history.push('/')
  };

  return <HiOutlineLogout size="20px" className="logoutbutt" onClick={onLogout}/>
};

export default LogoutButton;
