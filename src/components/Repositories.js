import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function Repositories(props) {
    const [activity, setActivity] = useState([]);

    useEffect(() => {
        console.log(props.userName);
        axios.get("https://api.github.com/users/" + props.userName + "/repos")
            .then(res => {
                setActivity(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const getMoreDetails = (userName) => {
        console.log(userName);
            return(
                <div>Hello</div>
            )
    }

    return (
        <>
            <div className="act-heading"> Repositories</div>
            <div className="repo-scroll" id="act-scrollbar">
                {
                    activity.map(res => {
                        return(
                            <div key={res.id} className="repo-detail">
                                <a href={res.svn_url} className="repo-name"><div >{res.name} <i className="fa fa-github-alt" aria-hidden="true"></i></div></a> 
                                <Link to={'/'+res.owner.login + '/' + res.name} className="repo-more">View More <i className="fa fa-plus" aria-hidden="true"></i></Link>
                                <div className="repo-desc">{res.description}</div>
                                <div className="repo-forks">Forks: {res.forks}</div>
                                <div className="repo-stars">Stars: {res.watchers}</div>
                                <div className="repo-language">{res.language}</div>
                                {
                                    res.homepage && <div className="repo-site"><a href={res.homepage}> View Website <i className="fa fa-sitemap" aria-hidden="true"></i></a></div>
                                }
                            </div>
                        )
                    })
                }
                </div>
        </>
    )
}

export default Repositories; 