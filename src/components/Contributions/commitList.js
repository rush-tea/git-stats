import React, { useEffect, useState } from 'react';
import './Css/commitList.css'
import axios from 'axios';
import CommitYearList from './commitYearList';

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

    const crtd_date = new Date(props.data.location.state.created_at);
    const s_date = new Date(crtd_date.getFullYear(), 0, 1);
    const e_date = new Date();
    const d_array = [];

    for (let i = s_date.valueOf(); i <= e_date.valueOf(); i += 86400000) {
        const c_date = new Date(i);
        d_array.push({
            id: c_date.valueOf(),
            year: c_date.getFullYear(),
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
            if (c_data.date === c_d_array.date && c_d_array.month === c_data.month && c_data.year === c_d_array.year) {
                c_d_array.commit += 1;
            }
        }
    }

    const y_array = [];

    for (let l = crtd_date.getFullYear(); l <= 2020; l++) {
        const t_year = d_array.filter((daydata) => {
            return daydata.year === l;
        })
        if (t_year.length != 0) {
            y_array.push(t_year);
        }
    }

    const y_components = y_array.map((yr) => {
        return <CommitYearList key={yr[0].id} dydata={yr} />
    })


    return (
        <div>
            <h1 className="heading"><u>Contributions</u></h1>
            {isloading ? <p className="loading">data loading..</p> : ''}
            <div className="commit-list">
                {y_components}
            </div>
        </div>

    );
}

export default CommitList;