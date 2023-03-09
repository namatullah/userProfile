import React, { useEffect, useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CropIcon from '@mui/icons-material/Crop';
import {
    Paper,
    TableContainer,
    TableHead,
    Table,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
    Tooltip, Alert, Avatar
} from "@mui/material";
import Typography from "@mui/material/Typography";
import useStyles from './styles'
import Form from "./Form";
import { deleteCustomer, getCustomers } from "../../actions/customer";
import DeleteDialog from "../DeleteDialog/DeleteDialog";
import CropEasy from '../Crop/CropEasy'

const Customers = () => {
    const { t } = useTranslation();
    const classes = useStyles()
    const dispatch = useDispatch();
    const { customers, isLoading } = useSelector((state) => state.customers);
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [customerId, setCustomerId] = useState(null);
    const openForm = () => {
        setOpen(true);
    };
    const closeForm = (event, reason) => {
        if (reason && reason === "backdropClick") return;
        setCustomerId(null)
        setOpen(false);
    };
    const handleEdit = (id) => {
        setCustomerId(id)
        openForm()
    }

    const handleOpenDelete = (id) => {
        setCustomerId(id)
        setOpenDelete(true);
    };
    const handleCloseDelete = (event, reason) => {
        if (reason && reason === "backdropClick") return;
        setCustomerId(null)
        setOpenDelete(false);
    };

    useEffect(() => {
        dispatch(getCustomers());
    }, []);

    if (!customers) return null;

    return (<>
        {open && (<Form
            open={open}
            closeForm={closeForm}
            customerId={customerId}
        />)}
        {openDelete && (<DeleteDialog
            openDelete={openDelete}
            handleCloseDelete={handleCloseDelete}
            deleteItem={deleteCustomer}
            deletedObj={{ id: customerId }}
            title={t('delete_title')}
            description={t('delete_sub_title')}
        />)}
        <TableContainer component={Paper} raised="true" elevation={6} className={classes.tableMargin}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left" colSpan={5}>
                            <Tooltip title={t('add')} arrow placement="left">
                                <AddIcon color="primary" onClick={openForm} />
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ fontWeight: 'bold' }} align="left">{t('index')}</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }} align="left">{t('profile')}</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }} align="left">{t('fullname')}</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }} align="left">{t('email')}</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }} align="left">{t('action')}</TableCell>
                    </TableRow>
                </TableHead>
                {isLoading ? (<TableBody>
                    <TableRow>
                        <TableCell colSpan={3} align="center">
                            <CircularProgress />
                        </TableCell>
                    </TableRow>
                </TableBody>) : (
                    <>
                        <TableBody>
                            {customers.length > 0 ? (
                                customers.map((customer, index) => (<TableRow key={customer._id}>
                                    <TableCell align="left">{index + 1}</TableCell>
                                    <TableCell align="left">
                                        <div style={{ display: 'flex' }}>
                                            <Avatar sx={{ width: 32, height: 32 }} alt={customer.fullname} src={customer.image}>
                                                {customer.fullname.charAt(0)}
                                            </Avatar>
                                        </div>
                                    </TableCell>
                                    <TableCell align="left">{customer.fullname}</TableCell>
                                    <TableCell align="left">{customer.email}</TableCell>
                                    <TableCell align="left">
                                        <Tooltip title={t('edit')} arrow placement="top">
                                            <EditIcon
                                                color="primary"
                                                fontSize="small"
                                                className={classes.marginRight_8}
                                                onClick={() => handleEdit(customer._id)}
                                            />
                                        </Tooltip>

                                        <Tooltip title={t('delete')} arrow placement="top">
                                            <DeleteIcon
                                                color="error"
                                                fontSize="small"
                                                className={classes.marginRight_8}
                                                onClick={() => handleOpenDelete(customer._id)}
                                            />
                                        </Tooltip>

                                    </TableCell>
                                </TableRow>))
                            ) : (
                                <TableRow>
                                    <TableCell align="left" colSpan={3}>
                                        <Alert severity="info">{t('no_category_registered')}</Alert>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </>
                )}
            </Table>
        </TableContainer>
    </>)
}
export default Customers
