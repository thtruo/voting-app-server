import {List, Map} from 'immutable';
import {expect} from 'chai';
import {setEntries, next} from '../src/core';

describe('application logic', () => {
  describe('setEntries', () => {
    it('converts to immutable', () => {
      const state = Map();
      const entries = ['Batman Begins', 'The Dark Knight'];
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Batman Begins', 'The Dark Knight')
      }));
    });
  });
  describe('next', () => {
    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Batman Begins', 'The Dark Knight','The Dark Knight Rises', 'Batman v Superman')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Batman Begins', 'The Dark Knight')
        }),
        entries: List.of('The Dark Knight Rises', 'Batman v Superman')
      }));
    });
  });
});
