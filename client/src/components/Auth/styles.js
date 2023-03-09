import { makeStyles } from "@mui/styles";
export default makeStyles(() => ({
    paper: {
        marginTop: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '18px',
    },
    root: {
        '& .MuiTextField-root': {
            margin: '10px',
        }
    },
    avatar: {
        margin: '10px',
    },
    form: {
        width: '100%',
        marginTop: '20px',
    },
    submit: {
        margin: '20px 0px !important' ,
    },
    googleButton: {
        marginBottom: '10px'
    },
    fileInput: {
        width: '100%',
    },
    fileDiv: {
        margin: '20px 0 2px 0',
    }
}));
