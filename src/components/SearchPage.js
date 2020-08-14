import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Profile() {
    const [name, setUsername] = useState({
        userName: ''
    });

    const changeUsername = (e) => {
        setUsername({userName: e.target.value})
    } 
    return (
        <div>
            <input type="text" value={name.userName} onChange={changeUsername} />
            <button> <Link to={'/' + name.userName}>Find </Link> </button>
        </div>
    )
}

export default Profile