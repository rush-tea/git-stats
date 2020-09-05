import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const DayStats = (props) => {

    const [events, setEvents] = useState([]);
    const [loaded,setLoad] = useState(false);
    const [Days, setDays] = useState([0,0,0,0,0,0,0])
    const [Time, setTime] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [TimebgColor,setBg] = useState();

    useEffect(() => {
        var ev = [];
        if(props.events.length > 0 ){
            props.events.forEach(res => {
                ev.push(res);
            });
        }
        setEvents(ev);
    },[props]);

    const dispEvents = (events) => {
        
        if(events.length > 0 && loaded === false){
            var daysArray = [0, 0, 0, 0, 0, 0, 0]
            var timeArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0];
            events.forEach(res => {
                var day = new Date(res.created_at);
                var hours = day.getHours();
                day = day.toUTCString();
                day = day.slice(0,3);
                timeArray[hours]++;
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
            i=0;
            var sum = 0;
            timeArray.forEach(data => {
                sum = sum + data;
            })
            timeArray.forEach(data => {
                data = (data/sum) * 100;
                timeArray[i] = data.toFixed(2);
                i++;
            });
            var bg1 = 'rgba(75, 192, 192, 0.2)';
            var bg2 = 'rgba(153, 102, 255, 0.2)';
            var bg3 = 'rgba(255, 159, 64, 0.2)';
            var bg4 = 'rgba(255, 1, 64, 0.2)';
            var bgArray = [];
            for (let i = 0; i < timeArray.length; i++) {
                if(i<6){
                    bgArray.push(bg1);
                }
                else if(i>5 && i<12){
                    bgArray.push(bg2);
                }
                else if(i>11 && i<18){
                    bgArray.push(bg3);
                }
                else{
                    bgArray.push(bg4);
                }
            }
            setBg(bgArray);
            setTime(timeArray);
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
        <div>
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
                    ]
                }],
                labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
            }} options={{
                scales: {
                    xAxes: [{
                        gridLines:{
                            display: false
                        }
                    }],
                    yAxes: [{
                        display: false
                    }]
                }
            }}/>
        }
        </div>
        <div>
            {
                loaded === true && <Bar data={{
                    datasets: [{
                        label: "Contribution %",
                        data: Time,
                        backgroundColor: TimebgColor,
                    }],

                    labels: ["0", "", "", "", "", "6","", "", "", "", "", "12", "", "", "", "", "", "18", "", "", "", "", "", "24"]
                }} options={{
                    scales:{
                        xAxes:[{
                            ticks: {
                                min: 6,
                                maxRotation: 0
                            },
                            gridLines: {
                                display: false
                            }
                        }],
                        yAxes:[{
                            gridLines: {
                                display: false
                            },
                            ticks:{
                                display: false
                            }
                        }]
                    }
                }}/>
            }
        </div>
        </>
    )

}

export default DayStats