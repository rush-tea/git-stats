import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Activities from './Activities';
import Followers from './Followers';
import Following from './Following';
import Repositories from './Repositories';


function Profile(props) {
    const [stats, setStats] = useState({
        followers: 0,
        following: 0,
        repos: 0
    });

    const [profile, setProfile] = useState({
        avatar_url: '',
        bio: '',
        company: '',
        joinedOn: '',
        name: '',
        login: ''
    });
    const [tabs, setTabs] = useState({
        activity: true,
        following: false,
        followers: false,
        repos: false
    });

    const getStats = () => {
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        axios.get('https://api.github.com/users/' + props.match.params.profile_id )
            .then(res => {
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

    const getTabs = (status,userName) => {
        if(status.followers && userName.length !== 0){
            return(
                <Followers  userName={userName}/>
            )
        }
        else if (status.following && userName.length !== 0) {
            return (
                <Following userName={userName} />
            )
        }
        else if (status.repos && userName.length !== 0) {
            return (
                <Repositories userName={userName} />
            )
        }
        else if (status.activity && userName.length !== 0){
            return (
                <Activities userName={userName} />
            )
        }
    }

    return (
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
                    <button className="stats-item" onClick={() => setTabs({
                        activity: true,
                        followers: false,
                        following: false,
                        repos: false
                    }) }>Activity</button>
                    <button className="stats-item" onClick={() => setTabs({
                        activity: false,
                        followers: true,
                        following: false,
                        repos: false
                    })} > {stats.followers} Followers</button>
                    <button className="stats-item" onClick={() => setTabs({
                        activity: false,
                        followers: false,
                        following: true,
                        repos: false
                    })}>{stats.following} Following</button>
                    <button className="stats-item" onClick={() => setTabs({
                        activity: false,
                        followers: false,
                        following: false,
                        repos: true
                    })}>{stats.repos} Repositories</button>
                </div>
            </header>
            <div className="activity">
                {getTabs(tabs, profile.login)} 
            </div>        
        </>
    )
}

export default Profile