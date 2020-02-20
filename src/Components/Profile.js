import React from 'react';
import {connect} from 'react-redux'
import Axios from 'axios';
import {logout} from '../redux/reducer'

const Profile = (props) => {

    const logout = () => {
        Axios.post('/api/logout').then(res =>{
            props.logout()
            props.history.push('/')
        })
    //something goes here
    }

    return(
        <div>
            <p>{props.user.user_id}</p>
            <p>{props.user.user_email}</p>
            <button onClick={logout}>Log out</button>
        </div>
    )
}
const mapStateToProps = reduxState => {
    const {user} = reduxState
    // Make sure whatever is returned is an Object
    return {
        user
    }
    // return reduxState could also work, just because it is still returning the reduxState object
}

export default connect(mapStateToProps,{logout} )(Profile);
// Without connect we would be unable to do the Redux stuff