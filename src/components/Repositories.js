import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PuffLoader from 'react-spinners/PuffLoader';
import { css } from '@emotion/core';


const overHead = css`
  height: 60vh;
  display: block;
  margin: 30vh auto 10vh auto;
  grid-column: 1/4;
`;

function Repositories(props) {
    const [activity, setActivity] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get("https://api.github.com/users/" + props.userName + "/repos?per_page=100", {
            headers: {
                authorization: `token ${process.env.REACT_APP_API_KEY}`
            }
        })
            .then(res => {
                setActivity(res.data);
                setIsLoading(false);
            })
            .catch(err => console.log(err));
    }, []);

    const getRepo = (res) => {
        return (
            <>
                <Link to={
                    {
                        pathname: `/${props.userName}/${res.name}`,
                        state: res
                    }
                } className="repo-name">{res.name}</Link>
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

    if (isLoading === true) {
        return (
            <PuffLoader color="#333" css={overHead} loading={isLoading} />
        );
    }
    else {
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
}

export default Repositories; 