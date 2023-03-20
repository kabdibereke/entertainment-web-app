import { createSlice } from "@reduxjs/toolkit";
import { IFilms } from "../../interface/interface";

interface IFilmsSlice {
	films: IFilms[];
}

const initialState: IFilmsSlice = {
	films: [],
};

export const FilmSlice = createSlice({
	name: "films",
	initialState,
	reducers: {
		addFilms: (state, action) => {
			state.films = [];
			state.films.push(...action.payload);
		},
	},
});

export const { addFilms } = FilmSlice.actions;

export default FilmSlice.reducer;
