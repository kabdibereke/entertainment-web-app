import { Box,CircularProgress,Grid,Text } from '@chakra-ui/react'
import TrandingItem from '../components/TrandingItem/TrandingItem'
import RegularItem from '../components/RegularItem/RegularItem'
import { IFilms, IFilmsContextType } from '../types/types'
import { useContext, useEffect, useState } from 'react'
import { FilmContext } from '../context/FilmContext'
import { useRouter } from 'next/router'



// export const getStaticProps:GetStaticProps<{data:IFilms[]}> = async (context) => {
// 	const res = await fetch("http://localhost:5000/data");
// 	const data:IFilms[] = await res.json();

// 	return {
// 		props: {
// 			data
// 		},
// 	};
// };
// {data}:InferGetStaticPropsType<typeof getStaticProps>

export default function Home() {
  const router= useRouter()
  const {items,loading,user}  = useContext(FilmContext)  as IFilmsContextType


  useEffect(()=> {
    if(!user){
      router.push('/login')
    }
  },[user])
  
  


  return (
       <Box w="100%" minH="1800px" pl={{ base: '0', md: '131px'}} >
          {loading? <div className='boxCenter'>
          <CircularProgress isIndeterminate size='200px' color='var(--blue)' />
          </div> :
          <>
            <Text fontSize="32px">Trending</Text>
            <div className= 'box'>
              {items.map((item,index)=>{
                if(item.isTrending) {
                  
                  return <TrandingItem key={index} {...item} />
                }
              
                })}
              
            </div>
            <Text fontSize="32px" mt="50px" mb="20px">Recommended for you</Text>
            <Grid w="100%" templateColumns='repeat(auto-fill, minmax(280px, 1fr))' justifyItems="center" alignContent="center" gap={2}>
                  {items?.map((item,index)=>{
                      return  <RegularItem key={index} {...item}/>
                  })}
            </Grid>   
          </>}
       </Box>
  )
}

