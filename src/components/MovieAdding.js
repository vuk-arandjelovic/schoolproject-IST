import React, { useEffect, useState } from "react";
import {
	Typography,
	Button,
	TextField,
	Stack,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Rating,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function MovieAdding({ isEdit }) {
	let { id: currentId } = useParams();
	const navigate = useNavigate();

	const [movie, setMovie] = useState();
	const [error, setError] = useState();

	const handleData = (e, newValue) => {
		setMovie({ ...movie, [e.target.name]: newValue || e.target.value });
	};

	const dodajFilm = async () => {
		if (
			!movie?.title?.trim() ||
			!movie?.director?.trim() ||
			!movie?.length?.toString().trim() ||
			!movie?.rating
		) {
			alert(
				`${
					isEdit ? "Azuriranje" : "Dodavanje"
				} filma neuspesno, morate popuniti sva polja`
			);
			return;
		}
		const is3D = movie?.threeD === "jeste" ? true : false;


		try {
      if (isEdit) {
        await axios.put(`http://localhost:3030/films/${currentId}`, { ...movie, threeD: is3D });
        alert("Film je uspešno ažuriran");
      	navigate("/movies");
      } else {
        await axios.post("http://localhost:3030/films", { ...movie, threeD: is3D });
        alert("Film je uspešno dodat");
        setMovie({});
      }
    } catch (error) {
      console.error(error);
    }
	};

	useEffect(() => {
    const fetchMovie = async () => {
      if (isEdit && currentId) {
        try {
          const response = await axios.get(`http://localhost:3030/films/${currentId}`);
          setMovie(response.data);
          setError(null);
        } catch (error) {
          setError("Film nije pronadjen");
          console.error(error);
        }
      }
    };

    fetchMovie();
  }, [currentId, isEdit]);

	if (error) {
		return (
			<Stack sx={{ maxWidth: "800px" }} mx="auto" my="2rem" spacing={2}>
				<Typography variant="h3" textAlign="center">
					{error}
				</Typography>
			</Stack>
		);
	}

	return (
		<>
			<Stack sx={{ maxWidth: "800px" }} mx="auto" my="2rem" spacing={2}>
				<Typography variant="h3" gutterBottom mx="auto">
					{isEdit ? "Izmeni film" : "Dodavanje Filma"}
				</Typography>
				<TextField
					name="title"
					value={movie?.title || ""}
					label="Naziv Filma"
					variant="outlined"
					onChange={(e) => handleData(e)}
				/>
				<TextField
					name="director"
					value={movie?.director || ""}
					label="Reziser"
					variant="outlined"
					onChange={(e) => handleData(e)}
				/>
				<TextField
					name="length"
					value={movie?.length || ""}
					label="Trajanje"
					variant="outlined"
					onChange={(e) => handleData(e)}
				/>
				<FormControl fullWidth>
					<InputLabel>3D</InputLabel>
					<Select
						name="threeD"
						value={movie?.threeD || ""}
						label="3D"
						variant="outlined"
						onChange={(e) => handleData(e)}
					>
						<MenuItem value="jeste">Jeste</MenuItem>
						<MenuItem value="nije">Nije</MenuItem>
					</Select>
				</FormControl>
				<Stack>
					<InputLabel>Ocena</InputLabel>
					<Rating
						name="rating"
						value={movie?.rating || 0}
						onChange={handleData}
					/>
				</Stack>
				<Button variant="contained" onClick={dodajFilm}>
				{isEdit ? "Izmeni Film" : "Dodaj Film"}
				</Button>
			</Stack>
		</>
	);
}

export default MovieAdding;