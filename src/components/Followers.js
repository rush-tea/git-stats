import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PuffLoader from 'react-spinners/PuffLoader';
import { css } from '@emotion/core';


const overHead = css`
  height: 60vh;
  display: block;
  margin: 30vh auto 10vh auto;
  grid-column: 1/4;
`;

function Followers(props) {

    const max_page = Math.ceil(props.stats.followers / 30);

    const [followers, setFollowers] = useState([]);

    const [pageNo, setPageNo] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (pageNo < 1) {
            setPageNo(1);
        }
        axios({
            method: 'get',
            url: 'https://api.github.com/users/' + props.userName + '/followers?page=' + pageNo + '&per_page=30',
        }, {
            headers: {
                authorization: `token ${process.env.REACT_APP_API_KEY}`
            }
        }).then(function (response) {
            setFollowers(response.data);
            setIsLoading(false);
        });
    }, [pageNo]);


    if (isLoading === true) {
        return (
            <PuffLoader color="#333" css={overHead} loading={isLoading} />
        );
    }
    else {
        return (
            <>
                <div className="f-div">
                    {
                        followers.map(res => {
                            return (
                                <div key={res.id} className="f-details">
                                    <img src={res.avatar_url} alt="logo" className="f-logo" />
                                    <span className="f-username"><button onClick={() => window.location.reload()}><Link to={`/${res.login}`} className="cool-link">{res.login} <i className="fa fa-location-arrow" aria-hidden="true"></i></Link></button></span>
                                    <span className='f-git-link'><a href={res.html_url} className="cool-link">Github <i className="fa fa-github-alt" aria-hidden="true"></i></a></span>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="page-button">
                    <button onClick={() => {
                        if (pageNo != 1) {
                            setPageNo(pageNo - 1)
                        }
                    }} className={pageNo === 1 ? 'btn disabled' : 'btn'} >Prev</button>
                    <button onClick={() => {
                        if (pageNo != max_page) {
                            setPageNo(pageNo + 1)
                        }
                    }} className={pageNo === max_page ? 'btn disabled' : 'btn'} >Next</button>
                </div>
            </>
        )
    }


}

export default Followers;