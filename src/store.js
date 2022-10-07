import {configureStore} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {combineReducers} from "redux";
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import computersReducer from "./features/computersSlice";
import notificationsReducer from "./features/notificationSlice";

const persistConfig = {
	key: "root",
	storage,
};

const reducers = combineReducers({
	computers: computersReducer,
	notifications: notificationsReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}),
});
