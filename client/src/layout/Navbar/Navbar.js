import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import AccountMenu from './AccountMenu';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Typography component={Link} to="/" variant='h2' color='white' align='center'>Memories</Typography>
                    </Box>

                    <AccountMenu />
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
