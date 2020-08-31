import React, {useState, useEffect} from 'react';

function Activities(props){
    const [activity, setActivity] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setActivity(props.events);
        setLoading(true);
    },[]);

    return(
        <>
        <div className="act-heading"> Latest Activities</div>
        <div className="activity-scroll" id="act-scrollbar">
            {
                activity.length > 0 && activity.map(res => {
                    var branchIcon = <i className="fa fa-code-fork" aria-hidden="true"></i>
                    var starIcon = <i className="fa fa-star" aria-hidden="true"></i>
                    var issueIcon = <i className="fa fa-bug" aria-hidden="true"></i>
                    var deleteIcon = <i className="fa fa-trash" aria-hidden="true"></i>
                    var plusIcon = <i className="fa fa-plus-circle" aria-hidden="true"></i>
                    repoUrl = "https://github.com/" +res.actor.login +"/" + res.repo.name.slice(res.actor.login.length + 1, res.repo.name.length) ;
                    switch (res.type) {
                        case "CreateEvent" :
                            if(res.payload.ref_type === 'branch'){
                                branchUrl = repoUrl + "/tree/" +res.payload.ref
                                return (
                                    <li key={res.id}>
                                        {branchIcon} Created a <a className="cool-link" href={branchUrl} >{res.payload.ref_type}</a> in <a className="cool-link" href={repoUrl}> {res.repo.name}</a>
                                    </li>
                                )
                            }
                            if(res.payload.ref_type === 'repository'){
                                return(
                                    <li key={res.id}>
                                        {plusIcon } <span>Created a {res.payload.ref_type}</span>  <span><a className="cool-link" href={repoUrl}> {res.repo.name}</a></span>
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
                                    {plusIcon} <span>Pushed </span>{res.payload.size} {commit} to <a className="cool-link" href={branchUrl}> {branchName}</a> in <a className="cool-link" href={repoUrl}> {res.repo.name} </a>
                                </li>
                            )
                        case "WatchEvent" : 
                            repoUrl = "https://github.com/" + res.repo.name;
                            return (
                                <li key={res.id}>
                                    {starIcon} Starred a repo <a className="cool-link" href={repoUrl}>{res.repo.name}</a>
                                </li>
                            )
                        case "DeleteEvent" :
                            repoUrl = "https://github.com/" + res.repo.name;
                            return (
                                <li key={res.id}>
                                    {deleteIcon} Deleted a {res.payload.ref_type} {res.payload.ref} from <a className="cool-link" href={repoUrl}>{res.repo.name}</a>
                                </li>
                            ) 
                        case "ForkEvent": 
                            var fromUrl = "https://github.com/" + res.repo.name;   
                            var toUrl = "https://github.com/" + res.payload.forkee.full_name; 
                            return (
                                <li key={res.id}>
                                    {branchIcon} Forked a repo <a className="cool-link" href={fromUrl}>{res.repo.name}</a> to <a className="cool-link" href={toUrl}>{res.payload.forkee.full_name}</a>
                                </li>
                            )
                        case "PullRequestEvent" :
                            repoUrl = "https://github.com/" + res.repo.name;
                            action = res.payload.action;
                            if(action === "closed"){
                                var iconNext = deleteIcon
                            }    
                            else{
                                iconNext = branchIcon 
                            }
                            return (
                                <li key={res.id}>
                                    {iconNext} {action.slice(0, 1).toUpperCase() + action.slice(1, action.length)} a <a className="cool-link" href={res.payload.pull_request.html_url}>pull request</a> in <a className="cool-link" href={repoUrl}>{res.repo.name}</a>
                                </li>
                            )
                        case "IssuesEvent" :
                            var action= res.payload.action;
                            var repoUrl = "https://github.com/" + res.repo.name;
                            return (
                                <li key={res.id}>
                                    {issueIcon} {action.slice(0, 1).toUpperCase() + action.slice(1, action.length)} a <a className="cool-link" href={res.payload.issue.html_url}>issue </a> in <a className="cool-link" href={repoUrl}> {res.repo.name} </a>
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