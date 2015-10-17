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

  describe('vote', () => {
    it('creates a tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Batman Begins', 'The Dark Knight')
        }),
        entries: List()
      });
      const nextState = vote(state, 'The Dark Knight');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Batman Begins', 'The Dark Knight')
          tally: Map({
            'The Dark Knight': 1
          }),
        }),
        entries: List()
      }));
    });

    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Batman Begins', 'The Dark Knight'),
          tally: Map({
            'Batman Begins': 2,
            'The Dark Knight': 3
          })
        }),
        entries: List()
      });
      const nextState = vote(state, 'The Dark Knight');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Batman Begins', 'The Dark Knight')
          tally: Map({
            'Batman Begins': 2,
            'The Dark Knight': 4
          }),
        }),
        entries: List()
      }));
    });
  });
});
