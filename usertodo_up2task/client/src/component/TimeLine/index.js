import React from 'react'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Container from '@mui/material/Container';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BadgeIcon from '@mui/icons-material/Badge';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { Typography } from '@mui/material';

const timeLineTop = {
    position:"static",
    marginTop:"110px",
}

const TimeLine = () => {
    return (
        <div id="top">
            <Container>
                <Timeline position="alternate" style={timeLineTop}>
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot color="primary">
                                <AssignmentIndIcon />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                            <Typography variant="h6" component="span">
                                Register
                            </Typography>
                            <Typography>If you Want Access</Typography>
                        </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot color="success">
                                <BadgeIcon />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                            <Typography variant="h6" component="span">
                                Login
                            </Typography>
                            <Typography>You can Access page</Typography>
                        </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot color="secondary">
                                <AutoFixHighIcon />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                            <Typography variant="h6" component="span">
                                Change Password
                            </Typography>
                            <Typography>Make Your New Password</Typography>
                        </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot color="primary">
                                <EmojiPeopleIcon/>
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                            <Typography variant="h6" component="span">
                                Add Profile
                            </Typography>
                            <Typography>Upload your profile picture</Typography>
                        </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot color="secondary">
                                <ExitToAppIcon />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                            <Typography variant="h6" component="span">
                                Logout
                            </Typography>
                            <Typography>You can quit Easily</Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </Container>
        </div>
    )
}

export default TimeLine
