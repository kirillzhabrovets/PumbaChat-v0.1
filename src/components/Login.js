import React from 'react';
import "./Login.css";

import { Button } from '@mui/material';
import { auth, provider } from '../firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from '../components/reducer';

function Login() {
  const [{}, dispatch] = useStateValue(); 

  const signIn = () =>  {
    auth
        .signInWithPopup(provider)
        .then(result => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })
        })
        .catch(error=> alert(error.message));
  };
    
  return (
    <div className='login'>
        <div className="login__container">
            <img
                src="https://yt3.ggpht.com/bm-17UoDKSM8lFRYvZxaHHBCO_Yev7af5TbhiM0n6xAardJVB7FSBzs0GFJGZYJfdEAhjBzM1w=s600-c-k-c0x00ffffff-no-rj-rp-mo"
                alt='Pumba_Company'
            />
            <div className='login__text'>
                <h1>Авторизация</h1>
            </div>

            <Button onClick={signIn}>
                Войти с помощью Google
            </Button>
        </div>
    </div>
  );
}

export default Login;