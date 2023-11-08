import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';


const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT'){
    return {value: action.val, isValid: action.val.includes('@')};
  }
  if (action.type === 'INPUT_BLUR'){
    return {value: state.value, isValid: state.value.includes('@')};
  }
  return {value: '', isValid: false};
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT'){
    return {value: action.val, isValid: action.val.trim().length > 6};
  }
  if (action.type === 'INPUT_BLUR'){
    return {value: state.value, isValid: state.value.includes('@')};
  }
  return {value: '', isValid: false};
};


const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();df
  const [formIsValid, setFormIsValid] = useState(false);


  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: null });



// try this with array of dependencies and without array also
  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP')
    }
  }, []);




  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value})

    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid
    );

  };


  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val: event.target.value})


    setFormIsValid(
      event.target.value.trim().length > 6 && emailState.isValid 
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'})
  };



  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' });
  }


  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
/>
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
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
























//   useEffect(() => {
//     setFormIsValid(
//       enteredEmail.includes('@') && enteredPassword.trim().length > 6  && enteredCollegeName.trim().length > 10
//     );
//   }, [enteredEmail, enteredPassword, enteredCollegeName]);


//   useEffect(() => {
//     const identifier = setTimeout(() => {
//       console.log('checking form validity!');
//       setFormIsValid(
//         enteredEmail.includes('@') && enteredPassword.trim().length > 6  && enteredCollegeName.trim().length > 10
//       );
//     }, 500);

//     return () => {
//       console.log('CLEANUP');
//       clearTimeout(identifier);
//     }

//   }, [enteredEmail, enteredPassword, enteredCollegeName]);

// //  basically sometimes we needs to have an effect that also have some cleanup work, for eg. in  above useEffect, setFormIsValid function triggers
// // another function component execution after every keystroke (everytime when enter key it will check this condition and process setFormIsValid()) that is cause of unnecessary requests.
// // so we used timer that checks only if the pauses long enough that is called debouncing and this cleanup function will cancel all timers except last one.

// // CHATGPT explaination => (Certainly! The first `useEffect` immediately checks form validity based on user input and runs whenever input changes, while the second `useEffect` employs a timer to debounce the form validity check and ensure it only occurs after a pause in input. The cleanup function in the second `useEffect` cancels any previous timers to prevent multiple checks, allowing only the latest timer to execute.)