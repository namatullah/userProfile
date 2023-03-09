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
import { useDispatch, useSelector } from "react-redux";
import { createCustomer, createQuestion } from "../../actions/customer";

const Form = ({ open, closeForm, questionId }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [postData, setPostData] = useState({ name: '', surname: '', image: '' });

    const [error, setError] = useState({ name: false, surname: false });
    const [helperText, setHelperText] = useState({ name: '', surname: '', image: t('select_profile_picture') });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createCustomer(postData));
    }

    const handleCancel = () => {
        setPostData({ name: '', surname: '', image: '' })
        closeForm()
    }
    return (
        <Dialog open={open} fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>{questionId ? t('edit') : t('add')} {t('Customer')}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label={t('fullname')}
                        fullWidth
                        variant="outlined"
                        value={postData.fullname}
                        error={error.fullname}
                        helperText={helperText.fullname}
                        onChange={(e) => setPostData({ ...postData, fullname: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label={t('surname')}
                        fullWidth
                        variant="outlined"
                        value={postData.surname}
                        error={error.surname}
                        helperText={helperText.surname}
                        onChange={(e) => setPostData({ ...postData, surname: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        type="file"
                        fullWidth
                        variant="outlined"
                        value={postData.image}
                        error={error.image}
                        helperText={helperText.image}
                        onChange={(e) => setPostData({ ...postData, image: e.target.value })}
                    />
                </DialogContent>
                <DialogActions style={{ padding: '0 25px 20px 20px' }}>
                    <Button variant="contained" size="small" type="submit">{questionId ? t('edit') : t('add')}</Button>
                    <Button variant="contained" size="small" color="error" onClick={handleCancel}>{t('cancel')}</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}
export default Form
