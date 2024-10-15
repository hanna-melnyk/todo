//client/src/elements/AboutPage.jsx
import React from 'react';
import { Box, Text, Flex, Grid, GridItem, Link, Image } from "@chakra-ui/react";
// import { ReactComponent as BrainSvg } from '../assets/brain-illustration-4-svgrepo-com.svg';

export const AboutPage = () => {
    return (
        <>
            {/* First Viewport: "How many tasks" */}
            <Box
                height="100vh"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                bg="transparent"
                textAlign="center"
            >
                {/* First Line: Large Text "How many tasks" */}
                <Text
                    fontSize={{ base: "60px", md: "80px", lg: "120px" }}  // Very large font size
                    fontFamily="Oswald, sans-serif"
                    fontWeight="800"
                    lineHeight="1.2"  // Adjust line height for better spacing
                >
                    How many tasks
                </Text>

                {/* Second Line: Two containers side by side */}
                <Flex
                    justifyContent="center"
                    alignItems="center"
                    mt={5}  // Margin top to separate the second line
                    gap={10}  // Gap between the text and the brain image
                >
                    {/* Left Container: Text "are on your mind right now?" */}
                    <Text
                        fontSize={{ base: "24px", md: "36px", lg: "48px" }}  // Smaller font size for the second line
                        fontFamily="Oswald, sans-serif"
                        fontWeight="700"
                    >
                        are on your mind right now?
                    </Text>

                    {/* Right Container: Brain SVG Image */}
                    {/*<BrainSvg width="100%" height="100%" />*/}
                </Flex>
            </Box>

            {/* Second Viewport: "Organize your day with a simple tool" */}
            <Box
                height="100vh"
                display="flex"
                justifyContent="center"
                alignItems="center"
                bg="transparent"
            >
                <Text
                    fontSize={{ base: "60px", md: "80px", lg: "100px" }}  // Custom font sizes
                    textAlign="center"
                    maxW="1000px"
                    fontFamily="Oswald, sans-serif"
                    fontWeight="700"
                >
                    Organize your day with a simple tool
                </Text>
            </Box>

            {/* Third Viewport: "Free your mind from unnecessary worries" */}
            <Box
                height="100vh"
                display="flex"
                justifyContent="center"
                alignItems="center"
                bg="transparent"
            >
                <Text
                    fontSize={{ base: "60px", md: "80px", lg: "100px" }}  // Custom font sizes
                    textAlign="center"
                    maxW="1000px"
                    fontFamily="Oswald, sans-serif"
                    fontWeight="700"
                >
                    Free your mind from unnecessary worries
                </Text>
            </Box>

            {/* Features Section */}
            <Box
                bg="#F46036"
                color="white"
                py="50px"
                px="20px"
                height="100vh"
                display="flex"
                borderTopLeftRadius={{ base: "50px", md: "100px", lg: "150px" }}  // Responsive radius
                borderTopRightRadius={{ base: "50px", md: "100px", lg: "150px" }}
            >
                <Box maxW="1200px"
                     mx="auto"
                     px={{ base: "20px", md: "40px", lg: "60px" }}
                >
                    <Text fontSize="3xl" mb="40px">
                        Why our app?
                    </Text>
                    <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={6}>
                        <FeatureBox
                            title="User-centered"
                            description="We put the user at the center of our development process, adjusting as much as possible to their needs."
                        />
                        <FeatureBox
                            title="Creative"
                            description="We are passionate about product design. That's why we look for unordinary ways to engage with the user."
                        />
                        <FeatureBox
                            title="Reliable"
                            description="We make sure the user always has access to our service by using only reliable technologies."
                        />
                        <FeatureBox
                            title="Innovative"
                            description="We constantly rethink and evolve, adding new features to the product."
                        />
                    </Grid>
                </Box>
            </Box>

            {/* Footer Section */}
            <Box bg="gray.800" color="white" py="20px" textAlign="center">
                <Text fontSize="lg">Contact us:</Text>
                <Flex justifyContent="center" mt="10px">
                    <Link href="https://facebook.com" mx="10px">
                        Facebook
                    </Link>
                    <Link href="https://twitter.com" mx="10px">
                        Twitter
                    </Link>
                    <Link href="https://instagram.com" mx="10px">
                        Instagram
                    </Link>
                    <Link href="mailto:info@yourapp.com" mx="10px">
                        Email
                    </Link>
                </Flex>
            </Box>
        </>
    );
};

// Reusable FeatureBox component
const FeatureBox = ({ title, description }) => {
    return (
        <GridItem
            bg="rgba(255, 255, 255, 0.1)"
            borderRadius="10px"
            padding="20px"
            backdropFilter="blur(10px)"
        >
            <Text fontSize="2xl" mb="10px">
                {title}
            </Text>
            <Text fontSize="md">{description}</Text>
        </GridItem>
    );
};
