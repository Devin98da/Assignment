import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import authReducer from './Slices/authSlice';
import adminReducer from './Slices/adminSlice';



const persistConfig = {
    key: 'root',
    storage
};

const rootReducer = combineReducers({
    auth: authReducer,
    students: adminReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // 🔥 Fix for redux-persist
        }),
});

export const persistor = persistStore(store);
export default store;