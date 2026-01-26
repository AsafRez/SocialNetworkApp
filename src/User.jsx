import React from 'react';

const User=({ userName, profile_image })=> {
    return(
        <div>
            <img
                src={`http://localhost:8989${profile_image}`}
                alt={userName}
                />
            <p style={{fontWeight: 'bold', margin: 0}}>
                {userName}
            </p>
        </div>
    )
}

export default User;