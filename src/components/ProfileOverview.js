import React, { useEffect } from 'react';

function ProfileOverview(props) {
    useEffect(() => {
        console.log(props);
    },[])
    return (
        <>
            <div className="logo">
                <img src={props.profile.avatar_url} alt="logo" />
                <div className="p-name">
                    <div>{props.profile.name}</div>
                    <div> {props.profile.login} </div>
                    {
                        props.profile.bio.length > 0 && <div className="p-bio"><i className="fa fa-crosshairs" aria-hidden="true"></i> {props.profile.bio}</div>
                    }
                    {
                        props.profile.company.length > 0 && <div className="p-company"><i className="fa fa-renren" aria-hidden="true"></i> {props.profile.company}</div>
                    }
                </div>
                
            </div>
        </>
    )
}

export default ProfileOverview; 