import React from 'react'
import CommitList from './Contributions/commitList'


const MoreRepoDetails = (props) => {
    //console.log(props);
    return (
        < CommitList data={props} />
    );
}

export default MoreRepoDetails;