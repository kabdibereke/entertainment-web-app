import { Box, Container } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useRouter } from 'next/router'

import Sidebar from "./Sidebar/Sidebar";

interface ILayout {
    children:ReactNode
}

const Layout = ({ children }:ILayout) => {
    const router = useRouter()

	return (
        <Box minH='100%' bgColor="var(--main-color)"  position="relative">
              {router.pathname!='/register' &&  router.pathname !='/login' &&  router.pathname !='/resetPassword'?  <Sidebar />:null }
            <Container maxW='1280px' display="flex"  flexWrap="nowrap" >
            {children}
            </Container>    
        </Box>
	);
};

export default Layout;
