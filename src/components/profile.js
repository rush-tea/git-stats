import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Activities from './Activities';

function Profile(props){
    const [stats, setStats] = useState({
        followers: 0,
        following: 0,
        repos: 0
    });
    
    const [profile, setProfile] = useState({
        avatar_url : '',
        bio: '',
        company: '',
        joinedOn: '',
        name: '',
        login: ''
    });

    const getStats = () => {
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        axios.get('https://api.github.com/users/' + props.match.params.profile_id)
        .then( res => {
            var date = new Date(res.data.created_at);
            setStats({
                followers: res.data.followers,
                following: res.data.following,
                repos: res.data.public_repos
            });
            setProfile({
                avatar_url: res.data.avatar_url,
                bio: res.data.bio,
                company: res.data.company,
                joinedOn: date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear(),
                name: res.data.name,
                login: res.data.login
            });
        })
        .catch(err => console.log(err));
        
    }

    useEffect(() => {
        getStats();
    }, []);

    return(
        <>
        <header>
            <div className="logo">
                <img src={profile.avatar_url} alt="logo" />
            </div>
            <div className="profileName">
                <span>{profile.name}</span>
                <span> {profile.login} </span>
                <span>{profile.bio}</span>
                <span>{profile.company}</span>
                <span>Joined on {profile.joinedOn} </span>
            </div>
            <div className="stats">
                <div className="stats-item"> Followers: {stats.followers}</div>
                <div className="stats-item"> Following: {stats.following}</div>
                <div className="stats-item"> Repositories: {stats.repos}</div>
            </div>
        </header>
        <Activities userName = {props.match.params.profile_id} />
        </>
    )
}

export default Profile