import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileOverview from './ProfileOverview';
import {Doughnut} from 'react-chartjs-2';
import LanguageChart from './charts/languages';

function MoreRepoDetails(props) {
    const [activity, setActivity] = useState({});
    const [lang, setLang] = useState({});
    const [profileId, setProfileId] = useState('');
    const [repoId, setrepoId] = useState('');
    const [data, setData] = useState({});
    const [profile, setProfile] = useState({
        avatar_url: '',
        bio: '',
        company: '',
        joinedOn: '',
        name: '',
        login: ''
    });

    const getRepoDetails = () => {
        axios.get("https://api.github.com/repos/" + props.match.params.profile_id + '/' + props.match.params.repo_name,{
            headers: {
                authorization: `token ${process.env.REACT_APP_API_KEY}`
            }
        })
            .then(res => {
                setActivity(res.data);
                console.log(res.data.id);
            })
            .catch(err => console.log(err));

    }

    useEffect(() => {
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        console.log(props);
        setProfileId(props.match.params.profile_id);
        setrepoId(props.match.params.repo_name);
        axios.get("https://api.github.com/users/" + props.match.params.profile_id,{
            headers: {
                authorization: `token ${process.env.REACT_APP_API_KEY}`
            }
        })
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
            getRepoDetails();
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
            <div className="repo-d-scroll" id="act-d-scrollbar">
                <div key={activity.id} className="repo-d-detail">
                    <a href={activity.svn_url} className="repo-d-name"><div >{activity.name} <i className="fa fa-github-alt" aria-hidden="true"></i></div></a>
                    <div className="repo-d-desc">{activity.description}</div>
                    <LanguageChart ids={
                        {profile_id : {profileId},
                        repo_name : {repoId}}
                    } />
                    <div className="repo-d-forks">Forks: {activity.forks}</div>
                    <div className="repo-d-stars">Stars: {activity.watchers}</div>
                    <div className="repo-d-language">{activity.language}</div>
                    {
                        activity.homepage && <div className="repo-d-site"><a href={activity.homepage}> View Website <i className="fa fa-sitemap" aria-hidden="true"></i></a></div>
                    }
                </div>             
            </div>
        </>
    )
}

export default MoreRepoDetails; 