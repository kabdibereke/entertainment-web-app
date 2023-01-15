import React, { useContext, useEffect, useState } from 'react'
import { Box,
        Container,
        Input, 
        Text,
        Button, 
        FormControl,
        FormLabel,
        FormErrorMessage,} from "@chakra-ui/react"
import Logo from '../assets/logo.svg'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Link from 'next/link';
import Tranding from '../components/Tranding/Tranding';
import { FilmContext } from '../context/FilmContext';
import { IFilmsContextType } from '../types/types';
import { useRouter } from 'next/router';
import { User } from 'firebase/auth';

type FormValues = {
    email: string;
    password:string;
    isPassword?:string
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const router= useRouter()
  const {signInWithEmailAndPassword,loadingSignin,errorSignin,user}  = useContext(FilmContext)  as IFilmsContextType

    const {
    register,
    handleSubmit,
    formState: { errors }
    } = useForm<FormValues>();


    const onSubmit:SubmitHandler<FormValues> = async (data:FormValues )=> {
        await  signInWithEmailAndPassword(data.email, data.password)
        if(typeof errorSignin !='undefined' ) {
            router.push('/')
        }
       
    };
    

  return (
    <Box w="100%" minH="100vh" display="flex" justifyContent="center" flexDirection="column" alignItems="center" gap="50px">
         <Logo/>
         <Box w="400px" h="fit-content" bgColor="var(--second-color)" borderRadius="20px" padding="32px">
             <Text fontWeight="300" fontSize="32px" lineHeight="40px" letterSpacing="-0.5px">
                 Login
                 
             </Text>
             {errorSignin &&  <Text marginTop="20px" color="var(--red)">{errorSignin.message.substring(10)}</Text>}
             <form onSubmit={handleSubmit(onSubmit)}>
                 <FormControl >
                     
                     <Input marginTop='30px'  {...register("email", {
                     required: true, 
                     pattern: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })} 
                     onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)}
                     value={email}
                     placeholder="Email address" border="none" borderRadius="0" borderBottom= "2px solid var(--blue)" fontWeight="300" fontSize="15px" color="var(--white)" _focus={{border:"none",  borderRadius:"0", borderBottom: "2px solid var(--white)"}} />
                     {errors?.email?.type === "required" && <Text color="var(--red)" fontSize="13px"> 
                     Email Address is required
                     </Text>}
                         {errors?.email?.type === "pattern" && <Text  color="var(--red)"  fontSize="13px"> 
                     Email Address is required
                     </Text>}
                 
                 
                 </FormControl>
                 <FormControl >
                    
                     <Input  
                     marginTop='30px' 
                     {...register("password", {
                     required: true, 
                     minLength: 6 })} 
                     onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setPassword(e.target.value)}
                     value={password}
                     type="password"
                     placeholder="Password" border="none" borderRadius="0" borderBottom= "2px solid var(--blue)" fontWeight="300" fontSize="15px" color="var(--white)" _focus={{border:"none",  borderRadius:"0", borderBottom: "2px solid var(--white)"}} />
                     {errors?.password?.type === "required" && <Text color="var(--red)" fontSize="13px"> 
                     Password Address is required
                     </Text>}
                         {errors?.password?.type === "minLength" && <Text  color="var(--red)"  fontSize="13px"> 
                         minimum length have to be 6symbols
                     </Text>}
                 
                 
                 </FormControl>
                 <Button  type='submit' w="100%" marginTop="35px" backgroundColor="var(--red)">
                     {loadingSignin? 'Loading': 'Sign In'}
                 </Button>
             </form>
             
             
             <Text textAlign="center"  marginTop="20px">
                 Don’t have an account? <Link href="/register">Sign Up </Link>

             </Text>
                 
             <Text textAlign="center"  marginTop="20px">
                 Forget Password? <Link href="/resetPassword">Reset Password </Link>

             </Text>
         </Box>
        
    </Box>

  )
}

export default Login