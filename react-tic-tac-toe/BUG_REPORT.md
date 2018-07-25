# Bug Report

For markdown tips and tricks, check out [this guide](https://guides.github.com/features/mastering-markdown/).
Make sure you include proper syntax highlighting for your supporting JavaScript snippets.

## Bug #1

_<-- Document the bug here. -->_

- The game should not be over after 8 turns, it should end after 9 turns

```javascript
// supporting test cases here
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
});
```

## Bug #2

_<-- Document the bug here. -->_

- left to right diagonal fail for the test case #2

```javascript
// supporting test cases here
describe('Check winning function', () => {
  it('testing for winning', () => {
    expect(didWin([['X', 'O', 'X'], ['O', '0', 'X'], [null, null, 'X']])).toBe(
      true
    );
  });

  it('testing for winning again', () => {
    expect(didWin([['X', 'O', 'X'], ['O', 'X', 'O'], [null, null, 'X']])).toBe(
      true
    );
  });
});
```

## Bug #3

_<-- Document the bug here. -->_

- winner should not be the next winner, it should be the current winner.

```javascript
// supporting test cases here

describe('<App />', () => {
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
});
```

## Bug #4

_<-- Document the bug here. -->_

- clicking on filled square, it should not be change once it's filled.

```javascript
// supporting test cases here
describe('<App />', () => {
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
```
