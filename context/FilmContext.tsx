import { AuthError, onAuthStateChanged, User, UserCredential } from 'firebase/auth';
import {createContext, ReactNode, SetStateAction, useContext, useEffect,useState}from 'react'
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { db } from "../firebase"
import { IFilmContextProvider, IFilms, IFilmsContextType } from '../types/types' 
import { getDatabase, onValue, ref, remove, set, update } from "firebase/database";
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

  useEffect(()=> {
    const getData= async()=> {
      setLoading(true);
      try {
        const res = await fetch("https://636d09feab4814f2b276b390.mockapi.io/todos")
        if(!res.ok) {
          throw new Error(`Could not fetch data, status: ${res.status}`);
        }
        const data = await res.json()
        setLoading(false);
        setItems(data)
        
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

  useEffect(() => {

    async function getData () {
      try {
          setLoading(true)
          onValue(ref(db), (snapshot) => {
          setData([]);
          const data = snapshot.val() as IFilms;
          const email = user?.email;
          if (data !== null) {
            Object.values(data).map((item) => {
              if (email === item.user) {
                setData((oldArr) => [...oldArr, item]);

              }
            });
          }else {}
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
    }

    getData()
  }, [user]);

 const writeData = async (item:IFilms)=> {
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
      isBookmarked: true,
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
      isBookmarked: true,
      isTrending:  item.isTrending
    });
    
  }
  
 }
 
 useEffect(()=> {
  for (let i=0; i<items.length; i++) {
    for(let j=0; j<datas.length;j++) {
      if(items[i].id==datas[j].id) {
        items[i] =datas[j]
      }
    }
  }
  console.log(items)

  },[datas])

  const bookmarkedHandler = (items:IFilms) => {
      remove(ref(db, `/${items.id}`));
  };

  return (
      <FilmContext.Provider value={{setItems, datas, signInWithEmailAndPassword, loadingSignin,errorSignin,createUserWithEmailAndPassword,loadingSignup,errorSignup,user,items,bookmarkedHandler,loading,error,writeData}}>
          {children}
      </FilmContext.Provider>

  )

}

