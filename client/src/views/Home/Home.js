import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import styles from './Home.module.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { currentServer, getServers } from '../../redux/actions/serversAction'
import { getUser } from '../../redux/actions/userAction'

function Home({ servers, actions, userId, socket }) {

    useEffect(() => {
        actions.getServers(Number(userId), socket)
        actions.getUser(Number(userId), socket)
    }, []);

    return (
        <div className={styles.home}>
            {servers && servers.map((server, i) => (
                <div className={styles.server} key={i}>
                    <h1 className='server_name'>{server.server_name}</h1>
                    <p className='server_desc'>{server.server_description}</p>
                    <Link to={`/chat/`} onClick={() => {
                        actions.changeServer(server)
                    }} className='join_server'>Join</Link>
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        servers: state.serversReducer,
        user: state.userReducer,
        userId: state.getUserIdReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            getServers: bindActionCreators(getServers, dispatch),
            getUser: bindActionCreators(getUser, dispatch),
            changeServer: bindActionCreators(currentServer, dispatch)
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Home)
