import React, { ReactNode } from "react";
import { Container, SlideFade } from "@chakra-ui/react";
import Head from "next/head";

interface PageProps {
  children: ReactNode;
  subtitle: string;
  title?: string;
}

export const Page: React.FC<PageProps> = ({ children, subtitle, title = "UrFood" }) => {
  const pageTitle = subtitle ? `${title} - ${subtitle}` : title;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <SlideFade in>
        <Container centerContent maxW="full" h='calc(100vh)' px="0">
          {children}
        </Container>
      </SlideFade>
    </>
  )
}