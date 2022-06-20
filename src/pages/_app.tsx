import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

import "@fontsource/poppins"
import AppProvider from '../hooks';

const colors = {
  primary: {
    500: '#C72828'
  },
  secondary: {
    400: '#41C900',
    500: '#39B100',
  },
  tertiary: {
    500: '#FFB84D'
  }
}

const fonts = {
  body: 'Poppins',
};

const theme = extendTheme({ colors, fonts })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </ChakraProvider>
  )
}

export default MyApp
