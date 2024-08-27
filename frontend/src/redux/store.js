import { applyMiddleware, createStore, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";



const store = createStore(

    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)),
    // composeSetup(applyMiddleware(sagaMiddleware))
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;