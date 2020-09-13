import React from 'react';

function Footer(){
    return(
        <>
        <footer>
            <div className="salutation">Like it? Give a <span className="star">Star</span> on <a href="https://github.com/rush-tea/git-stats">GitHub↗ </a></div>
            <div className="footer-contact">
                <div className="footer-contact-names">
                        <div>
                            <span>Manish Singh</span>
                            <div className="footer-links">
                                <a href="https://instagram.com/astromanishsingh?igshid=n23keo63j0rm"><i className="fa fa-instagram fa-sm" aria-hidden="true"></i></a>
                                <a href="https://www.linkedin.com/in/manish-singh-580736178/"><i className="fa fa-linkedin fa-sm" aria-hidden="true"></i></a>
                                <a href="https://github.com/astromanish"><i className="fa fa-github" aria-hidden="true"></i></a>
                                <a href="https://www.facebook.com/astromanishsingh"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                            </div>    
                        </div>
                        <div>
                            <span>Adarsh Tripathi</span> 
                            <div className="footer-links">
                                <a href="https://www.instagram.com/adarsh._.tripathi._/"><i className="fa fa-instagram fa-sm" aria-hidden="true"></i></a>
                                <a href="https://www.linkedin.com/in/adarsh-tripathi-0a5a24191/"><i className="fa fa-linkedin fa-sm" aria-hidden="true"></i></a>
                                <a href="https://github.com/rush-tea"><i className="fa fa-github" aria-hidden="true"></i></a>
                                <a href="https://www.facebook.com/adarsh.tripathi.5855594/"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                            </div>
                        </div>  
                </div>
            </div>
        </footer>
        </>
    )
}

export default Footer