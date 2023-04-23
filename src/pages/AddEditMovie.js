import React from "react";
import MovieAdding from "../components/MovieAdding";

function AddEditMovie({ isEdit }) {
	return <MovieAdding isEdit={isEdit} />;
}

export default AddEditMovie;
