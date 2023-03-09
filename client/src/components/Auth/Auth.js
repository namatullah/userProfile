import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useStyles from './styles'
import FileBase from 'react-file-base64';
import { Avatar, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import Input from "./Input";
import { signIn, signUp } from "../../actions/auth";
import CropEasy from '../Crop/CropEasy';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', image:'' }

const Auth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const classes = useStyles();

    const [showPassword, setShowPasswrod] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [image, setImage] = useState('');
    const [openCrop, setOpenCrop] = useState(false);
    const handleShowPassword = () => setShowPasswrod((showPassword) => !showPassword);

    const handleFileChange = (base64) => {
        setFormData({ ...formData, image: base64 })
        setOpenCrop(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(signUp(formData, navigate));
        } else {
            dispatch(signIn(formData, navigate));
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const switchMode = () => {
        setIsSignup((isSignup) => !isSignup);
        setShowPasswrod(false)
    }

    const closeCrop = () => {
        setOpenCrop(false);
    }

    return (
        <>
            {openCrop && (
                <CropEasy image={image} setImage={setImage} setOpenCrop={setOpenCrop} openCrop={openCrop} closeCrop={closeCrop} />
            )}
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlined />
                    </Avatar>
                    <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {isSignup && (
                                <>
                                    <Input name="firstName" label="First name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last name" handleChange={handleChange} half />
                                </>
                            )}
                            <Input name="email" label="Email address" handleChange={handleChange} type="email" />
                            <Input
                                name="password"
                                label="Password"
                                handleChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                handleShowPassword={handleShowPassword}
                            />
                            {isSignup && <Input
                                name="confirmPassword"
                                label="Repeat password"
                                handleChange={handleChange}
                                type="password"
                            />}
                        </Grid>
                        {isSignup &&
                            <div style={{marginTop: '10px'}}>
                            <FileBase
                                type="file"
                                className={classes.fileInput}
                                multiple={false}
                                onDone={({ base64 }) => handleFileChange(base64)}
                            />
                            </div>
                        }

                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            {isSignup ? 'Sign Up' : 'Sign In'}
                        </Button>
                        <Grid container justifyContent='flex-end'>
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignup ? 'Already have an acount? Sign In' : "Don't have an acount? Sign Up"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </>
    )
}
export default Auth;
