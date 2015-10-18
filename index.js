/* Entry point for the application creates and exports a store
 */
import makeStore from './src/store';
import startServer from './src/server';

export const store = makeStore();
startServer();