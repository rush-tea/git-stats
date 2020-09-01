import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';

function LanguageChart(props){
    const [dataLang, setDataLang] = useState([]);
    const [dataLangLabel, setLangLabel] = useState([]);
    useEffect(() => {
        console.log(props);
        if(props.ids.profile_id.profileId !== ''){
            axios.get('https://api.github.com/repos/' + props.ids.profile_id.profileId + '/' + props.ids.repo_name.repoId + '/languages',{
                headers: {
                    authorization: `token ${process.env.REACT_APP_API_KEY}`
                }
            })
                .then(res => {
                    console.log(res);
                    Object.entries(res.data).forEach(([key,value]) => {
                        console.log(key,value);
                        setDataLang(prevData => [...prevData, value]);
                        setLangLabel(prevdataLang => [...prevdataLang,key]);
                    });
                    console.log(dataLang);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },[]);
    return(
        <>
        <Doughnut data = {{
            datasets: [{
                data: dataLang
            }],
            labels: dataLangLabel
        }} />
        </>
    )
}

export default LanguageChart;