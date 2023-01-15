import { Box,Text } from '@chakra-ui/react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'

import BookmarEmptyIcon from '../../assets/icon-bookmark-empty.svg'
import BookmarFullIcon from '../../assets/icon-bookmark-full.svg'
import styles from './TrandingItem.module.css'
import CategoryMovie from '../../assets/icon-category-movie.svg'

import { IFilms, IFilmsContextType } from '../../types/types'
import { FilmContext } from '../../context/FilmContext'
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { auth } from '../../firebase';

const TrandingItem = (item:IFilms) => {

  const {user,bookmarkedHandler}  = useContext(FilmContext)  as IFilmsContextType
  const [checked, setChecked] =useState(item.isBookmarked)
  const [isMobile, setIsMobile] = useState(false)
  
  
  const savedShows = ()=> {
    bookmarkedHandler(item)
    setChecked(!item.isBookmarked)
    console.log(item.id)
  }
  
 
  const handleResize = () => {
    if (window.innerWidth < 587) {
        setIsMobile(true)
    } else {
        setIsMobile(false)
    }
  }
  

  useEffect(() => {
    window.addEventListener("resize", handleResize)

    return ()=> {
      window.removeEventListener("resize", handleResize)
    }
  })

  return ( 
   <Box position="relative"   minW={{ base: '235px', md: '470px'}}  height={{ base: '115px', md: '230px'}} 
   >
     {item.thumbnail.trending && 
     <>
     <Box onClick={savedShows} className={styles.wrapper} position="absolute" borderRadius="100%" right="24px" top="16px" opacity="0.5" w="32px" h="32px" bgColor="var(--second-color)" display="flex" alignItems="center" justifyContent="center" cursor="pointer"  >
      {!checked? <BookmarEmptyIcon className={styles.svgIcon}/> : <BookmarFullIcon/>}
     </Box>
     
     {!isMobile? <Image
          src={item.thumbnail.trending.large }
          alt="Picture of the author"
          width={470}
          height={230}
          
        /> :<Image
        src={item.thumbnail.trending.small }
        alt="Picture of the author"
        width={235}
          height={115}
        
      />}
      <Box position="absolute" bottom={{ base: '-20px', md: '24px'}}  left="24px">
        <Box display="flex" gap="10px" alignItems="center">
          <Text fontSize="15px" opacity="0.75">{item.year}</Text>
          <Box display="flex" alignItems="center" gap="2px">
          <CategoryMovie/>
          <Text fontSize="15px" opacity="0.75">{item.category}</Text>
          </Box>
          <Text fontSize="15px" opacity="0.75">{item.rating}</Text>
        </Box>
        <Text fontSize={{ base: '18px', md: '24px'}} fontWeight="500">{item.title}</Text>
      </Box>
     </>}
   </Box>
  )
}

export default TrandingItem