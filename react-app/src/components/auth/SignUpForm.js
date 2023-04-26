import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUp.css'

const SignUpForm = () => {

  let errorsObj = {content: ''};
  const [reactErrors, setReactErrors] = useState(errorsObj);

  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [profile_pic, setprofile_pic] = useState('https://i.pinimg.com/550x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();

    let error = false;
    errorsObj = {...errorsObj};
    if (!profile_pic.includes(".jpg") && !profile_pic.includes(".png") && !profile_pic.includes(".JPG") && !profile_pic.includes(".PNG") && !profile_pic.includes("image")) {
      errorsObj.profile_pic = "profile_pic must be jpg/png or contain image"
      error = true
    }
    else if (profile_pic.length < 4) {
      errorsObj.profile_pic = "profile_pic must be at least 4 characters."
      error = true
    }
    if(username === '') {
      errorsObj.username = "Requires username!";
      error = true;
    } else if (username.length < 5 || username.length > 20) {
      errorsObj.username = "Usernames must be longer than 5 characters and shorter than 20.";
      error = true;
    }
    if(email === '') {
      errorsObj.email = "Requires email!";
      error = true;
    } else if (!email.includes("@")) {
      errorsObj.email = "Please input a valid email address."
    }
    if(password === '') {
      errorsObj.password = "Requires password!";
      error = true;
    }
    if(repeatPassword === '') {
      errorsObj.repeatPassword = "Requires password!";
      error = true;
    } else if (repeatPassword !== password) {
      errorsObj.repeatPassword = "Passwords must match!";
      error = true;
    }

    setReactErrors(errorsObj);

    if(!error) {
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, profile_pic));
      if (data) {
        setErrors(data)
      }
    }
  }
}

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateprofile_pic = (e) => {
    setprofile_pic(e.target.value);
  };

  if (user) {
    return <Redirect to='/posts' />;
  }

  return (
    <form className="signupform" onSubmit={onSignUp}>
      {Object.values(reactErrors).map((error, idx) => <li key={idx}>{error}</li>)}
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>

        <input
          type='text'
          name='username'
          placeholder='Username'
          className='inputfirst'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>

        <input
          type='text'
          name='email'
          placeholder='Email'
          className='inputs'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>

        <input
          type='password'
          name='password'
          placeholder='Password'
          className='inputs'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <input
          type='password'
          name='repeat_password'
          placeholder='Confirm Password'
          className='inputs'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div>
      <input type="text" className='inputfirst' placeholder="profile picture"  onChange={updateprofile_pic}/>
      </div>
      <button type='submit' className="button">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
