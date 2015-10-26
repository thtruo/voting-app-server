import {List, Map} from 'immutable';
import {expect} from 'chai';
import {setEntries, next, vote} from '../src/core';

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
          round: 1,
          pair: List.of('Batman Begins', 'The Dark Knight')
        }),
        entries: List.of('The Dark Knight Rises', 'Batman v Superman')
      }));
    });

    it('puts winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          round: 1,
          pair: List.of('Batman Begins', 'The Dark Knight'),
          tally: Map({
            'Batman Begins': 2,
            'The Dark Knight': 4
          })
        }),
        entries: List.of('The Dark Knight Rises', 'Batman v Superman', 'Suicide Squad')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          round: 2,
          pair: List.of('The Dark Knight Rises', 'Batman v Superman')
        }),
        entries: List.of('Suicide Squad', 'The Dark Knight')
      }));
    });

    it('puts both from tied vote back to entries', () => {
      const state = Map({
        vote: Map({
          round: 1,
          pair: List.of('Batman Begins', 'The Dark Knight'),
          tally: Map({
            'Batman Begins': 3,
            'The Dark Knight': 3
          })
        }),
        entries: List.of('The Dark Knight Rises', 'Batman v Superman', 'Suicide Squad')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          round: 2,
          pair: List.of('The Dark Knight Rises', 'Batman v Superman')
        }),
        entries: List.of('Suicide Squad', 'Batman Begins', 'The Dark Knight')
      }));
    });

    it('marks winner when just one entry left', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Batman Begins', 'The Dark Knight'),
          tally: Map({
            'Batman Begins': 2,
            'The Dark Knight': 4
          })
        }),
        entries: List()
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        winner: 'The Dark Knight'
      }));
    });
  });

  describe('vote', () => {
    it('creates a tally for the voted entry', () => {
      const state = Map({
        round: 1,
        pair: List.of('Batman Begins', 'The Dark Knight')
      });
      const nextState = vote(state, 'The Dark Knight', 'voter1');
      expect(nextState).to.equal(Map({
        round: 1,
        pair: List.of('Batman Begins', 'The Dark Knight'),
        tally: Map({
          'The Dark Knight': 1
        }),
        votes: Map({
          voter1: 'The Dark Knight'
        })
      }));
    });

    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        round: 1,
        pair: List.of('Batman Begins', 'The Dark Knight'),
        tally: Map({
          'Batman Begins': 2,
          'The Dark Knight': 3
        }),
        votes: Map()
      });
      const nextState = vote(state, 'The Dark Knight', 'voter1');
      expect(nextState).to.equal(Map({
        round: 1,
        pair: List.of('Batman Begins', 'The Dark Knight'),
        tally: Map({
          'Batman Begins': 2,
          'The Dark Knight': 4
        }),
        votes: Map({
          voter1: 'The Dark Knight'
        })
      }));
    });

    it('nullifies previous vote for the same voter', () => {
      expect(
        vote(Map({
          round: 1,
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 3,
            '28 Days Later': 2
          }),
          votes: Map({
            voter1: '28 Days Later'
          })
        }), 'Trainspotting', 'voter1')
      ).to.equal(
        Map({
          round: 1,
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 4,
            '28 Days Later': 1
          }),
          votes: Map({
            voter1: 'Trainspotting'
          })
        })
      );
    });

    it('prevents voting for entry not included in current pair', () => {
      const state = Map({
        round: 1,
        pair: List.of('Batman Begins', 'The Dark Knight'),
        tally: Map({
          'Batman Begins': 2,
          'The Dark Knight': 3
        })
      });
      const nextState = vote(state, 'Suicide Squad');
      expect(nextState).to.equal(Map({
        round: 1,
        pair: List.of('Batman Begins', 'The Dark Knight'),
        tally: Map({
          'Batman Begins': 2,
          'The Dark Knight': 3
        })
      }));
    });

  });
});
