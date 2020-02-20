import React from 'react';

const Profile = (props) => {

    const logout = () => {
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