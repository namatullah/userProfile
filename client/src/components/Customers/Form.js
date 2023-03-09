import React, { useEffect, useState } from 'react'
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { createCustomer, updateCustomer } from "../../actions/customer";
// import CropEasy from '../Crop/CropEasy';

const Form = ({ open, closeForm, customerId }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    let currentCustomer = useSelector((state) => customerId ? state.customers.customers.find((c) => c._id === customerId) : null);
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    // const [image, setImage] = useState('');
    // const [openCrop, setOpenCrop] = useState(false);
    // const handleChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         setImage(URL.createObjectURL(file));
    //         setOpenCrop(true)
    //     }
    // }
    const [error, setError] = useState({ fullname: false, email: false });
    const [helperText, setHelperText] = useState({ fullname: '', email: '' });
    useEffect(() => {
        if (currentCustomer) {
            setFullname(currentCustomer.fullname);
            setEmail(currentCustomer.email);
        }
    }, [currentCustomer]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (customerId) {
            dispatch(updateCustomer(customerId, { fullname, email }));
        } else {
            dispatch(createCustomer({ fullname, email }));
        }
        setFullname('')
        setEmail('')
        closeForm();
    }

    const handleCancel = () => {
        setFullname('')
        setEmail('')
        closeForm()
    }
    // const closeCrop = () => {
    //     setOpenCrop(false);
    //     console.log('Open: ', open)
    // }
    {/* {openCrop && (
                <CropEasy image={image} setImage={setImage} setOpenCrop={setOpenCrop} openCrop={openCrop} closeCrop={closeCrop} />
            )} */}
    return (
        <Dialog open={open} fullWidth >
            <form onSubmit={handleSubmit}>
                <DialogTitle>{customerId ? t('edit') : t('add')} {t('Customer')}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label={t('fullname')}
                        fullWidth
                        variant="outlined"
                        value={fullname}
                        error={error.fullname}
                        helperText={helperText.fullname}
                        onChange={(e) => setFullname(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label={t('email')}
                        fullWidth
                        type='email'
                        variant="outlined"
                        value={email}
                        error={error.email}
                        helperText={helperText.email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {/* <input
                        accept='image/*'
                        id='profilePhoto'
                        type="file"
                        name='image'
                        value={image}
                        onChange={handleChange}
                    />
                    <Avatar src={image} sx={{ width: 75, height: 75, cursor: 'pointer' }} /> */}
                </DialogContent>
                <DialogActions style={{ padding: '0 25px 20px 20px' }}>
                    <Button variant="contained" size="small" type="submit">{customerId ? t('edit') : t('add')}</Button>
                    <Button variant="contained" size="small" color="error" onClick={handleCancel}>{t('cancel')}</Button>
                </DialogActions>
            </form>
        </Dialog >
    )
}
export default Form
