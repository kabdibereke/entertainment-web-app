import { Box,CircularProgress,Grid,Text } from '@chakra-ui/react'
import RegularItem from '../components/RegularItem/RegularItem'
import { IFilms, IFilmsContextType } from '../types/types'
import { useContext, useEffect, useState } from 'react'
import { FilmContext } from '../context/FilmContext'
import { useRouter } from 'next/router'

export default function Movies() {

   const {user,loading,items}  = useContext(FilmContext)  as IFilmsContextType
   const router= useRouter()


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
            <Text fontSize="32px" mt="50px" mb="20px">TV Movies</Text>
            <Grid w="100%" templateColumns='repeat(auto-fit, minmax(280px, 1fr))' gap={2}>
               {items.map((item,index)=>{
                  if(item.category=="TV Series") {
                  return  <RegularItem key={index} {...item}/>
                  }
               })}
            </Grid>
         </>
      }
      </Box>
  )
}
