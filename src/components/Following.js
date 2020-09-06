import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function Following(props) {

    const [followings, setFollowings] = useState([]);

    const [pageNo, setPageNo] = useState(1);

    useEffect(() => {
        if(pageNo < 1) {
            setPageNo(1);
        }
        axios({
            method: 'get',
            url: 'https://api.github.com/users/' + props.userName + '/following?page=' + pageNo +  '&per_page=30',
        },{
            headers: {
                authorization: `token ${process.env.REACT_APP_API_KEY}`
            }
        }).then(function (response) {
            setFollowings(response.data);
        });
    },[pageNo]);

    return (
        <>
        <div className="f-div">
        {
            followings.map(res => {
                return(
                    <div key={res.id} className="f-details">
                        <img src={res.avatar_url} alt="logo" className="f-logo" />
                        <span className="f-username">{res.login} </span>
                        <span className='f-git-link'><Link to={res.html_url}>Github <i className="fa fa-github-alt" aria-hidden="true"></i></Link></span>
                    </div>
                )
            })
        }
        </div>
        <div className='page-button'>
            <button onClick={() => setPageNo(pageNo - 1)}>Prev</button>
            <button onClick={() => setPageNo(pageNo + 1)}>Next</button>
        </div>
        </>
    )
}

export default Following;