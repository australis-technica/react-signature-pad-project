import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import app from "./app-store";
const store = createStore(
    combineReducers({
        [app.STORE_KEY]: app.reducer
    }),
    applyMiddleware(thunk)
);
export default store;