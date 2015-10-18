/* The Redux store is central - it holds the current state, and
 * over time can receive actions that evolve the state from one
 * version to the next, using core application logic exposed
 * through the reducer.
 */
import {createStore} from 'redux';
import reducer from './reducer';

/* Redux store gets initialized with a reducer function
*/
export default function makeStore() {
  return createStore(reducer);
}