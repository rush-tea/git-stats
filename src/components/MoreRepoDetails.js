import React from 'react'
import CommitList from './Contributions/commitList';
import Footer from './SearchPage/SearchPageFooter';


const MoreRepoDetails = (props) => {
    //console.log(props);
    return (
        <>
        <CommitList data={props} />
        <Footer />
        </>
    );
}

export default MoreRepoDetails;