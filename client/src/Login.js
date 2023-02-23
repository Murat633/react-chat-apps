import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'

function Login({ isLoggin, setIsLoggin, userId }) {
    const [userIdInput, setUserIdInput] = useState("")
    if (isLoggin || userId) {
        Navigate({ to: "/home" })
    }
    return (
        <div className='login'>
            <input type="text" name='username' onChange={(e) => setUserIdInput(e.target.value)} value={userIdInput} />
            <Link onClick={() => {
                localStorage.setItem("userId", userIdInput)
                setIsLoggin(true)
            }} to="/home" className='loginBtn'>Giriş Yap</Link>
        </div>
    )
}

export const mapStateToProps = (state) => {
    return {
        userId: state.getUserIdReducer
    }
}

export default connect(mapStateToProps)(Login)
