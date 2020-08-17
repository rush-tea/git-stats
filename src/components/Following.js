import React, {useEffect, useState} from 'react';
import axios from 'axios';

function Following(props) {

    const [followings, setFollowings] = useState([]);

    const [followingData, setfollowingData] = useState([
        {
            login: '',
            avatar_url: '',
            followingsNo: '',
            followersNo: '',
            repoNo: '' 
        }
    ]);

    useEffect(() => {
        console.log(props);
        axios({
            method: 'get',
            url: 'https://api.github.com/users/' + props.userName + '/following?page=1&per_page=200',
        }).then(function (response) {
            setFollowings(response.data);
            response.data.map(res => {
                axios({
                    method: 'get',
                    url: 'https://api.github.com/users/' + res.login +'?page=1&per_page=30'
                }).then(function (resp) {
                    console.log(resp);
                })
            })
        });
    },[]);

    return (
        <div>
        {
            followings.map(res => {
                return(
                    <div key={res.id} className="following-details">
                        <img src={res.avatar_url} alt="logo" className="following-logo" />
                         <div>
                            <span>{res.login}</span>
                            
                        </div>
                    </div>
                )
            })
        }
        </div>
    )
}

export default Following;