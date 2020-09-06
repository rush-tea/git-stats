import React, { useEffect } from 'react';

function ProfileOverview(props) {
    return (
        <>
            <div className="logo">
            {
                    props.profile.avatar_url && <img src={props.profile.avatar_url} alt="logo" />
            }   
                <div className="p-name">
                {
                        props.profile.name && <div>{props.profile.name}</div>
                }
                {
                        props.profile.login && <div> { props.profile.login } </div>
                }   
                    
                    {
                        props.profile.bio && <div className="p-bio"><i className="fa fa-crosshairs" aria-hidden="true"></i> {props.profile.bio}</div>
                    }
                    {
                        props.profile.company && <div className="p-company"><i className="fa fa-renren" aria-hidden="true"></i> {props.profile.company}</div>
                    }
                </div>
                
            </div>
        </>
    )
}

export default ProfileOverview; 