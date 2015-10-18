/* Entry point for the application creates and exports a store
 */
import makeStore from './src/store';
import startServer from './src/server';

export const store = makeStore();
startServer(store);

// Load up set of test entries and kick off vote by dispatching NEXT
store.dispatch({
  type: 'SET_ENTRIES',
  entries: require('./entries.json')
});
store.dispatch({
  type: 'NEXT'
});