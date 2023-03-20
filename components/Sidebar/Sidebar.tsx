import { Box, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'
import Logo from '../../assets/logo.svg'
import Home from '../../assets/icon-nav-home.svg'
import HomeActive from '../../assets/icon-nav-home-active.svg'
import Movies from '../../assets/icon-nav-movies.svg'
import MoviesActive from '../../assets/icon-nav-movies-active.svg'
import TV from '../../assets/icon-nav-tv-series.svg'
import TVActive from '../../assets/icon-nav-tv-series-active.svg'
import BookmarkIcon from '../../assets/icon-nav-bookmark.svg'
import BookmarkIconActive from '../../assets/icon-nav-bookmark-active.svg'
import styles from './Sidebar.module.css'
import Link from "next/link";
import { useRouter } from 'next/router'
import { Avatar } from '@chakra-ui/react'
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase'
import { motion } from 'framer-motion'

const Sidebar = () => {
  const [signOut, loading, error] = useSignOut(auth);
  const router = useRouter()
  return (
    <Box 
    as={motion.div} 
    initial={{ opacity: 0}}
    animate={{ opacity: 1}}
    transition='0.2s linear'
    bgColor="var(--second-color)"  w={{ base: '100%', md: '96px'}} h={{ base: '96px', md: '460px'}}    position={{ base: 'static', md: 'fixed'}}   paddingTop={{ base: '0', md: '35px'}} mt={{ base: '0', md: '32px'}}  ml={{ base: '0', md: '32px'}}  borderRadius="20px"   zIndex="66"> 
       <Box display="flex" flexDirection={{ base: 'row', md: 'column'}} w="100%" alignItems="center" justifyContent="space-between" h="100%">
          <Box display="flex"  flexDirection={{ base: 'row', md: 'column'}} alignItems="center"  gap="25px"  w="100%" justifyContent="center">
              <Logo  className={styles.svgIconMain} />
              <Link href='/'>{router.pathname=='/' ? <HomeActive className={styles.svgIcon}/> : <Home className={styles.svgIcon}/>}</Link>   
              <Link href='/movies'> {router.pathname=='/movies' ? <MoviesActive className={styles.svgIcon}/> : <Movies className={styles.svgIcon}/>}</Link>
              <Link href='/tv'> {router.pathname=='/tv' ? <TVActive className={styles.svgIcon}/> : <TV className={styles.svgIcon}/>}</Link>
              <Link href='/bookmark'> {router.pathname=='/bookmark' ? <BookmarkIconActive className={styles.svgIcon}/> : <BookmarkIcon className={styles.svgIcon}/>}</Link>
          </Box>
          <Box mb={{ base: '0', md: '50px'}} mr={{ base: '20px', md: '0'}} >
          <Menu  >
            <MenuButton 
              border="none"
              borderRadius="100%"
              as={IconButton}
              aria-label='Options'
              icon={<Avatar />}
              _hover={{border:"none"}}
            />
            <MenuList width="100px">
              <MenuItem  onClick={async () => {
                  const success = await signOut();
                  if (success) {
                    alert('You are sign out');
                    localStorage.removeItem('user');
                    router.push('/login')
                  }
              }}>
                Log Out
              </MenuItem>
            
            </MenuList>
          </Menu>
          </Box>
       </Box>
    </Box>
  )
}

export default Sidebar