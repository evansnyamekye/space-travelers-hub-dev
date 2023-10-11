import React, { useEffect } from 'react';
import '../Styles/Rocket.css';
import { useDispatch, useSelector } from 'react-redux';
import { cancelReservation, fetchRockets, reserveRocket } from '../redux/rocketSlice';

const Rockets = () => {
  const dispatch = useDispatch();

  const { rockets, status, error } = useSelector((state) => state.rockets);

  useEffect(() => {
    dispatch(fetchRockets());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading</div>;
  }

  if (status === 'faild') {
    return <div>{error}</div>;
  }

  const handleToggleReservation = (rocketId, reserved) => {
    if (reserved) {
      dispatch(cancelReservation(rocketId));
    } else {
      dispatch(reserveRocket(rocketId));
    }
  };

  return (
    <div className="rockets">
      <ul>
        {rockets.map((rocket) => (
          <li key={rocket.id} className="content">
            <div className="img">
              <img src={rocket.flickr_images[0]} alt={rocket.name} width={200} height={200} />
            </div>
            <div className="description">
              <h3>{rocket.rocket_name}</h3>
              <p>
                {rocket.reserved && <span className="badge">Reserved</span>}
                {rocket.description}
              </p>
              <button
                type="submit"
                onClick={() => handleToggleReservation(rocket.id, rocket.reserved)}
                className={rocket.reserved ? 'cancel' : 'reserve'}
              >
                {rocket.reserved ? 'Cancel Reservation' : 'Reserve Rocket'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rockets;
