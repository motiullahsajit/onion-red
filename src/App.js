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
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({ email: null, password: null });
  const [user, setUser] = useState();

  const onChangeHandler = (e) => {
    let isFieldValid = true;

    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length >= 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber
    }
    if (isFieldValid) {
      const key = e.target.name
      setFormData({ ...formData, [key]: e.target.value })
      setError('')
    }
    else {
      setError('Please check your Email format or Password (password should have more then six character and a number in it)')
    }
  }

  const gprovider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const twProvider = new firebase.auth.TwitterAuthProvider();

  const handleSingIn = (provider) => {
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        setUser(result.user)
      }).catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage)
      });
  }

  const signUp = (e) => {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setUser(user)
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        setError(errorMessage)
       
      });
  }


  const signIn = (e) => {
    e.preventDefault();

    firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
      .then((userCredential) => {
        var user = userCredential.user;
        setUser(user)
        console.log("success", user);
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.log("error", errorMessage);
        setError(errorMessage)
      });

  }

  return (
    <div className="container-fluid App">

      <div className="row justify-content-center d-flex">
        {
          user &&
          <MealFInder state={setUser} user={user}></MealFInder>
        }
        {
          !user &&
          <>
            <div className="col-md-3 mt-5">
              <img src={logo} className='w-100 p-3' alt="" />
              <div className="tab bg-light p-2 rounded mb-3 row">
                <button onClick={() => setOption('register')} className={`btn ${option === 'register' ? ' btn-danger' : 'btn-light'}  col`}>Register</button>
                <button onClick={() => setOption('login')} className={`btn ${option === 'login' ? 'btn-danger' : 'btn-light'}  col`}>Login</button>
              </div>
              <form className="form my-4">
                <div className="mb-3">
                  <input name="email" onChange={(e) => onChangeHandler(e)} type="email" placeholder="Email" className="form-control" />
                </div>
                <div className="mb-3">
                  <input name="password" onChange={(e) => onChangeHandler(e)} type="password" placeholder="Password" className="form-control" />
                </div>
                <p className='text-success text-danger'>{error}</p>
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
                </div>
              </form>
              <h3 className='text-danger text-center'>Or</h3>
              <button type="submit" onClick={() => handleSingIn(gprovider)} className="btn btn-success my-1 w-100">Sing In With Google</button>
              <button type="submit" onClick={() => handleSingIn(fbProvider)} className="btn btn-primary my-1 w-100">Sing In With Facebook</button>
              <button type="submit" onClick={() => handleSingIn(twProvider)} className="btn btn-warning text-white my-1 w-100">Sing In With Twitter</button>
            </div>
          </>
        }

      </div>
    </div>
  );
}

export default App;
