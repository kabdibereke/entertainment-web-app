import { AuthError, User, UserCredential } from "firebase/auth";
import { InferGetStaticPropsType } from "next";
import { Dispatch, ReactNode, SetStateAction } from "react";

export interface IFilms {
	id?: number;
	user?: string;
	title: string;
	thumbnail: {
		trending?: {
			small: string;
			large: string;
		};
		regular: {
			small: string;
			medium: string;
			large: string;
		};
	};
	year: number;
	category: string;
	rating: string;
	isBookmarked: boolean;
	isTrending: boolean;
}
