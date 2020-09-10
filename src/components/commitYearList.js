import React from 'react';
import CommitMonthList from './commitMonthList'
import './Css/commitYearList.css'

const CommitYearList = (props) => {

    const m_array = [];

    for (let l = 0; l < 12; l++) {
        const t_month = props.dydata.filter((ddata) => {
            return ddata.month === l;
        })
        if (t_month.length != 0) {
            m_array.push(t_month);
        }
    }

    console.log(m_array);

    const CommitData = m_array.map((commitdata) => {
        return <CommitMonthList key={commitdata[0].id} dydata={commitdata} />
    })
    return (
        <div>
            <h3 className="year-heading">{props.dydata[0].year}</h3>
            <div className="commit-year-list">
                {CommitData}
            </div>
        </div>
    );
}

export default CommitYearList;