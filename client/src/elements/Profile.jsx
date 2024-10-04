//client/src/elements/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../api/axiosTokenInterceptor';
import {
    Box,
    Text,
    Spinner,
    Heading,
    Stack,
    Alert,
    AlertIcon,
    FormControl,
    FormLabel,
    Input,
    Button,
    Avatar,
    Center,
    useColorMode
} from '@chakra-ui/react';
import {getTransparentContainerStyle} from "../theme-helper.js";

export const Profile = () => {
    // Initialize the state with empty strings to avoid undefined values
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        profileImage: '',
    });

    const [userEdit, setUserEdit] = useState({
        firstName: '',
        lastName: '',
        email: '',
        profileImage: '',
        password: '', // Initialize password as empty string
    });

    // New state for password confirmation
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { colorMode } = useColorMode();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await authApi.get('/profile');
                setUser({
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    email: data.email || '',
                    profileImage: data.profileImage || '',
                });
                setUserEdit({
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    email: data.email || '',
                    profileImage: data.profileImage || '',
                    password: '', // Ensure password is set to empty initially
                });
                setImagePreview(data.profileImage || '');
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                } else {
                    setError('Error fetching profile');
                }
            }
        };
        fetchProfile();
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserEdit({ ...userEdit, [name]: value });
    };

    const handlePasswordConfirmChange = (e) => {
        const { value } = e.target;
        setPasswordConfirm(value);

        // Check for password match whenever password confirmation changes
        setPasswordsMatch(value === userEdit.password);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setUserEdit({ ...userEdit, profileImage: file });
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSaveProfile = async () => {
        setLoading(true);
        const formData = new FormData();

        // Only include changed fields in `formData`
        if (userEdit.firstName !== user.firstName) formData.append('firstName', userEdit.firstName);
        if (userEdit.lastName !== user.lastName) formData.append('lastName', userEdit.lastName);
        if (userEdit.email !== user.email) formData.append('email', userEdit.email);
        if (userEdit.password) formData.append('password', userEdit.password);
        if (userEdit.profileImage instanceof File) {
            formData.append('profileImage', userEdit.profileImage);
        }

        try {
            const { data } = await authApi.put('/profile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setMessage('Profile updated successfully');
        } catch (error) {
            setError('Error updating profile');
        }
        setLoading(false);
    };

    return (
        <Box {...getTransparentContainerStyle(colorMode)} maxW="sm" mx="auto" mt={8} >
            <Heading size="lg" mb={6} color="purple.300">Profile</Heading>
            {error && (
                <Alert status="error" mb={4}>
                    <AlertIcon />
                    {error}
                </Alert>
            )}
            {message && (
                <Alert status="success" mb={4}>
                    <AlertIcon />
                    {message}
                </Alert>
            )}
            {user ? (
                <Stack spacing={3}>
                    <FormControl>
                        <FormLabel>First Name</FormLabel>
                        <Input
                            name="firstName"
                            value={userEdit.firstName}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Last Name</FormLabel>
                        <Input
                            name="lastName"
                            value={userEdit.lastName}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                            name="email"
                            value={userEdit.email}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>New Password</FormLabel>
                        <Input
                            name="password"
                            type="password"
                            value={userEdit.password}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Confirm New Password</FormLabel>
                        <Input
                            type="password"
                            value={passwordConfirm}
                            onChange={handlePasswordConfirmChange}
                        />
                        {!passwordsMatch && (
                            <Text color="red.500" fontSize="sm">Passwords do not match</Text>
                        )}
                    </FormControl>
                    <FormControl>
                        <FormLabel>Profile Image</FormLabel>
                        <Input type="file" onChange={handleFileChange} />
                    </FormControl>
                    <Center>
                        <Avatar size="xl" src={imagePreview} />
                    </Center>
                    <Button
                        colorScheme="purple"
                        onClick={handleSaveProfile}
                        isLoading={loading}
                        isDisabled={!passwordsMatch} // Disable Save button if passwords do not match
                    >
                        Save
                    </Button>
                </Stack>
            ) : (
                <Spinner size="lg" color="purple.300" />
            )}
        </Box>
    );
};
