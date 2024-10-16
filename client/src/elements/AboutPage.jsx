//client/src/elements/AboutPage.jsx
import { useEffect, useState }  from 'react';
import { Box, Text, Flex, Grid, GridItem, Link, Image, Button, useColorModeValue  } from "@chakra-ui/react";
import { ArrowForwardIcon } from '@chakra-ui/icons';
import {FiGithub, FiLinkedin, FiMail} from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';

export const AboutPage = () => {
    const [iconRotation, setIconRotation] = useState('-45deg'); // Rotate arrow

    // Use color mode values for background and text/icon colors
    const bgColor = useColorModeValue("#EFEFEF", "#141414");
    const buttonBgColor = useColorModeValue("#141414", "#EFEFEF");
    const buttonTextColor = useColorModeValue("#EFEFEF", "#141414");

    return (
        <>

            {/* "Free your mind from unnecessary worries" */}
            <Box
                height="100vh"
                display="flex"
                flexDirection={"column"}
                justifyContent="center"
                alignItems="center"
                bg="transparent"
            >
                <Text
                    fontSize={{ base: "60px", md: "80px", lg: "100px" }}  // Custom font sizes
                    textAlign="center"
                    maxW="1000px"
                    fontFamily="Anton, sans-serif"
                    fontWeight="700"
                >
                    Free your mind from unnecessary worries

                </Text>
                <Text
                    bg={bgColor}
                    fontSize={{ base: "10px", md: "30px", lg: "50px" }}
                    fontFamily="Roboto Condensed, sans-serif"  // Roboto Condensed font applied
                    fontWeight="100"  // Thin weight
                >Organize your day with a simple tool</Text>

                {/* Button added below the text */}
                <RouterLink to="/login">
                <Button
                    mt="20px"  // Add margin to separate it from the text
                    rightIcon={
                        <Box
                            bg={buttonTextColor}   // White background for the circle
                            borderRadius="50%"  // Makes the box a circle
                            p="1px"  // Padding inside the circle
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <ArrowForwardIcon
                                color={buttonBgColor}  // Arrow color to match background
                                style={{ transform: 'rotate(-45deg)' }}  // Rotate arrow to match example
                            />
                        </Box>
                    }
                    borderRadius="8px"  // Slightly rounded borders for the rectangular button
                    size="lg"  // Large size for the button
                    bg={buttonBgColor}  // Custom background color to match the image style
                    color={buttonTextColor}  // Text color
                    _hover={{ bg: "#000" }}  // Hover effect
                >
                    Get started
                </Button>
                </RouterLink>
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

                <Flex justifyContent="center" mt="10px">
                    <Text style={{ opacity: 0.7 }} _hover={{ opacity: 1 }} >Connect:</Text>
                    <Link href="https://github.com/hanna-melnyk" mx="10px" isExternal>
                        <FiGithub size={24} style={{ opacity: 0.7 }} _hover={{ opacity: 1 }} />
                    </Link>

                    <Link href="https://www.linkedin.com/in/hanna--melnyk/" mx="10px" isExternal>
                        <FiLinkedin size={24} style={{ opacity: 0.7 }} _hover={{ opacity: 1 }} />
                    </Link>

                    <Link href="mailto:hanna.melnk@gmail.com" mx="10px">
                        <FiMail size={24} style={{ opacity: 0.7 }} _hover={{ opacity: 1 }} />
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
