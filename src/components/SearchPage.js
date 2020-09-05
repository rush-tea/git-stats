import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchPageHeader from './SearchPageHeader'
import './css/SearchPage.css'

function Profile() {
    const [name, setUsername] = useState({
        userName: ''
    });

    const changeUsername = (e) => {
        setUsername({userName: e.target.value})
    } 
    return (
            <div className="cntnr">
                <SearchPageHeader />
                <form>
                    <div className="form-group">
                        <input type="text" value={name.userName} onChange={changeUsername} placeholder="Enter Username" className="form-control"/>
                    </div>
                    <button className="btn btn-dark"> <Link to={'/' + name.userName} className="text-light">Search </Link> </button>
                </form>
            </div>
    )
}

export default Profile