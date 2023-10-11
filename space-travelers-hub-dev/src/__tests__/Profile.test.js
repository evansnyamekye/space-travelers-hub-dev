import React from 'react';
import { useSelector } from 'react-redux';
import renderer from 'react-test-renderer';
import Profile from '../components/Profile';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('Profile', () => {
  it('renders correctly', () => {
    useSelector.mockImplementation((selector) => selector({
      rockets: {
        rockets: [
          { id: 1, rocket_name: 'Rocket 1', reserved: true },
          { id: 2, rocket_name: 'Rocket 2', reserved: true },
        ],
      },
      missions: {
        missions: [
          { mission_id: 1, mission_name: 'Mission 1', mission_join: true },
          { mission_id: 2, mission_name: 'Mission 2', mission_join: true },
        ],
      },
    }));

    const component = renderer.create(<Profile />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
