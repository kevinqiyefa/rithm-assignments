import { didWin } from './index'; // import the component itself

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

  it('testing for winning again', () => {
    expect(didWin([['O', 'O', 'X'], ['O', 'X', 'O'], ['X', null, null]])).toBe(
      true
    );
  });
});
