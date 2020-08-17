import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Activities(props){
    const [activity, setActivity] = useState([]);

    useEffect(() => {
        console.log(props.userName);
        axios.get("https://api.github.com/users/" + props.userName + "/events/public")
            .then(res => {
                setActivity(res.data);
            })
            .catch(err => console.log(err));
    },[]);

    return(
        <>
        <div>
            {
                activity.map(res => {
                    var repoUrl = "https://github.com/" +res.actor.login +"/" + res.repo.name.slice(res.actor.login.length + 1, res.repo.name.length) ;
                    switch (res.type) {
                        case "CreateEvent" :
                            if(res.payload.ref_type === 'branch'){
                                var branchUrl = repoUrl + "/tree/" +res.payload.ref
                                return (
                                    <li key={res.id}>
                                        Created a <a href={branchUrl} >{res.payload.ref_type}</a> in <a href={repoUrl}> {res.repo.name}</a>
                                    </li>
                                )
                            }
                            if(res.payload.ref_type === 'repository'){
                                return(
                                    <li key={res.id}>
                                        Created a {res.payload.ref_type} <a href={repoUrl}> {res.repo.name}</a>
                                    </li>
                                )
                            }
                            break;
                        case "PushEvent" :
                            var branchName = res.payload.ref.slice(11, res.payload.ref.length);
                            let commit = "commit";
                            var branchUrl = repoUrl + "/tree/" + branchName;
                            if(res.payload.size > 1){
                                commit = commit + 's';
                            } 
                            return (
                                <li key={res.id}>
                                    Pushed {res.payload.size} {commit} to <a href={branchUrl}> {branchName}</a> in <a href={repoUrl}> {res.repo.name} </a>
                                </li>
                            )
                        case "WatchEvent" : 
                            var repoUrl = "https://github.com/" + res.repo.name;
                            return (
                                <li key={res.id}>
                                    Starred a repo <a href={repoUrl}>{res.repo.name}</a>
                                </li>
                            )
                        case "DeleteEvent" :
                            var repoUrl = "https://github.com/" + res.repo.name;
                            return (
                                <li key={res.id}>
                                    Deleted a {res.payload.ref_type} {res.payload.ref} from <a href={repoUrl}>{res.repo.name}</a>
                                </li>
                            ) 
                        case "ForkEvent": 
                            var fromUrl = "https://github.com/" + res.repo.name;   
                            var toUrl = "https://github.com/" + res.payload.forkee.full_name; 
                            return (
                                <li key={res.id}>
                                    Forked a repo <a href={fromUrl}>{res.repo.name}</a> to <a href={toUrl}>{res.payload.forkee.full_name}</a>
                                </li>
                            )
                        case "PullRequestEvent" :
                            var repoUrl = "https://github.com/" + res.repo.name;
                            var action = res.payload.action;    
                            return (
                                <li key={res.id}>
                                    {action.slice(0,1).toUpperCase() + action.slice(1,action.length)} a <a href={res.payload.pull_request.html_url}>pull request</a> in <a href={repoUrl}>{res.repo.name}</a>
                                </li>
                            )
                        case "IssuesEvent" :
                            var action= res.payload.action;
                            var repoUrl = "https://github.com/" + res.repo.name;
                            return (
                                <li key={res.id}>
                                    {action.slice(0, 1).toUpperCase() + action.slice(1, action.length)} a <a href={res.payload.issue.html_url}>issue </a> in <a href={repoUrl}> {res.repo.name} </a>
                                </li>
                            )                   
                        default:
                            return;
                    }
                })
            }
        </div>
        </>
    )
}

export default Activities; 