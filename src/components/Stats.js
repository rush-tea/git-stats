import React, { useState, useEffect } from 'react';

function Stats(props) {

    const [lastDate, setLastDate] = useState('');
    const [load, setLoad] = useState(false);
    const [statsData, setStats] = useState({
        commitNo: 0,
        forkNo: 0,
        prNo: 0,
        followers: 0,
        following: 0,
        rePos: 0
    });

    useEffect(() => {
        if (props.events.length > 0) {
            getStats(props);
        }
    }, []);

    const getStats = (props) => {
        var commits = 0;
        var forks = 0;
        var pr = 0;
        var userName = props.userName.login;
        props.events.forEach(res => {
            if (res.type === "PushEvent") {
                commits = res.payload.size + commits;
            }
            if (res.type === "ForkEvent") {
                forks++;
            }
            if (res.type === "PullRequestEvent" && res.actor.login === userName && res.payload.action === "opened") {
                pr++;
            }
        });
        setStats({
            commitNo: commits,
            forkNo: forks,
            prNo: pr,
            followers: props.stats.followers,
            following: props.stats.following,
            rePos: props.stats.repos
        });
        setLoad(true);
    }

    return (
        <>

            {
                load === true && <div className="header-stats">
                    <div>Public commits : {statsData.commitNo}</div>
                    <div>Followers :     {statsData.followers}</div>
                    <div>Forks :   {statsData.forkNo}</div>
                    <div>Followings :    {statsData.following}</div>
                    <div>PRs :     {statsData.prNo}</div>
                    <div>Public Repositories :  {statsData.rePos}</div>
                </div>
            }
            <div className="lastDate">Contribution Statistics are from {props.lastDate}</div>
        </>
    )
}

export default Stats;