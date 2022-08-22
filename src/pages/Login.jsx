import React, { useContext } from 'react'
import MyButton from '../components/UI/button/MyButton';
import MyInput from '../components/UI/input/MyInput';
import { AuthContext } from '../contexts/context';
const Login = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);
    
    const login = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true')
    }
  return (
        <div style={{ display: "contents", fontSize: 25 }} >
          <h1 style={{ margin: 50, JustifyContent: "center", }}>Login page </h1>
          <form onSubmit={login} >
              <MyInput type='text' placeholder='Username' />
              <MyInput type='password' placeholder='Password' />
              <MyButton>Login</MyButton>
          </form>
    </div>
  )
}

export default Login;