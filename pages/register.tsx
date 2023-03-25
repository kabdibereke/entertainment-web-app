import React, { useContext, useEffect, useState } from 'react'
import { Box,
        Input, 
        Text,    
        Button, 
        FormControl,
        } from "@chakra-ui/react"

import Logo from '../assets/logo.svg'
import { useForm,  SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion'
import { auth, db } from '../firebase';
import { onValue, ref, set, update } from 'firebase/database'
import { data as films } from '../mock'
type FormValues = {
    email: string;
    password:string;
    isPassword:string
};

const Register = () => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);
    const router= useRouter()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
      } = useForm<FormValues>();
    const [email, setEmail] =useState('');
    const [password, setPassword] = useState('')
    const [isPassword, setIsPassword] = useState('')
  
    useEffect(()=> {
        if(user){
            router.push('/')
        }
    },[user])
    const onSubmit:SubmitHandler<FormValues> = async  (data:FormValues )=> {
        await  createUserWithEmailAndPassword(data.email, data.password)
        if(!error){
            set(ref(db, `/${data.email.replace('.','')}`), {
                data: films
            });
        }
    }
    
  return (
    <Box 
    as={motion.div} 
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition='0.1s linear'
    w="100%" minH="100vh" display="flex" justifyContent="center" flexDirection="column" alignItems="center" gap="50px">
    <Logo/>
    <Box w={{base:'100%', sm:"400px"}} padding={{base:'15px', sm:'32px'}} h="fit-content" bgColor="var(--second-color)" borderRadius="20px">
        <Text fontWeight="300" fontSize="32px" lineHeight="40px" letterSpacing="-0.5px">
            Register
            
        </Text>
        {error && <Text marginTop="20px" color="var(--red)">{error.message.substring(10)}</Text>}
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl  >
               
                <Input marginTop='30px' {...register("email", {
                required: true, 
                pattern: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })} 
              
                placeholder="Email address" border="none" borderRadius="0" borderBottom= "2px solid var(--blue)" fontWeight="300" fontSize="15px" color="var(--white)" _focus={{border:"none",  borderRadius:"0", borderBottom: "2px solid var(--white)"}} />
                {errors?.email?.type === "required" && <Text color="var(--red)" fontSize="13px"> 
                Email Address is required
                </Text>}
                    {errors?.email?.type === "pattern" && <Text  color="var(--red)"  fontSize="13px"> 
                Email Address is required
                </Text>}
            
            
            </FormControl>
            <FormControl >
                
                <Input  marginTop='30px' 
                {...register("password", {
                required: true, 
                minLength: 6 })} 
                
                type="password"
                placeholder="Password" border="none" borderRadius="0" borderBottom= "2px solid var(--blue)" fontWeight="300" fontSize="15px" color="var(--white)" _focus={{border:"none",  borderRadius:"0", borderBottom: "2px solid var(--white)"}} />
                {errors?.password?.type === "required" && <Text color="var(--red)" fontSize="13px"> 
                Password Address is required
                </Text>}
                    {errors?.password?.type === "minLength" && <Text  color="var(--red)"  fontSize="13px"> 
                    minimum length have to be 6symbols
                </Text>}
            
                
            </FormControl>
            <FormControl >
               
                <Input marginTop='30px'  {...register("isPassword", {
                required: true, 
                validate: value =>
                value ===  watch('password')  })}
                type="password"
                placeholder="Password" border="none" borderRadius="0" borderBottom= "2px solid var(--blue)" fontWeight="300" fontSize="15px" color="var(--white)" _focus={{border:"none",  borderRadius:"0", borderBottom: "2px solid var(--white)"}} />
                {errors?.isPassword?.type === "required" && <Text color="var(--red)" fontSize="13px"> 
                Password Address is required
                </Text>}
                    {errors?.isPassword?.type === "validate" && <Text  color="var(--red)"  fontSize="13px"> 
                   Dont same password
                </Text>}
            
            
            </FormControl>
            <Button  type='submit' w="100%" marginTop="35px" backgroundColor="var(--red)">
            {loading? 'Loading': 'Register'}
            </Button>
        </form>
       
        <Text textAlign="center"  marginTop="20px">
            Already have an account? <Link href="/login">Login </Link>

        </Text>
        <Text textAlign="center"  marginTop="20px">
                 Forget Password? <Link href="/resetPassword">Reset Password </Link>

             </Text>
      
        
    </Box>
</Box>
  )
}

export default Register