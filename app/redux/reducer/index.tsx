import { combineReducers } from 'redux';
import drawerReducer from './drawerReducer';
import savePropertyReducer from './savePropertyReducer';
import  userSlice from './user';

const rootReducer = combineReducers({
    drawer: drawerReducer,
    saveProperty : savePropertyReducer,
    user : userSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;