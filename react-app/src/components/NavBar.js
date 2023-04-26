import React from 'react';
import LogoutButton from './auth/LogoutButton';
import { FiPlusSquare } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { useHistory  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './NavBar.css'

function NavBar({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();


  const forHOME = (e) => {
    e.preventDefault();
    history.push('/')
  }
  const forLOGIN = (e) => {
    e.preventDefault();
    history.push('/login')
  }
  const forSIGNUP = (e) => {
    e.preventDefault();
    history.push('/sign-up')
  }

  const forCREATE = (e) => {
    e.preventDefault();
    history.push('/posts/create')
  }
  const forUSERS = (e) => {
    e.preventDefault();
    history.push(`/users/${sessionUser.id}`)
  }

  const forPosts = (e) => {
    e.preventDefault();
    history.push("/posts");
  };



  let sessionLinks;
  if (sessionUser){
  sessionLinks= (
  <ProfileButton user={sessionUser} />
  );
  } else {
    sessionLinks = (
      <div className='navbar'>
        <button type="button" className='usebutton' onClick={forLOGIN}> Log In</button>
        <button type="button" className='usebutton' onClick={forSIGNUP}> Sign Up</button>
        <button type="button" className='usebutton' onClick={forCREATE}><FiPlusSquare /></button>
        <button type="button" className='usebutton' onClick-={forUSERS}><FaUsers /></button>
        <LogoutButton/>
      </div>
    );
  }

  return (

    <div className='navbar'>
        {isLoaded && sessionLinks}
        {!sessionUser && (
          <>
          <img src="https://i.imgur.com/41BYjqQ.png" alt="logo" className='polalogo'  onClick={forHOME}/>
          <button type="button" className='usebutton' onClick={forLOGIN}>Log In</button>
          <button type="button" className='usebutton' onClick={forSIGNUP}> Sign Up</button>
          </>
        )}
        {sessionUser && (
          <>
            <img src="https://i.imgur.com/41BYjqQ.png" alt="logo" className='polalogo'  onClick={forPosts}/>
            <button type="button" className='usebutton' onClick={forCREATE}><FiPlusSquare size="20px"/></button>
            <button type="button" className='usebutton' onClick={forUSERS}><FaUsers size="20px"/></button>
            <button type="button" className='usebutton'><LogoutButton/></button>
          </>
        )}

    </div>
  );
}

export default NavBar;
