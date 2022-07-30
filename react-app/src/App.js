import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import PostsComments from './components/comments';
import PostsPage from './components/postsPage';
import { authenticate } from './store/session';
import FollowersPage from './components/followersPage';
import CreatePostsPage from './components/createPostsPage'
import EditPostsPage from './components/editPostsPage'
import CreateCommentsPage from './components/createCommentsPage';
import EditCommentsPage from './components/editCommentsPage';
import LikesPage from './components/likesPage';
import HomePage from './components/HomePage';
import Footer from "./components/Footer";



function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/posts' exact={true}>
          <PostsPage />
        </Route>
        <Route path='/posts/create' exact={true}>
          <CreatePostsPage />
        </Route>
        <Route path="/posts/:id">
          <EditPostsPage />
        </Route>
        <Route path='/comments' exact={true}>
          <PostsComments />
        </Route>
        <Route path='/comments/create/:id'>
          <CreateCommentsPage />
        </Route>
        <Route path='/comments/:id'>
          <EditCommentsPage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/followers/:id'>
          <FollowersPage/>
        </Route>
        <Route path='/likes/new/'>
          <LikesPage/>
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <HomePage/>
        </Route>
      </Switch>
    </BrowserRouter>
    <Footer />
    </>
  );
}

export default App;
