import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputRightAddon,
  InputGroup,
  Alert,
  AlertIcon,
  AlertDescription,
  FormHelperText,
  Textarea,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getETHPrice, getETHPriceInUSD } from "../../lib/getETHPrice";

export default function NewCampaign() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [minContriInUSD, setMinContriInUSD] = useState(0);
  const [targetInUSD, setTargetInUSD] = useState(0);
  const [ETHPrice, setETHPrice] = useState(0);

  useState(() => {
    const fetchETHPrice = async () => {
      try {
        const result = await getETHPrice();
        setETHPrice(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchETHPrice();
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    setError(""); // Reset any previous errors
    try {
      console.log("Form data submitted:", data);
      // Simulate a server request or any other logic here.
      // For demonstration, we'll just log the form data to the console.
    } catch (err) {
      setError("An error occurred while submitting the form.");
      console.error(err);
    }
  };

  return (
    <div>
      <Head>
        <title>New Campaign</title>
        <meta name="description" content="Create a new campaign" />
      </Head>

      <main>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Text fontSize={"lg"} color={"teal.400"}>
            <ArrowBackIcon mr={2} />
            <NextLink href="/">Back to Home</NextLink>
          </Text>
          <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Create a New Campaign</Heading>
            </Stack>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl id="campaignName" isRequired>
                  <FormLabel>Campaign Name</FormLabel>
                  <Input {...register("campaignName", { required: true })} placeholder="Campaign Name" isDisabled={isSubmitting} />
                </FormControl>
                <FormControl id="description" isRequired>
                  <FormLabel>Campaign Description</FormLabel>
                  <Textarea {...register("description", { required: true })} placeholder="A brief description of the campaign" isDisabled={isSubmitting} />
                </FormControl>
                <FormControl id="imageURL" isRequired>
                  <FormLabel>Image URL</FormLabel>
                  <Input
                    type="url"
                    {...register("campaignUrl", {
                      required: "URL is required",
                      pattern: {
                        value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                        message: "Please enter a valid URL",
                      },
                    })}
                    placeholder="https://example.com"
                    isDisabled={isSubmitting}
                  />
                  {errors.campaignUrl && (
                    <FormHelperText color="red.500">{errors.campaignUrl.message}</FormHelperText>
                  )}
                </FormControl>
                <FormControl id="minimumContribution" isRequired>
                  <FormLabel>Minimum Contribution Amount (in ETH)</FormLabel>
                  <InputGroup>
                    <Input
                      type="number"
                      step="any"
                      {...register("minimumContribution", { required: true })}
                      placeholder="0"
                      isDisabled={isSubmitting}
                      onChange={(e) => {
                        setMinContriInUSD(parseFloat(e.target.value) * ETHPrice);
                      }}
                    />
                    <InputRightAddon children="ETH" />
                  </InputGroup>
                  {minContriInUSD > 0 && (
                    <FormHelperText>Approx. ${minContriInUSD.toFixed(2)} USD</FormHelperText>
                  )}
                </FormControl>
                <FormControl id="target" isRequired>
                  <FormLabel>Target Amount (in ETH)</FormLabel>
                  <InputGroup>
                    <Input
                      type="number"
                      step="any"
                      {...register("target", { required: true })}
                      placeholder="0"
                      isDisabled={isSubmitting}
                      onChange={(e) => {
                        setTargetInUSD(parseFloat(e.target.value) * ETHPrice);
                      }}
                    />
                    <InputRightAddon children="ETH" />
                  </InputGroup>
                  {targetInUSD > 0 && (
                    <FormHelperText>Approx. ${targetInUSD.toFixed(2)} USD</FormHelperText>
                  )}
                </FormControl>
                {error && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
                  Create Campaign
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </main>
    </div>
  );
}
