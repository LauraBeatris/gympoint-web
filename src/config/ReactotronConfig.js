import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import ReactotronSaga from 'reactotron-redux-saga';

if (process.env.NODE_ENV === 'development') {
  const tron = Reactotron.configure()
    .use(reactotronRedux())
    .use(ReactotronSaga())
    .connect();

  tron.clear();

  // Global access
  console.tron = tron;
}
