import { AuthError, onAuthStateChanged, User, UserCredential } from 'firebase/auth';
import {createContext, ReactNode, SetStateAction, useContext, useEffect,useState}from 'react'
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { db } from "../firebase"
import { IFilmContextProvider, IFilms, IFilmsContextType } from '../types/types' 
import { getDatabase, onValue, ref, set, update } from "firebase/database";
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';

export const FilmContext =createContext<IFilmsContextType | null>(null)





export function FilmContextProvider({children}:IFilmContextProvider) {
  const router = useRouter()

  const [user,setUser] = useState<User | null>()
  const [datas, setData] =useState<IFilms[]>([])
  const [ items, setItems]  = useState<IFilms[]>([])
  const [error, setError] = useState('')
  const [loading,setLoading] = useState(false)
  const [
    signInWithEmailAndPassword,
    userSignin,
    loadingSignin,
    errorSignin
  ] = useSignInWithEmailAndPassword(auth);

  const [
    createUserWithEmailAndPassword,
    userSignup,
    loadingSignup,
    errorSignup,
  ] = useCreateUserWithEmailAndPassword(auth);

  useEffect(()=> {
    const unsubsribe = onAuthStateChanged(auth , (currentUser)=> {
        setUser(currentUser)
    })
    return ()=> {
        unsubsribe()
    }
  })



    //  ОБРАТНО В ДОРОЖНИКИ???

  useEffect(()=> {
  const getData= async()=> {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/data")
      if(!res.ok) {
        throw new Error(`Could not fetch data, status: ${res.status}`);
      }
      const data = await res.json()
      setLoading(false);
      setData(data)

    } catch (e) {
      setLoading(false);
      if (typeof e === "string") {
          setError(e); 
      } else if (e instanceof Error) {
          setError(e.message)
      }   
    }
  }
    getData()
  },[user])

  useEffect(()=> {

    async function  writeUserData() {
    setLoading(true);
    try {
      datas.map(async item=> {
        const id=nanoid()
        if(item.thumbnail.trending) {
          return  await set(ref(db, id), {
            id,
            user: user?.email,
            title: item.title,
            thumbnail: {
              trending: {
                small:item.thumbnail.trending?.small,
                large:item.thumbnail.trending?.large,
              },
              regular: {
                small: item.thumbnail.regular.small,
                medium: item.thumbnail.regular.medium,
                large: item.thumbnail.regular.large
              }
            },
            year: item.year,
            category: item.category,
            rating: item.rating,
            isBookmarked: item.isBookmarked,
            isTrending:  item.isTrending
        } );
        }else {
          return await set(ref(db, id), {
            id,
            user: user?.email,
            title: item.title,
            thumbnail: {
              regular: {
                small: item.thumbnail.regular.small,
                medium: item.thumbnail.regular.medium,
                large: item.thumbnail.regular.large
              }
            },
            year: item.year,
            category: item.category,
            rating: item.rating,
            isBookmarked: item.isBookmarked,
            isTrending:  item.isTrending
          });
        }
      })
      setLoading(false);
    } catch (e) {
      setLoading(false);
      if (typeof e === "string") {
          setError(e); 
      } else if (e instanceof Error) {
          setError(e.message)
      }   
    }
    
  }
  if(items.length<=29) {
    if(user?.email){
      writeUserData()
    }
  }

  },[user])


  useEffect(() => {
    try {
      setLoading(true)
      onValue(ref(db), (snapshot) => {
      setItems([]);
      const data = snapshot.val() as IFilms;
      const email = user?.email;
      if (data !== null) {
        Object.values(data).map((item) => {
          if (email === item.user) {
            setItems((oldArr) => [...oldArr, item]);
          }
        });
      }
      setLoading(false)
    });
    } catch (e) {
      setLoading(false);
      if (typeof e === "string") {
          setError(e); 
      } else if (e instanceof Error) {
          setError(e.message)
      }   
    }

  }, [user]);



  const bookmarkedHandler = (items:IFilms) => {
    update(ref(db, `/${items.id}`), {
      isBookmarked: !items.isBookmarked,
    });
  };

  return (
      <FilmContext.Provider value={{setData, datas, signInWithEmailAndPassword, loadingSignin,errorSignin,createUserWithEmailAndPassword,loadingSignup,errorSignup,user,items,bookmarkedHandler,loading,error}}>
          {children}
      </FilmContext.Provider>

  )

}

