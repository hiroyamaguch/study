import { Button, Flex, Grid, Image, Input, InputGroup, InputLeftElement, Text, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { SearchIcon } from '@chakra-ui/icons'
import { RestaurantCard } from '../components/RestaurantCard'
import { Page } from '../components/Page'
import { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { api } from '../services/api'
import { IRestaurant } from '../dtos'
import { useAuth } from '../hooks/auth'

const Home: NextPage = () => {
  const { signOut } = useAuth();

  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<IRestaurant[]>([]);

  const handleFilter = useCallback((event: SyntheticEvent<HTMLInputElement>) => {
    const filtered = restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(event.currentTarget.value.toLowerCase())
    );

    setFilteredRestaurants(filtered);
  }, [restaurants])

  useEffect(() => {
    api.get('restaurants').then(response => {
      setRestaurants(response.data);
      setFilteredRestaurants(response.data);
    })
  }, [])

  return (
    <Page subtitle='Restaurantes'>
      <Flex
        bg="primary.500"
        height={{ base: "300px", lg: "240px" }}
        py="40px"
        w="100%"
        justifyContent="center"
      >
        <Flex
          w="100%"
          px='20px'
          maxW="1120px"
          justifyContent={{ base: "start", lg: "space-between" }}
          alignItems={{ base: "center", lg: "start" }}
          flexDir={{ base: 'column', lg: 'row' }}
        >
          <Image src="/images/logo.svg" alt="UrFood" height="60px" mb={{ base: '16px', lg: '0' }} />

          <InputGroup borderRadius="8px" maxW="400px">
            <InputLeftElement pointerEvents='none'>
              <SearchIcon color='primary.500' />
            </InputLeftElement>
            <Input
              type='text'
              placeholder='Encontre o que procura'
              bg="white"
              onChange={handleFilter}
            />
          </InputGroup>

          <VStack textAlign="end" color="white" display={{ base: 'none', lg: 'block' }}>
            <Text fontSize="xl">
              Bem vindo, Pedro!
            </Text>
            <Button variant="link" colorScheme="white" onClick={signOut}>
              Sair
            </Button>
          </VStack>
        </Flex>
      </Flex >

      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
          xl: 'repeat(4, 1fr)',
        }}
        gap="32px"
        position="relative"
        top={{ base: "-20px", sm: '-80px', lg: "-80px" }}
        maxW='1120px'
        px='20px'
      >
        {filteredRestaurants.map(restaurant => (
          <RestaurantCard key={restaurant.id} {...restaurant} />
        ))}
      </Grid>
    </Page >
  )
}

export default Home
