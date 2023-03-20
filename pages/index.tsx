import { Box,CircularProgress,Grid,Text } from '@chakra-ui/react'
import TrandingItem from '../components/TrandingItem/TrandingItem'
import RegularItem from '../components/RegularItem/RegularItem'
import { useContext, useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { useRouter } from 'next/router'
import { onValue, ref, set, update } from 'firebase/database'
import { auth, db } from '../firebase'
import { IFilms } from '../interface/interface'
import { useAuthState } from 'react-firebase-hooks/auth'
import { data } from '../mock'
import { addFilms } from '../store/slice/slice'
import { nanoid } from 'nanoid'





export default function Home() {
  const router= useRouter()
  const {films} = useSelector((item:RootState)=>item.filmsSlice)
  const dispatch =useDispatch<AppDispatch>()
  const [user, loading, error] = useAuthState(auth);
  const [flag,setFlag] =useState(true)
  
  const checkUser =async ()=> {
      let flag=true
      await onValue(ref(db), async (snapshot) => {
      const data =  await snapshot.val();
      Object.keys(data).forEach((item,index)=> {
         if(item==user?.email?.replace('.','')) {
          flag=false
         }
      })
      
      });
      if(flag) {
        set(ref(db, `/${user?.email?.replace('.','')}`), {
          data: data
        });
      }
  }
  useEffect(()=> {
    onValue(ref(db), async (snapshot) => {
      const data =  await snapshot.val();
      Object.keys(data).forEach((item,index)=> {
         if(item==user?.email?.replace('.','')) {
           console.log('sdsadas')
           setFlag(false)
           //@ts-ignore
           dispatch(addFilms(Object.values(data)[index]?.data!))

           
         }
       })
       
    });
    checkUser()
  },[user?.email])



 
  
  const handleCheck=(checked:boolean,id:number)=> {

    update(ref(db, `/${user?.email?.replace('.','')}/data/${id}`), {
      isBookmarked: !checked,
    });
  }

  return (
       <Box w="100%"  pl={{ base: '0', md: '131px'}} >
          {loading?  <div className='boxCenter'>
          <CircularProgress isIndeterminate size='200px' color='var(--blue)' />
          </div> :
          <>
            <Text fontSize="32px">Trending</Text>
            <div className= 'box'>
              {films?.map((item,index)=>{
                if(item.isTrending) {
                  
                  return <TrandingItem key={index} id={index}  item={item} handleCheck={handleCheck} />
                }
              
                })}
              
            </div>
            <Text fontSize="32px" mt="50px" mb="20px">Recommended for you</Text>
            <Grid w="100%" templateColumns='repeat(auto-fill, minmax(280px, 1fr))' justifyItems="center" alignContent="center" gap={2}>
                  {films?.map((item,index)=>{
                      return  <RegularItem key={index} id={index}  item={item} handleCheck={handleCheck}/>
                  })}
            </Grid>   
          </>}
       </Box>
  )
}

