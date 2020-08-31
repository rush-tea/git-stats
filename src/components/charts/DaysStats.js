import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';

const DayStats = (props) => {

    const [events, setEvents] = useState([]);

    const getEvents = async () => {
        var pageNo = 1;
        var res = await axios.get('https://api.github.com/users/'+props.userName+'/events?page=' + pageNo + '&per_page=100', {
            headers: {
                authorization: "token 870ea8e5e754a23f7dc9d58fa95b0d83b1aa3516"
            }
        });
        setEvents([...events,res.data]);
    }

    useEffect(() => {
        getEvents()
    },[])

    const dispEvents = (events) => {
        if(events.length > 0){
            console.log(events);
        }
    }

    return(
        <>
        {dispEvents(events)}
        </>
    )

}

export default DayStats