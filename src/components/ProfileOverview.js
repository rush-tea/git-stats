import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProfileOverview(props) {
    return (
        <>
            <div className="logo">
                <img src={props.profile.avatar_url} alt="logo" />
                <div className="p-name">
                    <div>{props.profile.name}</div>
                    <div> {props.profile.login} </div>
                    {
                        props.profile.joinedOn && <div className="p-join">Joined on {props.profile.joinedOn} </div>
                    }
                </div>
                {
                    props.profile.bio > 0 && <div className="p-bio"><i className="fa fa-crosshairs" aria-hidden="true"></i> {props.profile.bio}</div>
                }
                {
                    props.profile.company > 0 && <div className="p-company"><i className="fa fa-renren" aria-hidden="true"></i> {props.profile.company}</div>
                }
            </div>
        </>
    )
}

export default ProfileOverview; 