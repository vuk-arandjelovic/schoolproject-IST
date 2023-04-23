import React, { useEffect, useState } from "react";
import { Typography, Button, TextField, Stack } from "@mui/material";

const moviesLocal = JSON.parse(localStorage.getItem("movies"))



function MovieAdding(){
    const [movies, setMovies] = useState(moviesLocal)
    const [naziv, setNaziv] = useState();
    const [ocena, setOcena] = useState();
    const [reziser, setReziser] = useState();
    const [trajanje, setTrajanje] = useState();
    const [tride, setTride] = useState();

    const setMoviesHandle = (film) =>{

        setMovies({film, ...movies})
    }

    const dodajFilm = ()=>{
        if(naziv === undefined ||
           ocena === undefined ||
           reziser === undefined ||
           trajanje === undefined ||
           tride === undefined){
            alert("Dodavanje filma neuspesno, morate popuniti sva polja")
            return
        }
        if(naziv.trim().length === 0 || 
        ocena.trim().length === 0 || 
        reziser.trim().length === 0 || 
        trajanje.trim().length === 0 || 
        tride.trim().length === 0){
            alert("Dodavanje filma neuspesno, morate popuniti sva polja")
            return
        }
        console.log(movies)
        console.log(naziv)
        console.log(ocena)
        console.log(reziser)
        console.log(trajanje)
        console.log(tride)
        
        const film = {naziv: naziv, ocena: ocena, reziser: reziser, trajanje: trajanje, tride: tride}
        console.log(film)

        setMoviesHandle(film)
    }
    useEffect(()=>{
        localStorage.setItem("movies", JSON.stringify(movies))
    },[movies])

    return (<>
        <Stack sx={{maxWidth:"800px"}} mx="auto" my="2rem" spacing={2}>
            <Typography variant="h3" gutterBottom mx="auto">Dodavanje Filma</Typography>
            <TextField id="outlined-basic" label="Naziv Filma" variant="outlined" onChange={(newValue)=>setNaziv(newValue.target.value)}></TextField>
            <TextField id="outlined-basic" label="Ocena" variant="outlined" onChange={(newValue)=>setOcena(newValue.target.value)}></TextField>
            <TextField id="outlined-basic" label="Reziser" variant="outlined" onChange={(newValue)=>setReziser(newValue.target.value)}></TextField>
            <TextField id="outlined-basic" label="Trajanje" variant="outlined" onChange={(newValue)=>setTrajanje(newValue.target.value)}></TextField>
            <TextField id="outlined-basic" label="3D" variant="outlined" onChange={(newValue)=>setTride(newValue.target.value)}></TextField>
            <Button variant="contained" onClick={dodajFilm}>Dodaj Film</Button>
        </Stack>

    </>)
}

export default MovieAdding