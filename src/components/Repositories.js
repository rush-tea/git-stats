import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Repositories(props) {
    const [activity, setActivity] = useState([]);

    useEffect(() => {
        axios.get("https://api.github.com/users/" + props.userName + "/repos", {
            headers: {
                authorization: `token ${process.env.REACT_APP_API_KEY}`
            }
        })
            .then(res => {
                setActivity(res.data);
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const getRepo = (res) => {
        console.log(res);
        return (
            <>
                <Link to={`/${props.userName}/${res.name}`} className="repo-name">{res.name}</Link>
                <a href={res.html_url} className="repo-more">View on GitHub<i className="fa fa-github-alt" aria-hidden="true"></i></a>
                <div className="repo-desc">{res.description}</div>
                <div className="repo-forks">Forks: {res.forks}</div>
                <div className="repo-stars">Stars: {res.watchers}</div>
                <div className="repo-language">{res.language}</div>
                {
                    res.homepage && <div className="repo-site"><a href={res.homepage}> View Website <i className="fa fa-sitemap" aria-hidden="true"></i></a></div>
                }
            </>
        )
    }

    return (
        <>
            <div className="repo-scroll" id="act-scrollbar">
                {
                    activity.map(res => {
                        return (
                            <div className="repo-detail" key={res.id}>
                                {
                                    res.fork == false && getRepo(res)
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