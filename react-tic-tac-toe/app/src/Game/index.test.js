import React from 'react'; // for JSX
import { shallow, mount } from 'enzyme'; // how to mount the component
import toJson from 'enzyme-to-json';
import App from '.'; // import the component itself

describe('<App />', () => {
  let wrapper;
  it('renders', () => {
    wrapper = shallow(<App />);
  });

  it('matches snapshot', () => {
    const serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
  });
});

describe('<App />', () => {
  it('ends after 8 turns', () => {
    let wrapper = mount(<App />);
    // first assert that the game isnt over
    expect(wrapper.state().over).toBe(false);
    // then set the state to just BEFORE the bug happens
    wrapper.setState({
      board: [['X', 'X', 'O'], ['O', 'X', 'O'], ['X', null, null]],
      currentPlayer: 'O',
      over: false,
      turn: 8,
      winner: null
    });
    // then select a square
    let sq21 = wrapper.find('#sq21');

    // click on the square
    sq21.simulate('click');

    // assert that the game should still not be over
    expect(wrapper.state().over).toBe(false);
  });

  it('ends after 9 turns', () => {
    let wrapper = mount(<App />);
    // first assert that the game isnt over
    expect(wrapper.state().over).toBe(false);
    // then set the state to just BEFORE the bug happens
    wrapper.setState({
      board: [['X', 'X', 'O'], ['O', 'X', 'X'], [null, 'O', 'O']],
      currentPlayer: 'X',
      over: false,
      turn: 9,
      winner: 'null'
    });

    // then select a square
    let sq20 = wrapper.find('#sq20');

    // click on the square
    sq20.simulate('click');
    // assert that the game should still not be over
    expect(wrapper.state().over).toBe(true);
    let reset = wrapper.find('#resetButton');
    reset.simulate('click');
    expect(wrapper.state().turn).toBe(1);
  });

  it('X should win', () => {
    let wrapper = mount(<App />);
    // first assert that the game isnt over
    expect(wrapper.state().over).toBe(false);
    // then set the state to just BEFORE the bug happens
    wrapper.setState({
      board: [['X', 'X', null], ['O', 'O', null], [null, null, null]],
      currentPlayer: 'X',
      over: false,
      turn: 5,
      winner: null
    });
    // then select a square
    let sq02 = wrapper.find('#sq02');

    // click on the square
    sq02.simulate('click');

    // assert that the game should still not be over
    expect(wrapper.state().winner).toBe('X');
  });

  it('O should win', () => {
    let wrapper = mount(<App />);
    // first assert that the game isnt over
    expect(wrapper.state().over).toBe(false);
    // then set the state to just BEFORE the bug happens
    wrapper.setState({
      board: [['X', 'X', null], ['O', 'O', null], ['X', null, null]],
      currentPlayer: 'O',
      over: false,
      turn: 6,
      winner: null
    });
    // then select a square
    let sq12 = wrapper.find('#sq12');

    // click on the square
    sq12.simulate('click');

    // assert that the game should still not be over
    expect(wrapper.state().winner).toBe('O');
  });

  it('Testing click on filled square', () => {
    let wrapper = mount(<App />);

    wrapper.setState({
      board: [['X', null, null], [null, null, null], [null, null, null]],
      currentPlayer: 'O',
      over: false,
      turn: 2,
      winner: null
    });
    // then select a square
    let sq00 = wrapper.find('#sq00');

    // click on the square
    sq00.simulate('click');

    // assert that the game should still not be over
    expect(wrapper.state().board[0][0]).toBe('X');
  });
});
