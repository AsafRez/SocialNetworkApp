import React from 'react';

const User=({ userName, profile_image })=> {
    return(
        <div className={"single-user"}>
            <div>
            <img
                src={`http://localhost:8989${profile_image}`}
                alt={userName}
                />
            </div>
            <div>
            <p style={{fontWeight: 'bold', margin: 0}}>
                {userName}
            </p>
            </div>
        </div>
    )
}

export default User;