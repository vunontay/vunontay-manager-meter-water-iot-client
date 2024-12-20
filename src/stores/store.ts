import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/stores/slices/auth";
import sidebarReducer from "@/stores/slices/sidebar";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const persistConfig = {
    key: "root",
    storage,
    version: 1,
};

const rootReducer = combineReducers({
    auth: authReducer,
    sidebar: sidebarReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export default store;
