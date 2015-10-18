import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server().attach(8090);

  // Send a state snapshopt whenever state (potentially) changes
  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

  // Clients immediately receives/updates current state upon connection
  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store));
  });
}