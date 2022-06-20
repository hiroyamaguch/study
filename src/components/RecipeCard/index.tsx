import { AddIcon } from "@chakra-ui/icons"
import { AspectRatio, Button, Flex, GridItem, Image, Text } from "@chakra-ui/react"
import { IRecipe } from "../../dtos"
import { formatPrice } from "../../helpers"

export const RecipeCard: React.FC<IRecipe> = ({ name, price, description, imageURL }) => {
  return (
    <GridItem w='100%' bg='tertiary.500' borderRadius="8px">
      <AspectRatio ratio={5 / 3} m="32px 40px 0 40px">
        <Image src="/images/camarao.svg" alt="Restaurante da Taís" objectFit='cover' />
      </AspectRatio>

      <Flex align="start" bg="#F0F0F5" flexDir="column" py="24px" px="40px">
        <Text fontSize="lg" fontWeight="bold">{name}</Text>
        <Text>{description}</Text>
        <Text fontSize="xl" color="secondary.500">{formatPrice(price)}</Text>
      </Flex>

      <Flex
        alignContent="center"
        bg="#E4E4EB"
        py="20px"
        px="40px"
        borderRadius="0 0 8px 8px"
      >
        <Button
          w="100%"
          size="sm"
          bg="secondary.500"
          color="white"
          rightIcon={<AddIcon />}
        >
          Adicionar ao Carrinho
        </Button>
      </Flex>
    </GridItem>
  )
}