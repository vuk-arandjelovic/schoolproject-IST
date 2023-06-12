import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Grid, Paper, Container, Stack, Rating } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

function MoviePopular(){
    const [movies, setMovies] = useState([]);
    const [topTri, setTopTri] = useState([]);

    useEffect(() => {
      axios
        .get("http://localhost:3030/films")
        .then((response) => {
          setMovies(response.data);
          console.log(response)
          console.log(response.data)
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
        });
    }, []);
    console.log(movies)
  
    useEffect(() => {
        const top = movies
          .sort((a, b) => parseInt(b.rating) - parseInt(a.rating))
          .slice(0, 3);
       setTopTri(top)
      }, [movies]);

    return (
    <Container maxWidth="xl">
    <Typography variant="h3" gutterBottom my={2} textAlign={"center"}>Naslovna Strana</Typography>
    {topTri?.length > 0 &&
        <Grid container spacing={2}>
            {
            topTri?.map((value,index)=>{
            return <Grid key={index} item xs={6} md={4}>
                <Paper>
                    <Stack alignItems="center" py={3}>
                    <Typography gutterBottom variant="h4">{value?.title}</Typography>
                    <Typography gutterBottom><Rating readOnly value={value?.rating || 0} /></Typography>
                    <Typography variant="h6" fontWeight={500} gutterBottom>Reziser: {value?.director}</Typography>
                    <Typography gutterBottom>Trajanje: {value?.length}min</Typography>
                    <Typography gutterBottom textAlign={"center"}>
                        3D: {value?.threeD === true? (<CheckIcon color="success" sx={{verticalAlign: "bottom"}}/>):(<CloseIcon color="error" sx={{verticalAlign: "bottom"}}/>)}
                    </Typography>
                    </Stack>
                </Paper>
            </Grid>
            })
            }
        </Grid>
    }
    </Container>
    )
}

export default MoviePopular