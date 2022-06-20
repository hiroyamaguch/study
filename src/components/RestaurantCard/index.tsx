import { useEffect, useRef, useState } from "react"
import { AddIcon, ArrowForwardIcon } from "@chakra-ui/icons"
import { AspectRatio, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Grid, GridItem, Image, Text, useDisclosure, VStack } from "@chakra-ui/react"
import { IRecipe, IRestaurant } from "../../dtos"
import { api } from "../../services/api"
import { RecipeCard } from "../RecipeCard"

export const RestaurantCard: React.FC<IRestaurant> = ({ address, name, phone, id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  useEffect(() => {
    api.get('recipes', {
      params: {
        restaurantId: id,
      }
    }).then(response => setRecipes(response.data))
  }, [id])

  return (
    <GridItem w='100%' bg='tertiary.500' borderRadius="8px">
      <AspectRatio ratio={4 / 3} m="32px 40px 0 40px">
        <Image src="/images/restaurant.svg" alt="Restaurante da Taís" objectFit='cover' />
      </AspectRatio>

      <Flex
        align="start"
        bg="#F0F0F5"
        flexDir="column"
        py="24px"
        px="40px"
      >
        <Text
          fontSize="lg"
          fontWeight="bold"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
          w="100%"
        >{name}</Text>
        <Text
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
          w="100%"
        >{address}</Text>
      </Flex>

      <Flex alignContent="center" bg="#E4E4EB" py="20px" px="40px" borderRadius="0 0 8px 8px">
        <Button
          w="100%"
          size="sm"
          bg="secondary.500"
          color="white"
          rightIcon={<ArrowForwardIcon />}
          onClick={onOpen}
        >
          Verificar Cardápio
        </Button>
      </Flex>

      <Drawer isOpen={isOpen} placement='right' onClose={onClose} size={{ base: "full", lg: 'lg' }}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{name}</DrawerHeader>

          <DrawerBody>
            <Text>Telefone: {phone}</Text>
            <Text>Endereço: {address}</Text>
            <Grid
              templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
              gap="16px"
              maxW='1120px'
              pt="32px"
              px='20px'
            >
              {recipes.map(recipe => (
                <RecipeCard key={recipe.id} {...recipe} />
              ))}
            </Grid>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Voltar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </GridItem >
  )
}