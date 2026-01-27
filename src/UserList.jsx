import Dashboard from "./Dashboard.jsx";
import React from "react";
import User from "./User.jsx";

const UserList = ({userList, currentUser,onAction}) => {
    if (!userList || !Array.isArray(userList)) {
        return <p>Loading users...</p>;
    }
    return (
        <div className="users-list-wrapper">
            {console.log(userList)}
            {userList.map((user) => (
                    <div key={user.userName}>
                        <User userName={user.userName}
                              profile_image={user.profile_image}
                              currentUser={currentUser}
                              onAction={onAction}
                        />

                    </div>
                )
            )
            }
        </div>
    );
}
export default UserList;
