import React, { useState } from 'react';
import logo from './images/logo2.png'
import './App.css'
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebase.config';
import MealFInder from './components/MealFInder/MealFInder';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

function App() {
  const [option, setOption] = useState('register');

  console.log(option)
  const [formData, setFormData] = useState({ email: null, password: null });
  const [user, setUser] = useState();

  const onChangeHandler = (e) => {
    const key = e.target.name
    setFormData({ ...formData, [key]: e.target.value })
  }

  const provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();

  const handleGoogleSignIn = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        setUser(result.user)
        // console.log(result.user)
      }).catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  }

  const handleFbSingIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        const userFb = result.user;
        // console.log('fb user', userFb)
        setUser(userFb)
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  }

  const signUp = (e) => {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  }


  const signIn = (e) => {
    e.preventDefault();

    firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        setUser(user)
        console.log("success", user);
        // ...
      })
      .catch((error) => {
        // var errorCode = error.code;
        var errorMessage = error.message;
        console.log("error", errorMessage);
      });

  }

  return (
    <div className="container-fluid App">

      <div className="row justify-content-center d-flex">
        {
          user &&
          <MealFInder user={user}></MealFInder>
        }
        {
          !user &&
          <>
            <div className="col-md-3 mt-5">
              <img src={logo} className='w-100 p-3' alt="" />
              <div className="tab bg-light p-2 rounded mb-3 row">
                <button onClick={() => setOption('register')} className={`btn ${option === 'register' ? 'btn-danger' : 'btn-light'}  col`}>Register</button>
                <button onClick={() => setOption('login')} className={`btn ${option === 'login' ? 'btn-danger' : 'btn-light'}  col`}>Login</button>
              </div>
              <form className="form my-4">
                <div className="mb-3">
                  <input name="email" onChange={(e) => onChangeHandler(e)} type="email" placeholder="Email" className="form-control" />
                </div>
                <div className="mb-3">
                  <input name="password" onChange={(e) => onChangeHandler(e)} type="password" placeholder="Password" className="form-control" />
                </div>
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" />
                  <label className="form-check-label">Remember me</label>
                </div>
                <div className="mb-3 d-grid">
                  {
                    option === 'register' ?
                      <button type="submit" onClick={signUp} className="btn btn-danger">Register</button>
                      :
                      <button type="submit" onClick={signIn} className="btn btn-danger">Login</button>
                  }
                  <h3 className='text-danger text-center'>Or</h3>
                  <button type="submit" onClick={handleGoogleSignIn} className="btn btn-success my-1">SingIn With Google</button>
                  <button type="submit" onClick={handleFbSingIn} className="btn btn-primary">SingIn Facebook</button>
                </div>
              </form>
            </div>
          </>
        }

      </div>
    </div>
  );
}

export default App;
