import React from 'react';

function ProfileOverview(props) {
    return (
        <>
            <div className="logo">
            {
                    props.profile.avatar_url && <img src={props.profile.avatar_url} alt="logo" />
            }   
                <div className="p">
                {
                        props.profile.name && <div className="p-name">{props.profile.name}</div>
                }
                {
                        props.profile.login && <div className="p-user"><i className="fa fa-github" aria-hidden="true"></i> { props.profile.login } </div>
                }   
                    
                    {
                        props.profile.bio && <div className="p-bio"><i className="fa fa-crosshairs" aria-hidden="true"></i> {props.profile.bio}</div>
                    }
                    {
                        props.profile.company && <div className="p-company"><i className="fa fa-renren" aria-hidden="true"></i> {props.profile.company}</div>
                    }
                </div>
                {
                    props.profile.joinedOn && <div className="joinDate">Joined On {props.profile.joinedOn}</div>
                }
            </div>
        </>
    )
}

export default ProfileOverview; 