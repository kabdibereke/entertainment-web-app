import React, { useContext, useState } from 'react'
import { Box,
        Input, 
        Text,    
        Button, 
        FormControl,
        } from "@chakra-ui/react"

import Logo from '../assets/logo.svg'
import { useForm,  SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { FilmContext } from '../context/FilmContext';
import { IFilmsContextType } from '../types/types';
import { useRouter } from 'next/router';

type FormValues = {
    email: string;
    password:string;
    isPassword:string
};

const Register = () => {
    const { createUserWithEmailAndPassword,loadingSignup,errorSignup,user}  = useContext(FilmContext)  as IFilmsContextType
    const router= useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm<FormValues>();
    const [email, setEmail] =useState('');
    const [password, setPassword] = useState('')
    const [isPassword, setIsPassword] = useState('')
  

    const onSubmit:SubmitHandler<FormValues> = async  (data:FormValues )=> {
        await  createUserWithEmailAndPassword(data.email, data.password)
     
        if(typeof errorSignup !='undefined' ) {
            router.push('/')
        }
    }
    
  return (
    <Box w="100%" minH="100vh" display="flex" justifyContent="center" flexDirection="column" alignItems="center" gap="50px">
    <Logo/>
    <Box w="400px" h="fit-content" bgColor="var(--second-color)" borderRadius="20px" padding="32px">
        <Text fontWeight="300" fontSize="32px" lineHeight="40px" letterSpacing="-0.5px">
            Register
            
        </Text>
        {errorSignup && <Text marginTop="20px" color="var(--red)">{errorSignup.message.substring(10)}</Text>}
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl  >
               
                <Input marginTop='30px' {...register("email", {
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
                
                <Input  marginTop='30px' 
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
            <FormControl >
               
                <Input marginTop='30px'  {...register("isPassword", {
                required: true, 
                validate: value =>
                value ===  password  })}
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setIsPassword(e.target.value)}
                value={isPassword}
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
            {loadingSignup? 'Loading': 'Register'}
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