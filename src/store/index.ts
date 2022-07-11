import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import AuthReducer from "./reducers/auth";
import EventReducer from "./reducers/event";
const rootReducer = combineReducers({
    AuthReducer,
    EventReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ReturnType<typeof store.dispatch>