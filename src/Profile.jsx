import React from 'react';

const Profile=({ userName, profile_image})=> {
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
            <button>
                <div>
                    {/*<button onClick={() =>openModal('edit picture')}>עריכת תמונה</button>*/}
                    {/*<button onClick={() => openModal('edit password')}>שינוי סיסמא</button>*/}
                </div>


                Edit Picture
            </button>



        </div>
    )
}

export default Profile;