import React from 'react';
import { useSelector } from 'react-redux';
import '../Styles/Profile.css';

const Profile = () => {
  const reservedRockets = useSelector(
    (state) => state.rockets.rockets.filter((rocket) => rocket.reserved),
  );
  const activeMissions = useSelector(
    (state) => state.missions.missions.filter((mission) => mission.mission_join),
  );

  return (
    <div className="profile">
      <div className="my-mission">
        <h2>My Missions</h2>
        <ul className="list">
          {activeMissions.map((mission) => (
            <li key={mission.mission_id}>
              <h3>{mission.mission_name}</h3>
            </li>
          ))}
        </ul>
      </div>
      <div className="my-rocket">
        <h2>My Rockets</h2>
        <ul className="list">
          {reservedRockets.map((rocket) => (
            <li key={rocket.id}>
              <h3>{rocket.rocket_name}</h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
