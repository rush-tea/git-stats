import React, {useState, useEffect, Suspense} from 'react';
import axios from 'axios';
import ProfileOverview from './ProfileOverview';
import DayStats from './charts/DaysStats';
import Stats from './Stats';
const Activities = React.lazy(() => import('./Activities'));
const Followers = React.lazy(() => import('./Followers'));
const Following = React.lazy(() => import('./Following'));
const Repositories = React.lazy(() => import('./Repositories'));


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
    const [events1,setEvents1] = useState([]);

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
        axios.get('https://api.github.com/users/' + props.match.params.profile_id + '/events?page=1&per_page=45',{
            headers: {
                authorization: `token ${process.env.REACT_APP_API_KEY}`
            }
        })
            .then(res => {
                setEvents(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const getEvents = async () => {
        var pageNo = 1;
        var ev = [];
        while (pageNo <= 10) {
            var res = await axios.get('https://api.github.com/users/' + props.match.params.profile_id + '/events?page=' + pageNo + '&per_page=100', {
                headers: {
                    authorization: `"token ${process.env.REACT_APP_KEY}"`
                }
            });
            if (pageNo <= 10 && res.data.length > 0) {
                res.data.forEach(res => {
                    //console.log(res);
                    ev.push(res);
                });
                pageNo++;
            }
            else {
                break;
            }
        }
        setEvents1(ev);
    }

    useEffect(() => {
        console.log(props);
        getStats();
        getEvents();
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

    const getDaysStats = (events) => {
        if(events.length > 0){
            return (
                <DayStats events={events} />
            )
        }
    }
    return (
        <>
        <header>
                {getProfile(profile)}
                {events1.length > 0 && <Stats events={events1} userName={profile} stats={stats} />}
        </header>
        <main>
                <div className="day-stats">
                    {events1.length > 0 && getDaysStats(events1)}
                </div>
                <div className="a-stats"> 
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
                        })} >Followers</button>
                        <button className="stats-item" onClick={() => setTabs({
                            activity: false,
                            followers: false,
                            following: true,
                            repos: false
                        })}>Following</button>
                        <button className="stats-item" onClick={() => setTabs({
                            activity: false,
                            followers: false,
                            following: false,
                            repos: true
                        })}>Repositories</button>
                    </div>
                    <Suspense fallback={<div>Loading...</div>} >
                        <div className="activity">
                            {getTabs(tabs, profile.login, events)}
                        </div>
                    </Suspense>
                </div> 
        </main>
            
        </>
    )
}

export default Profile