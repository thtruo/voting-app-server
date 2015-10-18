import {Map, fromJS} from 'immutable';
import {expect} from 'chai';
import makeStore from '../src/store';

/* We should be able to make a store, read its initial state, dispatch
 * action, and witness the changed state.
 */
describe('store', () => {

  it('is a Redux store configured with the correct reducer', () => {
    const store = makeStore();

    expect(store.getState()).to.equal(Map());

    store.dispatch({
      type: 'SET_ENTRIES',
      entries: ['Batman Begins', 'The Dark Knight']
    });

    expect(store.getState()).to.equal(fromJS({
      entries: ['Batman Begins', 'The Dark Knight']
    }));
  });

});