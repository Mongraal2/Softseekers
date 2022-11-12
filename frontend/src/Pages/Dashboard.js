import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AllUsers from '../components/AllUsers/AllUsers'
import { Box, Tab, TabList, Tabs, TabPanels, TabPanel, Button, Container } from '@chakra-ui/react';
import UpdateUser from '../components/UpdateUsers/UpdateUser';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/');
    }
    return (
        <Container maxW='xl' centerContent mt="100" >
            <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
                <Button onClick={() => logout()} style={{ position: "absolute", top: "10px", right: "10px", backgroundColor: "red" }}>Logout</Button>
                <Tabs isFitted variant="soft-rounded">
                    <TabList mb="1em">
                        <Tab>All Users</Tab>
                        <Tab>Update Users</Tab>
                    </TabList>
                    <TabPanels >
                        <TabPanel>
                            <AllUsers />
                        </TabPanel>
                        <TabPanel>
                            <UpdateUser />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container >
    )
}

export default Dashboard