import React, { useEffect, useState } from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { createCustomer } from "../../actions/customer";
import ImageCrop from './ImageCrop/ImageCrop';
import CropEasy from '../Crop/CropEasy';

const Form = ({ open, closeForm, customerId }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [fullname, setFullname] = useState('');
    const [surname, setSurname] = useState('');
    const [image, setImage] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [openCrop, setOpenCrop] = useState(false);

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPhotoUrl(URL.createObjectURL(file));
            setOpenCrop(true)
        }
    }

    const [error, setError] = useState({ fullname: false, surname: false });
    const [helperText, setHelperText] = useState({ fullname: '', surname: '', image: t('select_profile_picture') });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createCustomer({ fullname, surname, image }));
        closeForm()
    }

    const handleCancel = () => {
        setFullname('')
        setSurname('')
        setImage('')
        closeForm()
    }
    return (
        openCrop ? (
            <CropEasy {...{ photoUrl, setOpenCrop }} />
        ) : (
            <Dialog open={open} fullWidth>
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
                            label={t('surname')}
                            fullWidth
                            variant="outlined"
                            value={surname}
                            error={error.surname}
                            helperText={helperText.surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                        <label htmlFor='profilePhoto'>
                            <input
                                accept='image/*'
                                id='profilePhoto'
                                type="file"
                                name='image'
                                value={image}
                                onChange={handleChange}
                            />
                        </label>
                    </DialogContent>
                    <DialogActions style={{ padding: '0 25px 20px 20px' }}>
                        <Button variant="contained" size="small" type="submit">{customerId ? t('edit') : t('add')}</Button>
                        <Button variant="contained" size="small" color="error" onClick={handleCancel}>{t('cancel')}</Button>
                    </DialogActions>
                </form>
            </Dialog>
        )

    )
}
export default Form
