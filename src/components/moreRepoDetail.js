import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileOverview from './ProfileOverview';

function MoreRepoDetails(props) {
    const [activity, setActivity] = useState([]);
    const [profile, setProfile] = useState({
        avatar_url: '',
        bio: '',
        company: '',
        joinedOn: '',
        name: '',
        login: ''
    });

    useEffect(() => {
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        console.log(props);
        axios.get("https://api.github.com/users/" + props.match.params.profile_id)
            .then(res => {
                var date = new Date(res.data.created_at);
                setProfile({
                    avatar_url: res.data.avatar_url,
                    bio: res.data.bio,
                    company: res.data.company,
                    name: res.data.name,
                    login: res.data.login,
                    joinedOn: date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear(),
                });
            })
            .catch(err => console.log(err));
    }, []);

    const getProfile = (profile) => {
        if(profile.login.length !== 0){
            return(
                <header>
                    <ProfileOverview profile={profile} />
                </header>
            )
        }
    }

    return (
        <>
            {getProfile(profile)}
        </>
    )
}

export default MoreRepoDetails; 