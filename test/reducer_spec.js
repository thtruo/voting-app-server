import {Map, fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', entries: ['Batman Begins']};
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      entries: ['Batman Begins']
    }));
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['Batman Begins', 'The Dark Knight']
    });
    const action = {type: 'NEXT'};
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        round: 1,
        pair: ['Batman Begins', 'The Dark Knight']
      },
      entries: []
    }));
  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        round: 1,
        pair: ['Batman Begins', 'The Dark Knight']
      },
      entries: []
    });
    const action = {type: 'VOTE', entry: 'The Dark Knight'};
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        round: 1,
        pair: ['Batman Begins', 'The Dark Knight'],
        tally: {'The Dark Knight': 1}
      },
      entries: []
    }));
  });

  it('has an initial state', () => {
    const action = {type: 'SET_ENTRIES', entries: ['Batman v Superman']};
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      entries: ['Batman v Superman']
    }));
  });

  it('can be used with reduce', () => {
    const actions = [
      {type: 'SET_ENTRIES', entries: ['Batman Begins', 'The Dark Knight']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'The Dark Knight'},
      {type: 'VOTE', entry: 'Batman Begins'},
      {type: 'VOTE', entry: 'The Dark Knight'},
      {type: 'NEXT'}
    ];
    const finalState = actions.reduce(reducer, Map());
    expect(finalState).to.equal(fromJS({
      winner: 'The Dark Knight'
    }));
  });

});