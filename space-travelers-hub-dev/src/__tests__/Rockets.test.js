import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Rockets from '../components/Rockets';
import store from '../redux/store';

describe('Test Rockets component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
