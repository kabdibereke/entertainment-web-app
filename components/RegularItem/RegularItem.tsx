import { Box,Text } from '@chakra-ui/react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import BookmarEmptyIcon from '../../assets/icon-bookmark-empty.svg'
import BookmarFullIcon from '../../assets/icon-bookmark-full.svg'
import styles from './RegularItem.module.css'
import CategoryMovie from '../../assets/icon-category-movie.svg'
import { IFilms, IFilmsContextType } from '../../types/types'
import { FilmContext } from '../../context/FilmContext'
import { motion } from 'framer-motion'


const RegularItem = (item: IFilms) => {
  const {user,bookmarkedHandler,writeData,datas}  = useContext(FilmContext)  as IFilmsContextType
  const [checked, setChecked] =useState(false)

   


 

  const savedShows = ()=> {
    if(!item.isBookmarked) {
      writeData(item)
      
    }else {
      bookmarkedHandler(item)

    }
    
    setChecked(!checked)
  }

  return (
   <Box 
   as={motion.div} 
    initial={{ opacity: 0}}
    animate={{ opacity: 1}}
    transition='0.2s linear'
   position="relative" w='280px' mb="20px"  zIndex="5"
   >
     <Box className={styles.wrapper}  position="absolute" borderRadius="100%" right="24px" top="16px" opacity="0.5" w="32px" h="32px" bgColor="var(--second-color)" display="flex" alignItems="center" justifyContent="center" cursor="pointer"  onClick={savedShows}>
      {!checked? <BookmarEmptyIcon className={styles.svgIcon}/> : <BookmarFullIcon/>}
     </Box>
     <Image
          src={item.thumbnail.regular.large}
          alt="Picture of the author"
          width={280}
          height={220}/>
      <Box >
        <Box display="flex" gap="10px" alignItems="center" mt="10px">
          <Text fontSize="13px" opacity="0.75">{item.year} </Text>
          <Box display="flex" alignItems="center" gap="2px">
          <CategoryMovie/>
          <Text fontSize="13px" opacity="0.75">{item.category}</Text>
          </Box>
          <Text fontSize="13px" opacity="0.75">{item.rating}</Text>
        </Box>
        <Text fontSize="18px" fontWeight="500">{item.title}</Text>
      </Box>
   </Box>
  )
}

export default RegularItem