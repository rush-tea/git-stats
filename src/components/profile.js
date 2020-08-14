import React from 'react';
import logo from './logo.png';

function Profile(){
    return(
        <header>
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="profileName">
                <span>Adarsh Tripathi</span>
                <span>IIITA 2019-23</span>
                <span>Indian Institute of Information Technology Allahabad</span>
                <span>Joined 4th May 2020</span>
            </div>
            <div className="stats">
                <div className="stats-item"> Followers: 120</div>
                <div className="stats-item"> Followers: 120</div>
                <div className="stats-item"> Followers: 120</div>
                <div className="stats-item"> Followers: 120</div>
                <div className="stats-item"> Followers: 120</div>
                <div className="stats-item"> Followers: 120</div>
            </div>
        </header>
    )
}

export default Profile