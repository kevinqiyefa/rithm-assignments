import React from 'react'; // for JSX
import { shallow } from 'enzyme'; // how to mount the component
import toJson from 'enzyme-to-json';
import Board from '.'; // import the component itself

describe('<App />', () => {
  let wrapper;
  it('renders', () => {
    wrapper = shallow(
      <Board
        board={[[null, null, null], [null, null, null], [null, null, null]]}
        frozen={false}
        takeTurn={jest.fn()}
      />
    );
  });

  it('matches snapshot', () => {
    const serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
  });
});
