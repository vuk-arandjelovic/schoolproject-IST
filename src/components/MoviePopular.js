import React from "react";
import { Typography, Grid, Paper, Container, Stack, Rating } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

// const movies = [{naziv:"Spiderman", ocena:"8.8",reziser:"Mario Vreco",trajanje:"210",tride:"da"},
// {naziv:"John Wick", ocena:"9.9",reziser:"Milutin Pavkovic",trajanje:"390",tride:"da"},
// {naziv:"Munje O5", ocena:"8.5",reziser:"Nikola Kojo",trajanje:"120",tride:"ne"},
// {naziv:"Djavolja Varos", ocena:"6",reziser:"Bogosava Nikolic",trajanje:"155",tride:"na"},
// {naziv:"Crni Cerak", ocena:"10",reziser:"Nikola Zdravkovic",trajanje:"69",tride:"da"}]
function MoviePopular(){
    const movies = JSON.parse(localStorage.getItem("movies"))
    const topTri = movies?.sort((a,b)=>(parseInt(a.ocena) > parseInt(b.ocena))?-1:1).slice(0,3)

    return (
    <Container maxWidth="xl">
    <Typography variant="h3" gutterBottom my={2} textAlign={"center"}>Naslovna Strana</Typography>
    {topTri?.length > 0 &&
        <Grid container spacing={2}>
            {
            topTri.map((value,index)=>{
            return <Grid key={index} item xs={6} md={4}>
                <Paper>
                    <Stack alignItems="center" py={3}>
                    <Typography gutterBottom variant="h4">{value?.naziv}</Typography>
                    <Typography gutterBottom><Rating readOnly value={value?.ocena || 0} /></Typography>
                    <Typography variant="h6" fontWeight={500} gutterBottom>Reziser: {value?.reziser}</Typography>
                    <Typography gutterBottom>Trajanje: {value?.trajanje}min</Typography>
                    <Typography gutterBottom textAlign={"center"}>
                        3D: {value?.tride === true? (<CheckIcon color="success" sx={{verticalAlign: "bottom"}}/>):(<CloseIcon color="error" sx={{verticalAlign: "bottom"}}/>)}
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