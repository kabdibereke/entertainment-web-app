import { AuthError, User, UserCredential } from "firebase/auth"
import { InferGetStaticPropsType } from "next"
import { Dispatch, ReactNode, SetStateAction } from "react"

export interface IFilms {
        id?:number,
        user?:string,
        title: string,
      thumbnail: {
        trending?: {
          small: string,
          large: string
        },
        regular: {
          small:string,
         medium: string,
          large: string
        }
      },
      year: number,
      category: string,
      rating: string,
      isBookmarked: boolean,
      isTrending: boolean
}

export interface IFilmsContextType {
  items:IFilms[],
  datas:IFilms[],
  setItems: Dispatch<SetStateAction<IFilms[]>>
  signInWithEmailAndPassword:(email: string, password: string) => Promise<UserCredential | undefined>
  loadingSignin:boolean,
  errorSignin:AuthError | undefined,
  createUserWithEmailAndPassword:(email: string, password: string) => Promise<UserCredential | undefined>
  loadingSignup:boolean,
  errorSignup:AuthError| undefined,
  user:User | null | undefined,
  bookmarkedHandler: (items: IFilms) => void,
  loading:boolean,
  error:string,
  
};


export interface  IFilmContextProvider {
  children:ReactNode,

}