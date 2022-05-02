import { useState, useEffect } from "react";
import axios from 'axios';

const Users = () => {

    const[users, setUsers] = useState();
    
    return(
        <article>
            <h2>Users list</h2>
            {
                users?.length
                ?(
                    <ul>
                        {users.map((user, i) => <li key={i}>{user?.username}</li>)}
                    </ul>
                ): <p>No users to display</p>
            }
        </article>
    );
};

export default Users;