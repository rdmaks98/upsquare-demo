import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import React from 'react'

const Blog = () => {
    return (
        <div>
            <Container position="static" style={{marginTop:"40px"}}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container>
                        <Grid item xs={6} md={4}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    height="350"
                                    image="./images/blog.png"
                                    alt="green iguana"
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={6} md={8}>
                            <CardContent>
                                <Typography gutterBottom variant="h4" component="div">
                                    Story
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <h2>Lizards are a widespread group of squamate reptiles, with over 6,000 species.</h2>
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>

                        </Grid>
                    </Grid>
                </Box>
            </Container>
            
        </div>
    )
}

export default Blog
