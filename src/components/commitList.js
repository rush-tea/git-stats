import React, { useEffect, useState } from 'react';
import './Css/commitList.css'
import axios from 'axios';
import CommitMonthList from './commitMonthList';

const CommitList = (props) => {
    const [commitdata, setCommitData] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    useEffect(() => {
        axios.get(`https://api.github.com/repos/${props.data.match.params.profile_id}/${props.data.match.params.repo_name}/commits?per_page=100`, {
            headers: {
                authorization: `token ${process.env.REACT_APP_API_KEY}`
            }
        })
            .then(res => {
                setCommitData(() => {
                    return res.data.map((d) => {
                        const c_date = new Date(d.commit.committer.date);
                        return {
                            month: c_date.getMonth(),
                            date: c_date.getDate(),
                            year: c_date.getFullYear()
                        };
                    })
                })
                setIsLoading(false);
            })
            .catch(err => console.log(err));
    }, [])

    const s_date = new Date(2020, 0, 1);
    const e_date = new Date(2020, 11, 31);
    const d_array = [];

    for (let i = s_date.valueOf(); i <= e_date.valueOf(); i += 86400000) {
        const c_date = new Date(i);
        d_array.push({
            id: c_date.valueOf(),
            month: c_date.getMonth(),
            date: c_date.getDate(),
            commit: 0
        });
    }


    const l1 = d_array.length;
    const l2 = commitdata.length;
    for (let j = 0; j < l2; j++) {
        const c_data = commitdata[j];
        for (let k = 0; k < l1; k++) {
            const c_d_array = d_array[k];
            if (c_data.year === 2020) {
                if (c_data.date === c_d_array.date && c_d_array.month === c_data.month) {
                    c_d_array.commit += 1;

                }
            }

        }
    }
    const DayData0 = d_array.filter((daydata) => {
        return daydata.month === 0;
    })
    const DayData1 = d_array.filter((daydata) => {
        return daydata.month === 1;
    })
    const DayData2 = d_array.filter((daydata) => {
        return daydata.month === 2;
    })
    const DayData3 = d_array.filter((daydata) => {
        return daydata.month === 3;
    })
    const DayData4 = d_array.filter((daydata) => {
        return daydata.month === 4;
    })
    const DayData5 = d_array.filter((daydata) => {
        return daydata.month === 5;
    })
    const DayData6 = d_array.filter((daydata) => {
        return daydata.month === 6;
    })
    const DayData7 = d_array.filter((daydata) => {
        return daydata.month === 7;
    })
    const DayData8 = d_array.filter((daydata) => {
        return daydata.month === 8;
    })
    const DayData9 = d_array.filter((daydata) => {
        return daydata.month === 9;
    })
    const DayData10 = d_array.filter((daydata) => {
        return daydata.month === 10;
    })
    const DayData11 = d_array.filter((daydata) => {
        return daydata.month === 11;
    })
    return (
        <div className="commit-list-whole">
            <h1 className="heading">Contributions in 2020</h1>
            {isloading ? 'data loading...' : ''}
            <div className="commit-list">
                {<CommitMonthList key={0} daydata={DayData0} />}
                {<CommitMonthList key={1} daydata={DayData1} />}
                {<CommitMonthList key={2} daydata={DayData2} />}
                {<CommitMonthList key={3} daydata={DayData3} />}
                {<CommitMonthList key={4} daydata={DayData4} />}
                {<CommitMonthList key={5} daydata={DayData5} />}
                {<CommitMonthList key={6} daydata={DayData6} />}
                {<CommitMonthList key={7} daydata={DayData7} />}
                {<CommitMonthList key={8} daydata={DayData8} />}
                {<CommitMonthList key={9} daydata={DayData9} />}
                {<CommitMonthList key={10} daydata={DayData10} />}
                {<CommitMonthList key={11} daydata={DayData11} />}
            </div>
            <br />
            <p>* : Current Date</p>
        </div>

    );
}

export default CommitList;