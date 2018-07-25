import React from 'react'; // for JSX
import { shallow } from 'enzyme'; // how to mount the component
import toJson from 'enzyme-to-json';
import Square from '.'; // import the component itself

describe('<App />', () => {
  let wrapper;
  it('renders', () => {
    wrapper = shallow(
      <Square id={`sq00`} val={null} key={`0|0`} handleClick={jest.fn()} />
    );
  });

  it('matches snapshot', () => {
    const serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
  });
});
