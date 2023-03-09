import React, {useState} from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useDispatch} from "react-redux";

const DeleteDialog = ({openDelete, handleCloseDelete, deleteItem, deletedObj, title, description}) => {
    const dispatch = useDispatch();
    const handleDelete = () => {
        if (deletedObj) dispatch(deleteItem(deletedObj));
        handleCloseDelete()
    }
    return (
        <Dialog
            maxWidth="xs"
            open={openDelete}
            onClose={handleCloseDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            half='true'
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            {description && (
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {description}
                    </DialogContentText>
                </DialogContent>
            )}

            <DialogActions style={{padding: '0 25px 20px 20px'}}>
                <Button variant="contained" size="small" color="error" onClick={handleDelete}>yes</Button>
                <Button variant="contained" size="small" onClick={handleCloseDelete}>no</Button>
            </DialogActions>
        </Dialog>
    );
}
export default DeleteDialog
