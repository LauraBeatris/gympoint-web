import { combineReducers } from 'redux';

import { auth } from './auth/reducers';
import { user } from './user/reducers';

export default combineReducers({ auth, user });
