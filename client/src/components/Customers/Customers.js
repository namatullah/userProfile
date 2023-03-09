import React, { useEffect, useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Paper,
    TableContainer,
    TableHead,
    Table,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
    Tooltip, Alert
} from "@mui/material";
import Typography from "@mui/material/Typography";
import useStyles from './styles'
import { deleteQuestion, getCustomers, getQuestions } from "../../actions/customer";
import Form from "./Form";
import DeleteDialog from "../DeleteDialog/DeleteDialog";

const Customers = () => {
    const { t } = useTranslation();

    const classes = useStyles()

    const dispatch = useDispatch();
    const { questions, isLoading } = useSelector((state) => state.customers);
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [questionId, setQuestionId] = useState(null);
    const openForm = () => {
        setOpen(true);
    };
    const closeForm = (event, reason) => {
        if (reason && reason === "backdropClick") return;
        setQuestionId(null)
        setOpen(false);
    };
    const handleEdit = (id) => {
        setQuestionId(id)
        openForm()
    }

    const handleOpenDelete = (id) => {
        setQuestionId(id)
        setOpenDelete(true);
    };
    const handleCloseDelete = (event, reason) => {
        if (reason && reason === "backdropClick") return;
        setQuestionId(null)
        setOpenDelete(false);
    };


    useEffect(() => {
        dispatch(getCustomers());
    }, []);

    if (!questions) return null;

    return (<>
        {open && (<Form
            open={open}
            closeForm={closeForm}
            questionId={questionId}
        />)}
        {/* {openDelete && (<DeleteDialog
            openDelete={openDelete}
            handleCloseDelete={handleCloseDelete}
            deleteItem={deleteQuestion}
            deletedObj={{ id: questionId }}
            title={t('are_you_sure_to_delete_this_category')}
            description={t('after_deletion_you_can_not_see_this_category_and_sub_categories')}
        />)} */}
        <TableContainer component={Paper} raised="true" elevation={6} className={classes.tableMargin}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left" colSpan={3}>
                            <div className={classes.header}>
                                <Typography variant="subtitle1" gutterBottom>{t('questionCategories')}</Typography>
                                <Tooltip title={t('add')} arrow placement="left">
                                    <AddIcon color="primary" onClick={openForm} />
                                </Tooltip>
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ fontWeight: 'bold' }} align="left">{t('index')}</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }} align="left">{t('categories')}</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }} align="left">{t('actions')}</TableCell>
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
                            {questions.length > 0 ? (
                                questions.map((question, index) => (<TableRow key={question._id}>
                                    <TableCell align="left">{index + 1}</TableCell>
                                    <TableCell align="left">{question.subCategory.name}</TableCell>
                                    <TableCell align="left">{question.question}</TableCell>
                                    <TableCell align="left">
                                        <Tooltip title={t('edit')} arrow placement="top">
                                            <EditIcon
                                                color="primary"
                                                fontSize="small"
                                                className={classes.marginRight_8}
                                                onClick={() => handleEdit(question._id)}
                                            />
                                        </Tooltip>

                                        <Tooltip title={t('delete')} arrow placement="top">
                                            <DeleteIcon
                                                color="error"
                                                fontSize="small"
                                                className={classes.marginRight_8}
                                                onClick={() => handleOpenDelete(question._id)}
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
