import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Missions from '../components/Missions';
import store from '../redux/store';

describe('Test Missions components', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <Missions />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
