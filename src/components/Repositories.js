import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

    return (
        <>
            <div className="act-heading"> Repositories</div>
            <div className="activity-scroll" id="act-scrollbar">
                {
                    activity.map(res => {
                        return(
                            <li key={res.id}>
                                <div>{res.name}</div>
                                <div>{res.description}</div>
                                <div><a href={res.homepage}> View Website </a></div>
                            </li>
                        )
                    })
                }
                </div>
        </>
    )
}

export default Repositories; 