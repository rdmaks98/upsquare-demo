import React from 'react';
import { BottomNavigation,Typography } from "@mui/material";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
const Footer = () => {
    return (
        <div style={{ padding: "28px", maginTop: "20px" }}>
            <BottomNavigation sx={{ width: 1000 }}>
                <Typography variant="button" gutterBottom display="block" style={{marginLeft:"290px"}}>
                   Copyright © 2022 User functinality
                    &nbsp;&nbsp;<a href="#top"><ArrowCircleUpIcon color="secondary" /></a>
                </Typography>
                
            </BottomNavigation>
            
        </div>
    )
}

export default Footer
