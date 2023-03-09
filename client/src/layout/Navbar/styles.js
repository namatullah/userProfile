import { makeStyles } from "@mui/styles";
export default makeStyles(() => ({
    projectTitle: {
        marginRight: 2,
        paddingTop:'3px',
        display: {xs: 'none', md: 'flex'},
        fontFamily: 'monospace',
        fontWeight: 900,
        color: 'inherit',
        textDecoration: 'none',
        letterSpacing: '0.4rem !important'
    },
    spaceBetween: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));
