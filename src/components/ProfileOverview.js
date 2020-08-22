import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProfileOverview(props) {
    return (
        <>
            <div className="logo">
                <img src={props.profile.avatar_url} alt="logo" />
            </div>
            <div className="profileName">
                <span>{props.profile.name}</span>
                <span> {props.profile.login} </span>
                <span>{props.profile.bio}</span>
                <span>{props.profile.company}</span>
                {
                    props.profile.joinedOn && <span>Joined on {props.profile.joinedOn} </span>
                }
            </div>
        </>
    )
}

export default ProfileOverview; 