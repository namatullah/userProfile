import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import Auth from "../components/Auth/Auth";
import { useEffect, useState } from "react";
import { Container } from '@mui/material';
import Customers from '../components/Customers/Customers';
import Navbar from './Navbar/Navbar';

function App() {

    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    return (
        <BrowserRouter>
            <Container>
                <Navbar handleDrawerOpen={handleDrawerOpen} open={open} />
                <Routes>
                    <Route path='/' element={<Customers />} />
                    <Route path='/auth' element={<Auth />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;
