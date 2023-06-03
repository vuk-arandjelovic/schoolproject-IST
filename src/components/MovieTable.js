import { useState, useEffect } from "react";
import { Container, Grid, Stack, Rating, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function MoviesTable() {
	const [movies, setMovies] = useState();

	const handleDelete = (id) => {
		const _movies = [...movies].filter((movie) => movie?.id !== id);
		setMovies(_movies)
		localStorage.setItem("movies", JSON.stringify(_movies));
	};

	useEffect(() => {
		setMovies(JSON.parse(localStorage.getItem("movies")));
	}, []);

	const columns = [
		{
			field: "naziv",
			headerName: "Naziv",
			flex: 1,
		},
		{
			field: "ocena",
			headerName: "Ocena",
			width: 160,
			renderCell: (params) => {
				return <Rating readOnly value={params.value || 0} />;
			},
		},
		{
			field: "reziser",
			headerName: "Reziser",
			width: 160,
		},
		{
			field: "trajanje",
			headerName: "Trajanje",
		},
		{
			field: "tride",
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
