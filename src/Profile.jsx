import React from 'react';

const Profile=({ userName, profile_image, followers, following })=> {
    return(
        <div className={"profile-user"}>
            <div>
                <p style={{fontWeight: 'bold', margin: 0}}>הפרופיל שלי</p>
            </div>
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
            <p>Followers: {followers}</p>
            <p>Following: {following}</p>


        </div>
    )
}

export default Profile;