import { useState, useEffect } from "react";
import { Container, Grid, Stack, Rating, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

export default function MoviesTable() {
	const [movies, setMovies] = useState();

	const handleDelete = (id) => {
		axios.delete(`http://localhost:3030/films/${id}`)
    .then(() => {
      const updatedMovies = movies.filter((movie) => movie?.id !== id);
      setMovies(updatedMovies);
    })
    .catch((error) => {
      console.error("Error deleting movie:", error);
    });
	};

	useEffect(() => {
		axios.get("http://localhost:3030/films")
    .then((response) => {
			const moviesWithId = response.data.map(movie => ({ ...movie, id: movie._id }));
      setMovies(moviesWithId);
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
    });
	}, []);

	const columns = [
		{
			field: "title",
			headerName: "Naziv",
			flex: 1,
		},
		{
			field: "rating",
			headerName: "Ocena",
			width: 160,
			renderCell: (params) => {
				return <Rating readOnly value={params.value || 0} />;
			},
		},
		{
			field: "director",
			headerName: "Reziser",
			width: 160,
		},
		{
			field: "length",
			headerName: "Trajanje",
		},
		{
			field: "threeD",
			headerName: "3D",
			renderCell: (params) => {
				return (
					<>
						{params.value === true ? (
							<CheckIcon color="success" />
						) : (
							<CloseIcon color="error" />
						)}
					</>
				);
			},
		},
		{
			field: "actions",
			headerName: "",
			width: 250,
			renderCell: (params) => {
				return (
					<Stack direction="row" alignItems="center" gap={1}>
						<Button
							variant="outlined"
							startIcon={<DeleteIcon />}
							color="error"
							onClick={() => handleDelete(params?.row?.id)}
						>
							Obrisi
						</Button>
						<Link to={`/movie/${params?.row?.id}`}>
							<Button
								variant="contained"
								startIcon={<EditIcon />}
								color="primary"
							>
								Izmeni
							</Button>
						</Link>
					</Stack>
				);
			},
		},
	];

	return (
		<Container maxWidth="xl">
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Stack my={6}>
						<DataGrid
							rows={movies || []}
							columns={columns}
							initialState={{
								pagination: {
									paginationModel: {
										pageSize: 15,
									},
								},
							}}
							pageSizeOptions={[15]}
							disableRowSelectionOnClick
						/>
					</Stack>
				</Grid>
			</Grid>
		</Container>
	);
}
