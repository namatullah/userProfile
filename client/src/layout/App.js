import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Auth from "../components/Auth/Auth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toastAction from "./ToastAction/ToastAction";
import Questions from "../components/Customers/Customers";
import { Container } from '@mui/material';
import Image from '../components/Image/Image';
import Crop from '../components/Crop/Crop';
import Customers from '../components/Customers/Customers';
import Navbar from './Navbar/Navbar';

function App() {
    const { responseMessage } = useSelector((state) => state.responseMessage)
    useEffect(() => {
        if (responseMessage) {
            toastAction(responseMessage)
        }
    }, [responseMessage])

    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar handleDrawerOpen={handleDrawerOpen} open={open} />
                <Routes>
                    <Route path='/' element={<Customers />} />
                    <Route path='/image' element={<Image />} />
                    <Route path='/crop' element={<Crop />} />
                    <Route path='/auth' element={<Auth />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;
