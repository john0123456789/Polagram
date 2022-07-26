import React from 'react';
import LogoutButton from './auth/LogoutButton';
import { FiPlusSquare } from "react-icons/fi"
import { useHistory  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './NavBar.css'

function NavBar({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();


  const forHOME = (e) => {
    e.preventDefault();
    history.push('/posts')
  }
  const forLOGIN = (e) => {
    e.preventDefault();
    history.push('/login')
  }
  const forSIGNUP = (e) => {
    e.preventDefault();
    history.push('/sign-up')
  }
  const forUSERS = (e) => {
    e.preventDefault();
    history.push('/users')
  }
  const forCREATE = (e) => {
    e.preventDefault();
    history.push('/posts/create')
  }

  let sessionLinks;
  if (sessionUser){
    sessionLinks = (
      <div className='navbarright'>
        <button type="button" className='button' onClick={forLOGIN}> Log In</button>
        <button type="button" className='button' onClick={forSIGNUP}> Sign Up</button>
        <button type="button" className='createbutton' onClick={forCREATE}><FiPlusSquare /></button>
        <button type="button" className='button' onClick-={forUSERS}> Explore Users</button>
        <LogoutButton/>
      </div>
    );
  }

  return (

    <div className='navbar'>
      <img src="https://i.imgur.com/41BYjqQ.png" alt="logo" className='polalogo'  onClick={forHOME}/>
        {isLoaded && sessionLinks}
        <button type="button" className='button' onClick={forLOGIN}> Log In</button>
        <button type="button" className='button' onClick={forSIGNUP}> Sign Up</button>
        <button type="button" className='createbutton' onClick={forCREATE}> <FiPlusSquare size="27px"/></button>
        <button type="button" className='button' onClick-={forUSERS}> Explore Users</button>
        <LogoutButton/>
    </div>
  );
}

export default NavBar;
