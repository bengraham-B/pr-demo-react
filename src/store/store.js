import { configureStore } from "@reduxjs/toolkit"
import reduxReducer from './redux'

export default configureStore({
    reducer: {
        redux: reduxReducer
    }
})