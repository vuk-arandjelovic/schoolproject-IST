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
import { useParams, redirect } from "react-router-dom";

function MovieAdding({ isEdit }) {
	let { id: currentId } = useParams();

	const [movies, setMovies] = useState();
	const [movie, setMovie] = useState();
	const [error, setError] = useState();

	const handleData = (e, newValue) => {
		setMovie({ ...movie, [e.target.name]: newValue || e.target.value });
	};

	const dodajFilm = () => {
		let _movies = movies || [];
		let id = 0;

		if (_movies?.length > 0) {
			id = _movies[_movies?.length - 1].id + 1;
		}

		if (
			!movie?.naziv?.trim() ||
			!movie?.reziser?.trim() ||
			!movie?.trajanje?.trim() ||
			!movie?.ocena
		) {
			alert(
				`${
					isEdit ? "Azuriranje" : "Dodavanje"
				} filma neuspesno, morate popuniti sva polja`
			);
			return;
		}
		const is3D = movie?.tride === "jeste" ? true : false;

		if (isEdit) {
			// eslint-disable-next-line
			_movies = _movies.filter((movie) => movie?.id != currentId);
			const newMovieList = [{ ...movie, tride: is3D }, ..._movies];

			setMovies(newMovieList);
			localStorage.setItem("movies", JSON.stringify(newMovieList));
			redirect("/movies");
			return;
		}

		const newMovieList = [..._movies, { ...movie, tride: is3D, id }];
		setMovies(newMovieList);
		localStorage.setItem("movies", JSON.stringify(newMovieList));

		setMovie({});
	};

	useEffect(() => {
		const moviesLocal = JSON.parse(localStorage.getItem("movies"));
		setMovies(moviesLocal);
	}, []);

	// useEffect(() => {
	// 	localStorage.setItem("movies", JSON.stringify(movies));
	// }, [movies]);

	useEffect(() => {
		if (!currentId || !isEdit) return;
		if (!(movies?.length > 0)) {
			setError("Ne postoje filmovi u bazi");
			return;
		}

		// eslint-disable-next-line
		const _movie = movies?.find((movie) => movie.id == currentId);

		if (!_movie) {
			setError("Film nije pronadjen");
			return;
		}

		setError(null)

		setMovie(_movie);

		// eslint-disable-next-line
	}, [currentId, movies]);

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
					name="naziv"
					value={movie?.naziv || ""}
					label="Naziv Filma"
					variant="outlined"
					onChange={(e) => handleData(e)}
				/>
				<TextField
					name="reziser"
					value={movie?.reziser || ""}
					label="Reziser"
					variant="outlined"
					onChange={(e) => handleData(e)}
				/>
				<TextField
					name="trajanje"
					value={movie?.trajanje || ""}
					label="Trajanje"
					variant="outlined"
					onChange={(e) => handleData(e)}
				/>
				<FormControl fullWidth>
					<InputLabel>3D</InputLabel>
					<Select
						name="tride"
						value={movie?.tride || ""}
						label="3D"
						variant="outlined"
						onChange={(e) => handleData(e)}
					>
						<MenuItem value="jeste">Jeste</MenuItem>
						<MenuItem value="nije">Nije</MenuItem>
					</Select>
				</FormControl>

				{/* <FormControlLabel
					control={
						<Switch
							name="tride"
							value={movie?.tride === "jeste"}
							onChange={(e) => handleData(e)}
						/>
					}
					label="3D"
				/> */}
				<Stack>
					<InputLabel>Ocena</InputLabel>
					<Rating
						name="ocena"
						value={movie?.ocena || 0}
						onChange={handleData}
					/>
				</Stack>
				<Button variant="contained" onClick={dodajFilm}>
					Dodaj Film
				</Button>
			</Stack>
		</>
	);
}

export default MovieAdding;
