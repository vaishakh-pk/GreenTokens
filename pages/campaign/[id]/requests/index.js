import React, { useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import {
  Heading,
  useBreakpointValue,
  useColorModeValue,
  Text,
  Button,
  Flex,
  Container,
  SimpleGrid,
  Box,
  Spacer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Skeleton,
  Alert,
  AlertIcon,
  AlertDescription,
  Link,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

const mockRequests = [
  {
    id: 0,
    description: "Buy materials",
    value: "100",
    recipient: "0xABC123...",
  },
  {
    id: 1,
    description: "Marketing expenses",
    value: "200",
    recipient: "0xDEF456...",
  },
  // Add more mock data as needed
];

export default function Requests() {
  const [requestsList, setRequestsList] = useState(mockRequests);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <Head>
        <title>Campaign Withdrawal Requests</title>
        <meta name="description" content="View withdrawal requests" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container px={{ base: "4", md: "12" }} maxW={"7xl"} align={"left"}>
          <Flex flexDirection={{ base: "column", md: "row" }} py={4}>
            <Box py="4">
              <Text fontSize={"lg"} color={"teal.400"}>
                <ArrowBackIcon mr={2} />
                <NextLink href="/">Back to Campaign</NextLink>
              </Text>
            </Box>
            <Spacer />
            <Box py="4">
              <Heading as="h1" size="lg">
                Campaign Requests
              </Heading>
            </Box>
          </Flex>
          {requestsList.length > 0 ? (
            <Container px={{ base: "4", md: "12" }} maxW={"7xl"} align={"left"}>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Description</Th>
                    <Th isNumeric>Amount</Th>
                    <Th>Recipient</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {requestsList.map((request) => (
                    <Tr key={request.id}>
                      <Td>{request.id}</Td>
                      <Td>{request.description}</Td>
                      <Td isNumeric>{request.value}</Td>
                      <Td>{request.recipient}</Td>
                    </Tr>
                  ))}
                </Tbody>
                <TableCaption>Withdrawal requests list</TableCaption>
              </Table>
            </Container>
          ) : (
            <Container
              maxW={"lg"}
              align={"center"}
              display={isLoading ? "none" : "block"}
            >
              <Skeleton height="20px" my="10px" />
              <Skeleton height="20px" my="10px" />
              <Skeleton height="20px" my="10px" />
              <Alert status="info">
                <AlertIcon />
                <AlertDescription>No requests found.</AlertDescription>
              </Alert>
            </Container>
          )}
        </Container>
      </main>
    </div>
  );
}
