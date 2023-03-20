import { Box,CircularProgress,Grid,Text } from '@chakra-ui/react'
import RegularItem from '../components/RegularItem/RegularItem'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { useAuthState } from 'react-firebase-hooks/auth'

import { onValue, ref, update } from 'firebase/database'
import { auth, db } from '../firebase'
import { addFilms } from '../store/slice/slice'



export default function Movies() {
  const {films} = useSelector((item:RootState)=>item.filmsSlice)
  const dispatch =useDispatch<AppDispatch>()
  const [user, loading, error] = useAuthState(auth);
  const router= useRouter()
  useEffect(() => {
   if(user) {
    if (user?.email) {
      console.log("signed in!");
    } else if (user?.email == null) {
      router.push("/login");
    }
   }
  }, [user?.email]);
  useEffect(()=> {
    onValue(ref(db), async (snapshot) => {
      const data =  await snapshot.val();
      Object.keys(data).forEach((item,index)=> {
         if(item==user?.email?.replace('.','')) {
           console.log('sdsadas')
    
          //@ts-ignore
           dispatch(addFilms(Object.values(data)[index]?.data!))

           
         }
       })
       
    });
  },[user?.email])

   

   const handleCheck=(checked:boolean,id:number)=> {

      update(ref(db, `/${user?.email?.replace('.','')}/data/${id}`), {
        isBookmarked: !checked,
      });
    }
  return (
   <Box w="100%" pl={{ base: '0', md: '131px'}}>
   {loading? <div className='boxCenter'>
      <CircularProgress isIndeterminate size='200px' color='var(--blue)' />
      </div> :
      <>
      <Text fontSize="32px" mt="50px" mb="20px">Movies</Text>
      <Grid w="100%" templateColumns='repeat(auto-fit, minmax(280px, 1fr))' justifyItems="center" alignContent="center" gap={2}>
            {films?.map((item,index)=>{
               if(item.category=="Movie") {
               return <RegularItem key={index} id={index}  item={item} handleCheck={handleCheck}/>
               }
            })}
      </Grid> 
      </>}
   </Box>
  )
}
