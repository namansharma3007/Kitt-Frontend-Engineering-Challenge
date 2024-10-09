import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import flightInputReducer from "./reducers/flightInputSlice";
import openTabReducer from "./reducers/openTabSlice"; // Ensure correct import
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  flightInput: flightInputReducer,
  openTab: openTabReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["openTab"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export default store;
