import React from 'react'
import styles from './Navbar.module.css'

function Navbar({ userInfo }) {
    return (
        <nav className={styles.navbar}>
            {userInfo && "Username:" + userInfo[0].username}
        </nav>
    )
}

export default Navbar
