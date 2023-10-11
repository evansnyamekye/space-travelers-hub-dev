import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { joinMission, cancelMission } from '../redux/Missions/missionsSlice';

const Mission = ({
  mission_id: missionId,
  mission_name: missionName,
  description,
  mission_join: missionJoin,
}) => {
  const dispatch = useDispatch();
  return (
    <tr key={missionId}>
      <td className="mission-name"><h3>{missionName}</h3></td>
      <td><p className="description">{description}</p></td>
      <td>
        <div>
          {missionJoin ? <p className="active-member"> Active member</p> : <p className="not-member">NOT a member</p>}
        </div>
      </td>
      <td className="mission-btn">
        {missionJoin
          ? <button type="button" className="leave-mission" onClick={() => dispatch(cancelMission(missionId))}>Leave Mission</button>
          : <button type="button" className="join-mission" onClick={() => dispatch(joinMission(missionId))}>Join Mission</button>}
      </td>
    </tr>
  );
};

Mission.propTypes = {
  mission_id: PropTypes.string.isRequired,
  mission_name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  mission_join: PropTypes.bool.isRequired,
};

export default Mission;
