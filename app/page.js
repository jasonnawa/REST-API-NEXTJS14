import Image from "next/image";
import styles from "./page.module.css";

<<<<<<< HEAD
'use client'
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react";

const Home = ()=>{
    const toast = useToast()
    var data

    const [value, setValue] = useState(false)

    const displayValues = async ()=>{
        const res = await fetch("/api/crud")
         data = await res.text()
        if(res.status == "200"){
            console.log(data)
            setValue(true)
            toast({
                title: "generate successful",
                status: 'success',
                position: 'top-right',
                duration: 2500,
                isClosable: true,
              })
        }else if(res.status == "400"){
            toast({
                title: "Unsuccessful",
                status: 'warning',
                position: 'top-right',
                duration: 1500,
                isClosable: true,
              })
        }
        
        
    }

    useEffect((data)=>{

    }, value)

  
    return  (
        <Flex align="center" justifyContent="center" h="100vh">
            <Box  h={200}>
                <Text fontSize={30}><strong> Home Page </strong></Text>
                <Button onClick={displayValues} >Generate</Button>
             {value? (
                <Text>{data}</Text>
             ) : (
                <Text>No value</Text>
             ) }

                
            </Box>
        </Flex>
    )
=======
export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>app/page.js</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
>>>>>>> parent of 8b95fa1 (first commit)
}
