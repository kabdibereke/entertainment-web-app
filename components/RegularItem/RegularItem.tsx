import { Box,Text } from '@chakra-ui/react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import BookmarEmptyIcon from '../../assets/icon-bookmark-empty.svg'
import BookmarFullIcon from '../../assets/icon-bookmark-full.svg'
import styles from './RegularItem.module.css'
import CategoryMovie from '../../assets/icon-category-movie.svg'
import { motion } from 'framer-motion'
import { IFilms } from '../../interface/interface'
import { useSelector } from 'react-redux'
import {  RootState } from '../../store/store'



interface RegularItemProps {
  id:number,
  item:IFilms,
  handleCheck: (checked: boolean, id: number) => void
}

const RegularItem = ({id,item,handleCheck}:RegularItemProps) => {
  const [checked, setChecked] = useState(item.isBookmarked)
  const {films} = useSelector((item:RootState)=>item.filmsSlice)

  
  useEffect(()=> {
    setChecked(item.isBookmarked)
  },[films])

  const ff=()=>{
    handleCheck(checked,id)
    
  }

  return (
   <Box 
   as={motion.div} 
    initial={{ opacity: 0}}
    animate={{ opacity: 1}}
    transition='0.2s linear'
   position="relative" w='280px' mb="20px"  zIndex="5" 
   >
     <Box className={styles.wrapper}  position="absolute" borderRadius="100%" right="24px" top="16px" opacity="0.5" w="32px" h="32px" bgColor="var(--second-color)" display="flex" alignItems="center" justifyContent="center" cursor="pointer" onClick={ff} >
      {!checked? <BookmarEmptyIcon className={styles.svgIcon}/> : <BookmarFullIcon/>}
     </Box>
        <Image
          src={item!.thumbnail!.regular!.large}
          alt="Picture of the author"
          width={280}
          height={220}
          className="img"
          />
         
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