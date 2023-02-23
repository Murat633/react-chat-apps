import React, { useEffect } from 'react'
import styles from './Navbar.module.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getUser } from '../../redux/actions/userAction';

function Navbar({ userInfo, actions, userId, socket }) {

    useEffect(() => {
        if (userId) {
            actions.getUser(userId, socket)
        }
    }, [userId]);
    return (
        <nav className={styles.navbar}>
            {userInfo.username}
        </nav>
    )
}


const mapStateToProps = (state) => {
    return {
        userInfo: state.userReducer,
        userId: state.getUserIdReducer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            getUser: bindActionCreators(getUser, dispatch),
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
