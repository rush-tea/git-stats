import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const DayStats = (props) => {

    const [events, setEvents] = useState([]);
    const [loaded,setLoad] = useState(false);
    const [Days, setDays] = useState([0,0,0,0,0,0,0])

    const getEvents = async () => {
        var pageNo = 1;
        var ev = [];
        while(pageNo<=10){
            var res = await axios.get('https://api.github.com/users/' + props.userName + '/events?page=' + pageNo + '&per_page=100', {
                headers: {
                    authorization: `"token ${process.env.REACT_APP_KEY}"`
                }
            });
            if(pageNo <= 10 && res.data.length > 0){
                res.data.forEach(res => {
                    ev.push(res);
                });
                pageNo++;
            }
            else{
                break;
            }
        }
        setEvents(ev);
    }

    useEffect(() => {
        getEvents()
    },[])

    const dispEvents = (events) => {
        
        if(events.length > 0 && loaded === false){
            var daysArray = [0, 0, 0, 0, 0, 0, 0]
            events.forEach(res => {
                var day = new Date(res.created_at);
                day = day.toUTCString();
                day = day.slice(0,3);
                switch (day) {
                    case "Mon":
                        daysArray[0]++;
                        break;
                    case "Tue" : 
                        daysArray[1]++;
                        break;
                    case "Wed":
                        daysArray[2]++;
                        break;
                    case "Thu":
                        daysArray[3]++;
                        break;
                    case "Fri":
                        daysArray[4]++;
                        break;
                    case "Sat":
                        daysArray[5]++;
                        break;
                    case "Sun":
                        daysArray[6]++;
                        break;                    
                    default:
                        break;
                }
                //setLoad(true);
            });
            var sum = daysArray[0] + daysArray[1] + daysArray[2] + daysArray[3] + daysArray[4] +daysArray[5] + daysArray[6]; 
            var i = 0;
            daysArray.forEach(data => {
                data = (data/sum) *100;
                daysArray[i] = data.toFixed(2);
                i++; 
            });
            setDays(daysArray);
            setLoad(true);
        }
        else{
            return;
        }
    }

    return(
        <>
        {dispEvents(events)}
        {
            loaded===true && <Bar data={{
                datasets: [{
                    label: "Contribution %",
                    data: Days,
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
                }],
                labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
            }}/>
        }
        </>
    )

}

export default DayStats