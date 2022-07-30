import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoUser = async (e) => {
    e.preventDefault();
    const DemoEmail = "demo@aa.io"
    const DemoPassword = "password"
    const data = await dispatch(login(DemoEmail, DemoPassword));
    if (data) {
      setErrors(data);
    }
  };

  if (user) {
    return <Redirect to='/posts' />;
  }

  return (
    <form className="loginform" onSubmit={onLogin}>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
        {/* <label htmlFor='email'>Email</label> */}
        <input name='email' type='text' className='inputfirst' placeholder='Email' value={email} onChange={updateEmail}/>
        {/* <label htmlFor='password'>Password</label> */}
        <input name='password' type='password' className='inputs' placeholder='Password' value={password} onChange={updatePassword}/>
        <button type='submit' className="button" >Login</button>
        <button type='submit' className="button" onClick={demoUser}>Demo User</button>
    </form>
  );
};

export default LoginForm;
