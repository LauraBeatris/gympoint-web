import Reactotron from 'reactotron-react-js';

if (process.env.NODE_ENV !== 'production') {
  const tron = Reactotron.configure().connect();

  tron.clear();

  // Global access
  console.tron = tron;
}
