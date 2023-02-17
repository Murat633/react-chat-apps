import React from 'react'
import styles from './NotFound.module.css'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <nav className={styles.NotFound}>
            Sayfa Bulunamadı!
            <Link to="/home">Anasayfa</Link>
        </nav>
    )
}

export default NotFound
