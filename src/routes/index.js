import { Home, Movies, AddEditMovie } from "../pages";
export const ROUTES = [
	{
		title: "Home",
		path: "/",
		index: true,
		navItem: true,
		component: <Home />,
	},
	{
		title: "Movies",
		path: "/movies",
		navItem: true,
		component: <Movies />,
	},
	{
		title: "Add Movie",
		path: "/add-movie",
		navItem: true,
		component: <AddEditMovie />,
	},
	{
		title: "Edit Movie",
		path: "/movie/:id",
		component: <AddEditMovie isEdit />,
	},
];
