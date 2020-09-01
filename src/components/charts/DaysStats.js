import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const DayStats = (props) => {

    const [events, setEvents] = useState([]);
    const [loaded,setLoad] = useState(false);
    const [Mon,setMon] = useState(0)
    const [Tue, setTue] = useState(0)
    const [Wed, setWed] = useState(0)
    const [Thu, setThu] = useState(0)
    const [Fri, setFri] = useState(0)
    const [Sat, setSat] = useState(0)
    const [Sun, setSun] = useState(0)

    const getEvents = async () => {
        var pageNo = 1;
        var res = await axios.get('https://api.github.com/users/'+props.userName+'/events?page=' + pageNo + '&per_page=100', {
            headers: {
                authorization: `"token ${process.env.REACT_APP_KEY}"`
            }
        });
        setEvents([...events,res.data]);
    }

    useEffect(() => {
        getEvents()
    },[])

    const dispEvents = (events) => {
        if(events.length > 0 && loaded === false){
            //console.log(events[0]);
            var daysArray = [0, 0, 0, 0, 0, 0, 0]
            events[0].forEach(res => {
                var day = new Date(res.created_at);
                day = day.toUTCString();
                day = day.slice(0,3);
                console.log(day);
                switch (day) {
                    case "Mon":
                        daysArray[0]++;
                    case "Tue" : 
                        daysArray[1]++;
                    case "Wed":
                        daysArray[2]++;
                    case "Thu":
                        daysArray[3]++;
                    case "Fri":
                        daysArray[4]++;
                    case "Sat":
                        daysArray[5]++;
                    case "Sun":
                        daysArray[6]++;                    
                    default:
                        break;
                }
                //setLoad(true);
            });
            setMon(daysArray[0]);
            setTue(daysArray[1]);
            setWed(daysArray[2]);
            setThu(daysArray[3]);
            setFri(daysArray[4]);
            setSat(daysArray[5]);
            setSun(daysArray[6]);
            setLoad(true);
        }
    }

    return(
        <>
        {dispEvents(events)}
        {
            loaded===true && <Bar data={{
                datasets: [{
                    data: [Mon,Tue,Wed,Thu,Fri,Sat,Sun]
                }],
                labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 1, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 1, 64, 1)'
                    ],
                    borderWidth: 1
            }}/>
        }
        </>
    )

}

export default DayStats