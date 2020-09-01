import React, {useState, useEffect, Suspense} from 'react';
import axios from 'axios';
import ProfileOverview from './ProfileOverview';
import DayStats from './charts/DaysStats';
const Activities = React.lazy(() => import('./Activities'));
const Followers = React.lazy(() => import('./Followers'));
const Following = React.lazy(() => import('./Following'));
const Repositories = React.lazy(() => import('./Repositories'));

console.log(process.env.REACT_APP_API_KEY)

function Profile(props) {

    const [loaded,setLoading] = useState(false);
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
    const [events, setEvents] = useState({});

    const getStats = () => {
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        axios.get('https://api.github.com/users/' + props.match.params.profile_id, {
            headers: {
                authorization: `token ${process.env.REACT_APP_API_KEY}`
            }
            })
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
                setLoading(true);
            })
            .catch(err => {
                console.log(err);
                setLoading(true);
            });
        axios.get('https://api.github.com/users/' + props.match.params.profile_id + '/events?page=1&per_page=60',{
            headers: {
                authorization: `token ${process.env.REACT_APP_API_KEY}`
            }
        })
            .then(res => {
                //console.log(res);
                setEvents(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        getStats();
    }, []);

    const getTabs = (status,userName, events) => {
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
        else if (status.activity && userName.length !== 0 && events.length !== 0){
            return (
                <Activities events = {events} />
            )
        }
    }

    const getProfile = () => {
        if(profile.login.length !== 0){
            return(
                <ProfileOverview profile={profile} />
            )
        }
    }

    const getDaysStats = (userName) => {
        if(userName.length > 0){
            return (
                <DayStats userName={userName} />
            )
        }
    }
    return (
        <>
        <header>
                {getProfile(profile)}
                <div className="stats">
                    <button className="stats-item" onClick={() => setTabs({
                        activity: true,
                        followers: false,
                        following: false,
                        repos: false
                    })}>Activity</button>
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
        <Suspense fallback = {<div>Loading...</div>} >
            <div className="activity">
                {getTabs(tabs, profile.login , events)}
            </div> 
        </Suspense>
        <div>
            {getDaysStats(profile.login) }
        </div>       
        </>
    )
}

export default Profile