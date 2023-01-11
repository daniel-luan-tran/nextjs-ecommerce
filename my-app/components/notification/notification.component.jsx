import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React, { useEffect, useState } from 'react';

export const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
//type = "success", isOpen = false

export const Notification = ({isOpen, type, trigger}) => {
    const [open, setOpen] = useState(false);
    
    useEffect(()=>{
        setOpen(isOpen);
    },[])

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical:"top", horizontal:"center" }}>
                <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                {
                    type == "success" ? "Success!" 
                    : type == "error" ? "Error!" 
                    : type == "warning" ? "Warning!" 
                    : type == "info" ? "Information!" 
                    : "Success!"
                }
                </Alert>
            </Snackbar>
        </Stack>
    );
    {/* <Alert severity="error">This is an error message!</Alert>
    <Alert severity="warning">This is a warning message!</Alert>
    <Alert severity="info">This is an information message!</Alert>
    <Alert severity="success">This is a success message!</Alert> */}
    // type == "success" ? "This is a success message!" 
    // : type == "error" ? "This is an error message!" 
    // : type == "warning" ? "This is a warning message!" 
    // : type == "info" ? "This is an information message!" 
    // : "This is a success message!"
}