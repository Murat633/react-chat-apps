import React from 'react'
import { Link, Navigate } from 'react-router-dom'

function Login({ username, changeUsername, isLogginControl, isLoggin }) {
    if (isLoggin) {
        return <Navigate to="/home" />
    }
    return (
        <div className='login'>
            <input type="text" name='username' onChange={changeUsername} value={username} />
            <Link onClick={() => {
                localStorage.setItem("username", username)
                isLogginControl()
            }} className='loginBtn'>Giriş Yap</Link>
        </div>
    )
}

export default Login
