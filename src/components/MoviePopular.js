import React from "react";
import { Typography, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles"

const Item = styled(Paper)(({theme}) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FFF',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const filmovi = [{naziv:"Spiderman", ocena:"8.8",reziser:"Mario Vreco",trajanje:"210",tride:"da"},
{naziv:"John Wick", ocena:"9.9",reziser:"Milutin Pavkovic",trajanje:"390",tride:"da"},
{naziv:"Munje O5", ocena:"8.5",reziser:"Nikola Kojo",trajanje:"120",tride:"ne"},
{naziv:"Djavolja Varos", ocena:"6",reziser:"Bogosava Nikolic",trajanje:"155",tride:"na"},
{naziv:"Crni Cerak", ocena:"10",reziser:"Nikola Zdravkovic",trajanje:"69",tride:"da"}]



const topTri = filmovi.sort((a,b)=>(parseInt(a.ocena) > parseInt(b.ocena))?-1:1).slice(0,3)



function MoviePopular(){
    console.log("filmovi")
    console.log(filmovi)
    console.log("top3")
    console.log(topTri)

    return (
    <>
    <Typography variant="h3" gutterBottom my={2} textAlign={"center"}>Naslovna Strana</Typography>
    {filmovi.length > 0 &&
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3}} justifyContent={"space-evenly"} maxWidth={1500} width={'100%'}>
            {/* filtriranje top 3 po ocenama */
            topTri.map((value,index)=>{
            return <Grid key={index} item xs={3}>
                <Item bgcolor='#1A2027'>
                    <Typography gutterBottom variant="h4">{value.naziv}</Typography>
                    <Typography gutterBottom>Ocena: {value.ocena} / 10</Typography>
                    <Typography gutterBottom>Reziser: {value.reziser}</Typography>
                    <Typography gutterBottom>Trajanje: {value.trajanje}min</Typography>
                    <Typography gutterBottom>3D: {value.tride}</Typography>
                </Item>
            </Grid>
            })
            
            
            }
            {/* <Grid item xs={3}><Item>2</Item></Grid>
            <Grid item xs={3}><Item>3</Item></Grid> */}
        </Grid>
    }
    </>
    )
}

export default MoviePopular