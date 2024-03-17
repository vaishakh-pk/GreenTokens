// Import necessary modules from Next.js and Chakra UI
import Head from "next/head";
import { useState } from "react";
import NextLink from "next/link";
import styles from "../styles/Home.module.css";
import {
  Heading,
  useColorModeValue,
  Text,
  Button,
  Flex,
  Container,
  SimpleGrid,
  Box,
  Divider,
  Img,
  Icon,
  chakra,
  Tooltip,
  Link,
  SkeletonCircle,
  HStack,
  Progress,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { FaHandshake } from "react-icons/fa";
import { FcShare, FcDonate, FcMoneyTransfer } from "react-icons/fc";
import NavBar from "../components/Navbar";

// Mock data to simulate campaign data
const mockCampaigns = [
  {
    id: "1",
    name: "Helping Hands",
    description: "A campaign to help the homeless in New York City.",
    creatorId: "JohnDoe92",
    imageURL: "https://img.freepik.com/premium-vector/helping-hand-concept-gesture-sign-help-hope-two-hands-taking-each-other_158483-1746.jpg",
    balance: "500",
    target: "1000",
    ethPrice: "2000",
  },
  {
    id: "2",
    name: "Tech for Good",
    description: "Providing laptops for underprivileged students.",
    creatorId: "TechieGal88",
    imageURL: "data:image/png;base64,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",
    balance: "750",
    target: "1500",
    ethPrice: "2000",
  },
  // Add more campaigns as needed
];

const CampaignCard = ({
  name,
  description,
  creatorId,
  imageURL,
  id,
  balance,
  target,
  ethPrice,
}) => {
  // Calculate USD values assuming 1 ETH = $2000 for simplicity
  const ethToUsd = (eth) => eth * 2000;

  return (
    <NextLink href={`/campaign/${id}`}>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW={{ md: "sm" }}
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        cursor="pointer"
        transition={"transform 0.3s ease"}
        _hover={{
          transform: "translateY(-8px)",
        }}
      >
        {/* Campaign image */}
        <Img
          src={imageURL}
          alt={`Picture of ${name}`}
          roundedTop="lg"
          objectFit="fill"
          w="800"
          h="200"
        />
        {/* Campaign details */}
        <Box p="6">
          <Flex justifyContent="space-between" alignContent="center">
            <Box fontSize="2xl" fontWeight="semibold" as="h4" isTruncated>
              {name}
            </Box>
            <Tooltip label="Contribute" bg={useColorModeValue("white", "gray.700")} placement={"top"}>
              <chakra.a display={"flex"}>
                <Icon as={FaHandshake} h={7} w={7} alignSelf={"center"} color={"teal.400"} />
              </chakra.a>
            </Tooltip>
          </Flex>
          <Flex alignContent="center">
            <Text color={"gray.500"}>by</Text>
            <Heading size="base" ml={2} isTruncated>
              {creatorId}
            </Heading>
          </Flex>
          <Flex direction="column" py={4}>
            <Text>
              <strong>{balance} ETH</strong> raised of {target} ETH goal
            </Text>
            <Progress colorScheme="teal" size="sm" value={(balance / target) * 100} mt={4} />
            <Text mt={2}>
              ~${ethToUsd(balance)} raised of ~${ethToUsd(target)} goal
            </Text>
          </Flex>
        </Box>
      </Box>
    </NextLink>
  );
};

export default function Home() {
  // Use the mock data as the campaign list
  const [campaignList] = useState(mockCampaigns);

  return (
    <div>
      <Head>
        <title>GreenTokens 🌳</title>
        <meta name="description" content="Crowdfunding Sustainability" />
        {/* <link rel="icon" href="/logo.svg" /> */}
      </Head>
      <main className={styles.main}>
        {/* Main content goes here, utilizing the CampaignCard component with mock data */}
        <Container maxW={"7xl"}>
          <Heading as="h1" mb={6}>
            Crowdfunding Sustainability 🌳
          </Heading>
          {/* Render campaign cards */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            {campaignList.map((campaign) => (
              <CampaignCard key={campaign.id} {...campaign} />
            ))}
          </SimpleGrid>
        </Container>
      </main>
    </div>
  );
}
