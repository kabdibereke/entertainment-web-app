
import { Box,CircularProgress,Grid,Text } from '@chakra-ui/react'
import RegularItem from '../components/RegularItem/RegularItem'
import { IFilms, IFilmsContextType } from '../types/types'
import { useContext, useEffect, useState } from 'react'
import { FilmContext } from '../context/FilmContext'
import { useRouter } from 'next/router'



export default function Movies() {
   const {user,loading,datas}  = useContext(FilmContext)  as IFilmsContextType
   const router= useRouter()
 

   // console.log(items)
   useEffect(()=> {
     if(!user){
       router.push('/login')
     }
   },[user])
  
  
  

 
  return (
      <Box w="100%" minH="1080px" pl={{ base: '0', md: '131px'}} >
         {loading? 
            <div className='boxCenter'>
               <CircularProgress isIndeterminate size='200px' color='var(--blue)' />
            </div> :
         <>
            <Text fontSize="32px" mt="50px" mb="20px">Bookmarked Movies</Text>
            <Grid w="100%" templateColumns='repeat(auto-fit, minmax(280px, 1fr))' justifyItems="center" alignContent="center" gap={2}>
               {datas.map((item,index)=>{
                  if(item.category=="Movie" && item.isBookmarked) {
                     return  <RegularItem key={index} {...item}/>
                  }else {
                     return 
                  }
               })}
                  
            </Grid>
            <Text fontSize="32px" mt="50px" mb="20px">Bookmarked TV Movies</Text>
            <Grid w="100%" templateColumns='repeat(auto-fit, minmax(280px, 1fr))' justifyItems="center" alignContent="center" gap={2}>
               {datas.map((item,index)=>{
                  if(item.category=="TV Series" && item.isBookmarked) {
                  return  <RegularItem key={index} {...item}/>
                  }
               })}
           
            </Grid>
         </>
         }
      </Box>
  )
}
