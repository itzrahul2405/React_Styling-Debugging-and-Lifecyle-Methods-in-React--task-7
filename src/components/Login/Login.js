import React, { useState, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollegeName, setEnteredCollegeName] = useState('');
  const [collegeNameIsValid, setCollegeNameIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

// try this with array of dependencies and without array also
  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP')
    }
  }, []);


  // useEffect(() => {
  //   setFormIsValid(
  //     enteredEmail.includes('@') && enteredPassword.trim().length > 6  && enteredCollegeName.trim().length > 10
  //   );
  // }, [enteredEmail, enteredPassword, enteredCollegeName]);


  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('checking form validity!');
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6  && enteredCollegeName.trim().length > 10
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    }

  }, [enteredEmail, enteredPassword, enteredCollegeName]);

//  basically sometimes we needs to have an effect that also have some cleanup work, for eg. in  above useEffect, setFormIsValid function triggers
// another function component execution after every keystroke (everytime when enter key it will check this condition and process setFormIsValid()) that is cause of unnecessary requests.
// so we used timer that checks only if the pauses long enough that is called debouncing and this cleanup function will cancel all timers except last one.

// CHATGPT explaination => (Certainly! The first `useEffect` immediately checks form validity based on user input and runs whenever input changes, while the second `useEffect` employs a timer to debounce the form validity check and ensure it only occurs after a pause in input. The cleanup function in the second `useEffect` cancels any previous timers to prevent multiple checks, allowing only the latest timer to execute.)

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

  };


  const collegeNameChangeHandler = (event) => {
    setEnteredCollegeName(event.target.value);

  }

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      event.target.value.trim().length > 6 && enteredEmail.includes('@')  && enteredCollegeName.trim().length > 10
    );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validateCollegeNameHandler = () => {
    setCollegeNameIsValid(enteredCollegeName.trim().length > 10);
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };


  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredCollegeName, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegeNameIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="college-name">College Name</label>
          <input
            type="text"
            id="college-name"
            value={enteredCollegeName}
            onChange={collegeNameChangeHandler}
            onBlur={validateCollegeNameHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
