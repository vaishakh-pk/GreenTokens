import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Container,
  Heading,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function NewRequest() {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [recipient, setRecipient] = useState("");
  const toast = useToast();

  // Dummy function for submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you'd normally submit the form data, but for now, we'll just show a toast
    toast({
      title: "Request creation simulated",
      description: "In a real app, this would submit the request data",
      status: "info",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <div>
      <Head>
        <title>Create Request</title>
        <meta name="description" content="Create a new request" />
      </Head>

      <main>
        <Container maxW="container.md">
          <Box py="4">
            <Text fontSize={"lg"} color={"teal.400"}>
              <ArrowBackIcon mr={2} />
              <NextLink href="/">Back</NextLink>
            </Text>
          </Box>
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
            <Box p={4}>
              <Heading>Create a Request</Heading>
            </Box>
            <Box my={4} textAlign="left">
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Value in Ether</FormLabel>
                  <Input
                    type="text"
                    placeholder="Value"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Recipient Address</FormLabel>
                  <Input
                    type="text"
                    placeholder="Recipient"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  />
                </FormControl>

                <Button
                  width="full"
                  mt={4}
                  type="submit"
                >
                  Create Request
                </Button>
              </form>
            </Box>
          </Box>
        </Container>
      </main>
    </div>
  );
}
