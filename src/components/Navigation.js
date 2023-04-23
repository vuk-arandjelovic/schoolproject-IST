import * as React from "react";
import {
	Box,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Menu,
	Container,
	Button,
	MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes";

// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function NavigationBar() {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	// const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	// const handleOpenUserMenu = (event) => {
	//   setAnchorElUser(event.currentTarget);
	// };

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	// const handleCloseUserMenu = () => {
	//   setAnchorElUser(null);
	// };

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<AdbIcon
						sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
					/>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						LOGO
					</Typography>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "flex", md: "none" },
						}}
					>
						<IconButton
							size="large"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{ROUTES.map(
								(page, index) =>
									page?.navItem && (
										<MenuItem
											key={index}
											onClick={handleCloseNavMenu}
										>
											<Typography textAlign="center">
												<Link
													to={page.path}
													style={{
														color: "inherit",
														textDecoration:
															"inherit",
													}}
												>
													{page.title}
												</Link>
											</Typography>
										</MenuItem>
									)
							)}
						</Menu>
					</Box>
					<AdbIcon
						sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
					/>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						LOGO
					</Typography>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
						}}
					>
						{ROUTES.map(
							(page, index) =>
								page?.navItem && (
									<Link
										to={page.path}
										key={index}
										style={{
											color: "inherit",
											textDecoration: "inherit",
										}}
									>
										<Button
											onClick={handleCloseNavMenu}
											sx={{
												my: 2,
												color: "white",
												display: "block",
											}}
										>
											{page.title}
										</Button>
									</Link>
								)
						)}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default NavigationBar;
