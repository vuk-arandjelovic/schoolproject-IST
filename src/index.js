import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Layout, NoPage} from "./pages";
import React from "react";
import { ROUTES } from "./routes/index";

export default function App() {
	return (
		<React.StrictMode>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						{ROUTES.map((route, index) => (
							<Route
								key={index}
								index={route?.index}
                path={route?.path}
								element={route?.component}
							/>
						))}
						<Route path="*" element={<NoPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</React.StrictMode>
	);
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
// ReactDOM.render(<App />, document.getElementById("root"));
