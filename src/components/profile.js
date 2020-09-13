import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import ProfileOverview from './ProfileOverview';
import DayStats from './charts/DaysStats';
import Stats from './Stats';
import Activities from './Activities';
import Followers from './Followers';
import Following from './Following';
import Repositories from './Repositories';
import PuffLoader from 'react-spinners/PuffLoader';
import { css } from '@emotion/core';
import Footer from './SearchPage/SearchPageFooter';

const overHead = css`
  height: 35vh;
  display: block;
  margin: 30vh auto 10vh auto;
  grid-column: 1/4;
`;

function Profile(props) {

  const [isActive, setIsActive] = useState({
    activity: true,
    follower: false,
    following: false,
    repos: false
  });
  const [loaded, setLoading] = useState(true);
  const [lastDate, setLastDate] = useState('');
  const [stats, setStats] = useState({
    followers: 0,
    following: 0,
    repos: 0
  });

  const [profile, setProfile] = useState({
    avatar_url: '',
    bio: '',
    company: '',
    joinedOn: '',
    name: '',
    login: ''
  });
  const [events, setEvents] = useState({});
  const [events1, setEvents1] = useState([]);

  const getStats = async () => {
    if (loaded === true) {
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      axios.get('https://api.github.com/users/' + props.match.params.profile_id, {
        headers: {
          authorization: `token ${process.env.REACT_APP_API_KEY}`
        }
      })
        .then(res => {
          var date = new Date(res.data.created_at);
          setStats({
            followers: res.data.followers,
            following: res.data.following,
            repos: res.data.public_repos
          });
          setProfile({
            avatar_url: res.data.avatar_url,
            bio: res.data.bio,
            company: res.data.company,
            joinedOn: date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear(),
            name: res.data.name,
            login: res.data.login
          });
          setLoading(true);
        })
        .catch(err => {
          console.log(err);
          setLoading(true);
        });
      axios.get('https://api.github.com/users/' + props.match.params.profile_id + '/events?page=1&per_page=45', {
        headers: {
          authorization: `token ${process.env.REACT_APP_API_KEY}`
        }
      })
        .then(res => {
          setEvents(res.data);
        })
        .catch(err => {
          console.log(err);
        });

      var pageNo = 1;
      var ev = [];
      while (pageNo) {
        var res = await axios.get('https://api.github.com/users/' + props.match.params.profile_id + '/events?page=' + pageNo + '&per_page=100', {
          headers: {
            authorization: `"token ${process.env.REACT_APP_KEY}"`
          }
        });
        if (pageNo < 3 && res.data.length > 0) {
          res.data.forEach(res => {
            ev.push(res);
          });
          pageNo++;
        }
        else {
          break;
        }
      }
      setEvents1(ev);
      var LastDate = new Date(ev[ev.length - 1].created_at);
      LastDate = LastDate.toUTCString().slice(0, 16);
      setLastDate(LastDate);
      setLoading(false);
    }
    setEvents1(ev);
    var LastDate = new Date(ev[ev.length - 1].created_at);
    LastDate = LastDate.toUTCString().slice(0, 16);
    setLastDate(LastDate);
  }

  useEffect(() => {
    getStats();
  }, []);

  const getTabs = (status, userName, events) => {
    if (status.follower && userName.length !== 0) {
      return (
        <Followers userName={userName} stats={stats} />
      )
    }
    else if (status.following && userName.length !== 0) {
      return (
        <Following userName={userName} stats={stats} />
      )
    }
    else if (status.repos && userName.length !== 0) {
      return (
        <Repositories userName={userName} />
      )
    }
    else if (status.activity && userName.length !== 0 && events.length !== 0) {
      return (
        <Activities events={events} />
      )
    }
  }

  const getProfile = () => {
    if (profile.login.length !== 0) {
      return (
        <><>
          <ProfileOverview profile={profile} />
        </></>
      )
    }
  }

  const getDaysStats = (events) => {
    if (events.length > 0) {
      return (
        <DayStats events={events} />
      )
    }
  }

  const getContent = (profile, events, events1, lastDate, loaded, isActive, stats, overHead) => {
    if (loaded === false) {
      return (
        <><>
          <header>
            {
              profile.avatar_url.length > 0 && getProfile(profile)
            }
            <div className="headData">
              {events1.length > 0 && <Stats events={events1} userName={profile} stats={stats} lastDate={lastDate} />}
            </div>
          </header>
          <main>
            <div className="day-stats">
              {events1.length > 0 && getDaysStats(events1)}
            </div>
            <div className="a-stats">
              <div className="stats">
                <button className={isActive.activity ? 'btn btn-primary btn-primary-left' : 'btn btn-primary-left'} onClick={() => {
                  setIsActive({
                    activity: true,
                    follower: false,
                    following: false,
                    repos: false
                  })
                }}>Activity</button>
                <button className={isActive.follower ? 'btn btn-primary btn-primary-middle' : 'btn btn-primary-middle'} onClick={() => {
                  setIsActive({
                    activity: false,
                    follower: true,
                    following: false,
                    repos: false
                  })
                }} >Followers</button>
                <button className={isActive.following ? 'btn btn-primary btn-primary-middle' : 'btn btn-primary-middle'} onClick={() => {
                  setIsActive({
                    activity: false,
                    follower: false,
                    following: true,
                    repos: false
                  })
                }}>Following</button>
                <button className={isActive.repos ? 'btn btn-primary btn-primary-right' : 'btn btn-primary-right'} onClick={() => {
                  setIsActive({
                    activity: false,
                    follower: false,
                    following: false,
                    repos: true
                  })
                }}>Repositories</button>
              </div>
              {getTabs(isActive, profile.login, events)}
            </div>
          </main>
          <Footer />
        </></>
      )
    }
    else {
      return <PuffLoader color="#4A90E2" css={overHead} loading={loaded} />
    }
  }
  return (
    <>
      {getContent(profile, events, events1, lastDate, loaded, isActive, stats, overHead)}
    </>
  )
}

export default Profile