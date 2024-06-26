import { createStore, combineReducers } from 'redux'

import { stationReducer } from './reducers/station.reducer'
import { userReducer } from './reducers/user.reducer'
import { boardReducer } from './reducers/board.reducer'
import { reviewReducer } from './reducers/review.reducer'
import { systemReducer } from './reducers/system.reducer'

const rootReducer = combineReducers({
    stationModule: stationReducer,
    userModule: userReducer,
    // boardModule: boardReducer,
    // systemModule: systemReducer,
    // reviewModule: reviewReducer,
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)

// For debug:
// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('*******************************')
// })



