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
  const {items,loading}  = useContext(FilmContext)  as IFilmsContextType
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



  return (
       <Box w="100%" minH="1800px" pl={{ base: '0', md: '131px'}} >
          {loading? <div className='boxCenter'>
          <CircularProgress isIndeterminate size='200px' color='var(--blue)' />
          </div> :
          <>
            <Text fontSize="32px">Trending</Text>
            <div className= 'box'>
              {correctItems.map((item,index)=>{
                if(item.isTrending) {
                  
                  return <TrandingItem key={index} {...item} />
                }
              
                })}
              
            </div>
            <Text fontSize="32px" mt="50px" mb="20px">Recommended for you</Text>
            <Grid w="100%" templateColumns='repeat(auto-fill, minmax(280px, 1fr))' justifyItems="center" alignContent="center" gap={2}>
                  {correctItems?.map((item,index)=>{
                      return  <RegularItem key={index} {...item}/>
                  })}
            </Grid>   
          </>}
       </Box>
  )
}

