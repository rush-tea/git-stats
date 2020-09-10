import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { css } from '@emotion/core';

const override = css`
    display: block;
    margin: 0 auto;
`;

const DayStats = (props) => {

    const [events, setEvents] = useState([]);
    const [prodDays, setProdDays] = useState({
        firstDay: ''
    });
    const [loaded, setLoaded] = useState(false);
    const [Days, setDays] = useState([0, 0, 0, 0, 0, 0, 0])
    const [Time, setTime] = useState({
        a: [],
        b: [],
        c: [],
        d: [],
        e: [],
        f: []
    });
    const [TimebgColor, setBg] = useState();

    useEffect(() => {
        var ev = [];
        if (props.events.length > 0) {
            props.events.forEach(res => {
                ev.push(res);
            });
        }
        setEvents(ev);
    }, [props]);

    const dispEvents = (events) => {

        if (events.length > 0 && loaded === false) {
            var DayName = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            var daysArray = []
            var timeArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var Mon = 0, Tue = 0, Wed = 0, Thur = 0, Fri = 0, Sat = 0, Sun = 0;
            events.forEach(res => {
                var day = new Date(res.created_at);
                var hours = day.getHours();
                day = day.toUTCString();
                day = day.slice(0, 3);
                timeArray[hours]++;
                switch (day) {
                    case "Mon":
                        //daysArray[0]++;
                        Mon++;
                        break;
                    case "Tue":
                        //daysArray[1]++;
                        Tue++;
                        break;
                    case "Wed":
                        //daysArray[2]++;
                        Wed++;
                        break;
                    case "Thu":
                        //daysArray[3]++;
                        Thur++;
                        break;
                    case "Fri":
                        //daysArray[4]++;
                        Fri++;
                        break;
                    case "Sat":
                        //daysArray[5]++;
                        Sat++;
                        break;
                    case "Sun":
                        //daysArray[6]++;
                        Sun++;
                        break;
                    default:
                        break;
                }
                //setLoad(true);
            });
            [Mon, Tue, Wed, Thur, Fri, Sat, Sun].forEach((data) => {
                daysArray.push(data);
            })
            console.log(daysArray);
            var sum = Mon + Tue + Wed + Thur + Fri + Sat + Sun;
            setDays([((Mon / sum) * 100).toFixed(2), ((Tue / sum) * 100).toFixed(2), ((Wed / sum) * 100).toFixed(2), ((Thur / sum) * 100).toFixed(2), ((Fri / sum) * 100).toFixed(2), ((Sat / sum) * 100).toFixed(2), ((Sun / sum) * 100).toFixed(2)]);
            var arr1 = [Mon, Tue, Wed, Thur, Fri, Sat, Sun];
            var max1 = arr1.reduce(function (a, b) {
                return Math.max(a, b);
            });
            console.log(max1);
            var index1;
            for (let i = 0; i < arr1.length; i++) {
                if (max1 === arr1[i]) {
                    index1 = i;
                    break;
                }
            }
            console.log(arr1);
            setProdDays({
                firstDay: DayName[index1]
            });
            var i = 0;
            var sum = 0;
            timeArray.forEach(data => {
                sum = sum + data;
            });
            timeArray.forEach(data => {
                data = (data / sum) * 100;
                timeArray[i] = data.toFixed(2);
                i++;
            });
            var bgArray = ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 1, 64, 0.2)'];
            var a1 = [];
            var a2 = [];
            var a3 = [];
            var a4 = [];
            var a5 = [];
            var a6 = [];
            //console.log(daysArray);
            for (let i = 0; i < timeArray.length; i++) {
                if (i % 6 === 0) {
                    a1.push(timeArray[i]);
                }
                else if (i % 6 === 1) {
                    a2.push(timeArray[i]);
                }
                else if (i % 6 === 2) {
                    a3.push(timeArray[i]);
                }
                else if (i % 6 === 3) {
                    a4.push(timeArray[i]);
                }
                else if (i % 6 === 4) {
                    a5.push(timeArray[i]);
                }
                else if (i % 6 === 5) {
                    a6.push(timeArray[i]);
                }
            }
            setBg(bgArray);
            setTime({
                a: a1,
                b: a2,
                c: a3,
                d: a4,
                e: a5,
                f: a6
            });
            //console.log(daysArray);


            setLoaded(true);
        }
        else {
            return;
        }
    }

    const getContent = (Days, loaded, prodDays, Time, TimebgColor, override) => {
        if (loaded === true) {
            return (
                <><>
                    <div className="charts">
                        {
                            loaded === true && <div>Most productive on <span>{prodDays.firstDay}</span> in recent Days.</div>
                        }
                        {
                            loaded === true && <Bar data={{
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
                                labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                            }} options={{
                                animation: {
                                    duration: 3000,
                                    easing: 'easeInOutQuint',
                                },
                                title: {
                                    text: "Daywise Contribution",
                                    position: 'bottom',
                                    display: true
                                },
                                legend: {
                                    display: false
                                },
                                scales: {
                                    xAxes: [{
                                        ticks: {
                                            autoSkip: true
                                        },
                                        gridLines: {
                                            display: false
                                        }
                                    }],
                                    yAxes: [{
                                        display: false
                                    }]
                                }
                            }} />
                        }


                    </div>
                    <div className="charts">
                        {
                            loaded === true && <Bar data={{
                                datasets: [{
                                    label: "Contribution % ",
                                    data: Time.a,
                                    backgroundColor: TimebgColor,
                                },
                                {
                                    label: "Contribution % ",
                                    data: Time.b,
                                    backgroundColor: TimebgColor,
                                },
                                {
                                    label: "Contribution % ",
                                    data: Time.c,
                                    backgroundColor: TimebgColor
                                },
                                {
                                    label: "Contribution % ",
                                    data: Time.d,
                                    backgroundColor: TimebgColor
                                },
                                {
                                    label: "Contribution % ",
                                    data: Time.e,
                                    backgroundColor: TimebgColor
                                },
                                {
                                    label: "Contribution % ",
                                    data: Time.f,
                                    backgroundColor: TimebgColor
                                },
                                ],
                                labels: ["Night", "Morning", "Daytime", "Evening"],
                            }} options={{
                                animation: {
                                    duration: 3000,
                                    easing: 'easeInOutQuint',
                                },
                                title: {
                                    display: true,
                                    text: "Timewise Contribution"
                                },
                                legend: {
                                    display: false,
                                },
                                scales: {
                                    xAxes: [{
                                        categoryPercentage: 1,
                                        barPercentage: 0.9,
                                        gridLines: {
                                            display: false
                                        }
                                    }],
                                    yAxes: [{
                                        barPercentage: 0.9,
                                        categoryPercentage: 1,
                                        gridLines: {
                                            display: false
                                        },
                                        ticks: {
                                            display: false
                                        }
                                    }]
                                }
                            }} />
                        }
                    </div>
                </></>
            )
        }
    }

    return (
        <>
            {dispEvents(events)}
            {getContent(Days, loaded, prodDays, Time, TimebgColor, override)}
        </>
    )

}

export default DayStats