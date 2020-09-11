import React from 'react';
import Commit from './commit'
import './Css/commitMonthList.css'

const CommitMonthList = (props) => {

    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "Sepetember", "October", "November", "December"];

    const CommitData = props.dydata.map((commitdata) => {
        return <Commit key={commitdata.id} dydata={commitdata} />
    })
    return (
        <div className="commit-list-month-whole">
            <h3 className="month-heading">{month[props.dydata[0].month]}</h3>
            <div className="commit-month-list">
                {CommitData}
            </div>
        </div>
    );
}

export default CommitMonthList;