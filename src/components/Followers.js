import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Followers(props) {

    const [followers, setFollowers] = useState([]);

    const [pageNo, setPageNo] = useState(1);

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
        });
    }, [pageNo]);

    return (
        <>
            <div className="f-div">
                {
                    followers.map(res => {
                        return (
                            <div key={res.id} className="f-details">
                                <img src={res.avatar_url} alt="logo" className="f-logo" />
                                <span className="f-username"><button onClick={() => window.location.reload()}><Link to={`/${res.login}`} className="cool-link">{res.login}</Link></button></span>
                                <span className='f-git-link'><a href={res.html_url} className="cool-link">Github <i className="fa fa-github-alt" aria-hidden="true"></i></a></span>
                            </div>
                        )
                    })
                }
            </div>
            <div className="page-button">
                <button onClick={() => setPageNo(pageNo - 1)}>Prev</button>
                <button onClick={() => setPageNo(pageNo + 1)}>Next</button>
            </div>
        </>
    )
}

export default Followers;