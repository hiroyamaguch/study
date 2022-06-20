import { Button, Flex, Image, Input, InputGroup, InputLeftElement, Text, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { SearchIcon } from '@chakra-ui/icons'
import { Page } from '../components/Page'
import { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { useAuth } from '../hooks/auth'

const Login: NextPage = () => {
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeEmail = useCallback((event: SyntheticEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  }, []);

  const handleChangePassword = useCallback((event: SyntheticEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  }, []);

  const handleLogin = useCallback(async () => {
    setIsLoading(true);
    await signIn({ email, password });
    setIsLoading(false);

    window.location.href = '/';
  }, [email, password, signIn]);

  return (
    <Page subtitle='Login'>
      <VStack
        bg="black"
        h="full"
        w="full"
        justifyContent="center"
        spacing="40px"
      >
        <Image
          src="/images/logo.svg"
          alt="UrFood"
          height="100px"
        />

        <VStack w="full" spacing="8px">
          <Input
            maxW={{ base: "80%", lg: "30%" }}
            bg="white"
            placeholder='Digite seu email'
            onChange={handleChangeEmail}
          />
          <Input
            maxW={{ base: "80%", lg: "30%" }}
            bg="white"
            placeholder='Digite sua senha'
            onChange={handleChangePassword}
          />
        </VStack>

        <Button onClick={handleLogin} isLoading={isLoading} h="40px" w="200px">
          Fazer Login
        </Button>
      </VStack>
    </Page >
  )
}

export default Login
