import { configureStore } from "@reduxjs/toolkit";
import filmReducer from "./slice/slice";
export const store = configureStore({
	reducer: {
		filmsSlice: filmReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
