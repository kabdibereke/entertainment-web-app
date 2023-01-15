import React from 'react'
import { Box } from '@chakra-ui/react'
import TrandingItem from '../TrandingItem/TrandingItem'
const arr = [1,2,3,4,5,6,8,9,4,5,5]
type Props = {}

const Tranding = (props: Props) => {
  return (
    <Box w="100%"  display="flex"  overflow-x="scroll"   whiteSpace="nowrap">
        {arr.map((item,index)=>{
        return  <TrandingItem key={index}/>
        })}
    </Box>
  )
}

export default Tranding