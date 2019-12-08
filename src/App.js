import React from "react";
import "./App.css";
import Carlist from "./components/Carlist";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

function App() {
	return (
		<div className="App">
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6">
						<span role="img" aria-label="car" aria-hidden="true">
							🚗
						</span>
						Ulla's Second Hand Car Shop
						<span role="img" aria-label="car" aria-hidden="true">
							🚗
						</span>
					</Typography>
				</Toolbar>
			</AppBar>
			<Carlist />
		</div>
	);
}

export default App;
