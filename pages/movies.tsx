import { Box,CircularProgress,Grid,Text } from '@chakra-ui/react'
import RegularItem from '../components/RegularItem/RegularItem'
import { IFilms, IFilmsContextType } from '../types/types'
import { useContext, useEffect, useState } from 'react'
import { FilmContext } from '../context/FilmContext'
import { useRouter } from 'next/router'




export default function Movies() {

   const {items,loading}  = useContext(FilmContext)  as IFilmsContextType
   const router= useRouter()
   const [correctItems,setCorrectItems] = useState<IFilms[]>([])
   const [newArr, setNewArr] = useState<IFilms[]>([])

   // console.log(items)
   // useEffect(()=> {
   //   if(!user){
   //     router.push('/login')
   //   }
   // },[user])
   useEffect(()=> {
      const t = items.filter(item=> item.isBookmarked)
      setNewArr(t)
     
    },[items])
    console.log(newArr)
    useEffect(()=> {
      const unique = [...new Map(items.map((m) =>  [m.title, m])).values()];

      for(let i=0; i<unique.length; i++) {
          for (let j=0; j<newArr.length; j++) {
              if(unique[i].title==newArr[j].title) {
               unique[i].isBookmarked=true
  
              }
          }
      } 
      setCorrectItems(unique)
    },[items,newArr])
  
  
  //  useEffect(()=> {
  //    if(!user){
  //      router.push('/login')
  //    }
  //  },[user])
 

  return (
   <Box w="100%" minH="1080px" pl={{ base: '0', md: '131px'}}>
   {loading? <div className='boxCenter'>
      <CircularProgress isIndeterminate size='200px' color='var(--blue)' />
      </div> :
      <>
      <Text fontSize="32px" mt="50px" mb="20px">Movies</Text>
      <Grid w="100%" templateColumns='repeat(auto-fit, minmax(280px, 1fr))' gap={2}>
            {correctItems.map((item,index)=>{
               if(item.category=="Movie") {
               return  <RegularItem key={index} {...item}/>
               }
            })}
      </Grid> 
      </>}
   </Box>
  )
}
