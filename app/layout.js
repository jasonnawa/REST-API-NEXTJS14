<<<<<<< HEAD
import { Providers }  from "./providers";
import { Box, Flex, GridItem, Grid } from "@chakra-ui/react";
=======
import { Inter } from "next/font/google";
import "./globals.css";
>>>>>>> parent of 8b95fa1 (first commit)

const inter = Inter({ subsets: ["latin"] });

<<<<<<< HEAD
export default async function RootLayout({ children }) {

=======
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
>>>>>>> parent of 8b95fa1 (first commit)

export default function RootLayout({ children }) {
  return (
    <html lang="en">
<<<<<<< HEAD
      <Box as="body" bg="black" color="white">
      
        <Providers>
      
       
          {children}
      
     
        
       
        </Providers>
      
        </Box>
=======
      <body className={inter.className}>{children}</body>
>>>>>>> parent of 8b95fa1 (first commit)
    </html>
  );
}