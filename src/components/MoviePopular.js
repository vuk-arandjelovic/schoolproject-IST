import React from "react";
import { Typography, Grid, Paper, Container, Stack } from "@mui/material";


const filmovi = [{naziv:"Spiderman", ocena:"8.8",reziser:"Mario Vreco",trajanje:"210",tride:"da"},
{naziv:"John Wick", ocena:"9.9",reziser:"Milutin Pavkovic",trajanje:"390",tride:"da"},
{naziv:"Munje O5", ocena:"8.5",reziser:"Nikola Kojo",trajanje:"120",tride:"ne"},
{naziv:"Djavolja Varos", ocena:"6",reziser:"Bogosava Nikolic",trajanje:"155",tride:"na"},
{naziv:"Crni Cerak", ocena:"10",reziser:"Nikola Zdravkovic",trajanje:"69",tride:"da"}]



const topTri = filmovi.sort((a,b)=>(parseInt(a.ocena) > parseInt(b.ocena))?-1:1).slice(0,3)



function MoviePopular(){
    
    return (
    <Container maxWidth="xl">
    <Typography variant="h3" gutterBottom my={2} textAlign={"center"}>Naslovna Strana</Typography>
    {filmovi.length > 0 &&
        <Grid container spacing={2}>
            {/* filtriranje top 3 po ocenama */
            topTri.map((value,index)=>{
            return <Grid key={index} item xs={6} md={4}>
                <Paper>
                    <Stack alignItems="center" py={3}>
                    <Typography gutterBottom variant="h4">{value.naziv}</Typography>
                    <Typography gutterBottom>Ocena: {value.ocena} / 10</Typography>
                    <Typography gutterBottom>Reziser: {value.reziser}</Typography>
                    <Typography gutterBottom>Trajanje: {value.trajanje}min</Typography>
                    <Typography gutterBottom>3D: {value.tride}</Typography>
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