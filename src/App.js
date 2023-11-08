import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './components/store/auth-context';

function App() {

  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // it causes infinite loop (to resolve it we used useEffect())
  // const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
  // if (storedUserLoggedInInformation === '1'){
  //   setIsLoggedIn(true)
  // }

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    if (storedUserLoggedInInformation === '1'){
      setIsLoggedIn(true)
    }
  }, []);
  // this will not run after every component evaluation but it will run if  it's dependencies will change

  const loginHandler = (email, password) => {
    // We should of course check email, collegename and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    // <React.Fragment>
    // this value object will be updated by react whenever isLoggedIn change  and that new context object will be passed out to all listening components where we consume this context.
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, onLogout: logoutHandler}}>     
      <MainHeader  onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
    // </React.Fragment>
  );
}

export default App;








//   useEffect()  => takes two arguments 1. first one is a function  2. the second argument is an array of dependencies
//  In a useEffect hook, the function you provide will re-run when at least one of the dependencies specified in the dependency array changes. If the dependency array is empty or omitted, the effect runs once after the initial render.