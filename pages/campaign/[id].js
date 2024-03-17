import React from 'react';
import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';
import { ArrowBackIcon } from '@chakra-ui/icons';

export default function CampaignDetails() {
  // Normally, blockchain data would be fetched and stored in state variables here
  // For demonstration, we'll use hardcoded values to represent this data
  const campaignDetails = {
    address: "0xABC...XYZ", // Example campaign address
    description: "A sample campaign for demonstration purposes.",
    minimumContribution: "0.01 ETH",
    balance: "10 ETH",
    requestsCount: "5",
    contributorsCount: "10",
    manager: "0xMANAGER",
  };

  return (
    <div>
      <Head>
        <title>Campaign Details</title>
        <meta name="description" content="View the details of the campaign" />
      </Head>

      <main>
        <Container maxW="container.md">
          <Box py="4">
            <Text fontSize={"lg"} color={"teal.400"}>
              <ArrowBackIcon mr={2} />
              <NextLink href="/">Back to Campaigns</NextLink>
            </Text>
          </Box>
          <VStack spacing={4} align="stretch">
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
              <Heading mb={4}>Campaign Details</Heading>
              <Text><strong>Description:</strong> {campaignDetails.description}</Text>
              <Text><strong>Minimum Contribution:</strong> {campaignDetails.minimumContribution}</Text>
              <Text><strong>Balance:</strong> {campaignDetails.balance}</Text>
              <Text><strong>Number of Requests:</strong> {campaignDetails.requestsCount}</Text>
              <Text><strong>Number of Contributors:</strong> {campaignDetails.contributorsCount}</Text>
              <Text><strong>Managed by:</strong> {campaignDetails.manager}</Text>
            </Box>
            <Box>
              <Button colorScheme="teal" variant="outline">View Requests</Button>
            </Box>
          </VStack>
        </Container>
      </main>
    </div>
  );
}
