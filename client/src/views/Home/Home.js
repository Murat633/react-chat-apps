import React from 'react'
import { Link, Navigate } from 'react-router-dom'

import styles from './Home.module.css'

function Home({ servers }) {
    return (
        <div className={styles.home}>
            {servers && servers.map((server, i) => (
                <div className={styles.server} key={i}>
                    <h1 className='server_name'>{server.server_name}</h1>
                    <p className='server_desc'>{server.server_description}</p>
                    <Link to={`/chat/${server.server_id}`} className='join_server'>Join</Link>
                </div>
            ))}
        </div>
    )
}

export default Home
