import React, { useState, useEffect } from 'react';

<<<<<<< HEAD
function Stats(props) {

||||||| cb9b435
function Stats(props){

=======
function Stats(props){

    const [lastDate,setLastDate] = useState('');
>>>>>>> d68d2ed2f47a3ca7300d0ac7e71a877f3bf3a67c
    const [load, setLoad] = useState(false);
    const [statsData, setStats] = useState({
        commitNo: 0,
        forkNo: 0,
        prNo: 0
    });

    useEffect(() => {
        if (props.events.length > 0) {
            getStats(props);
        }
    }, []);

    const getStats = (props) => {
        console.log(props);
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