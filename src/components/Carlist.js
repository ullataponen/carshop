import React, { useState, useEffect } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import Button from "@material-ui/core/Button";
import Addcar from "./Addcar";
import Editcar from "./Editcar";
import Notifier, { openSnackbar } from "./Notifier";
import { CSVLink } from "react-csv";

export default function Carlist() {
	const [cars, setCars] = useState([]);

	const csvData = cars;

	useEffect(() => fetchData(), []);

	const fetchData = () => {
		fetch("https://carstockrest.herokuapp.com/cars")
			.then(response => response.json())
			.then(data => setCars(data._embedded.cars));
	};

	const deleteCar = link => {
		if (window.confirm("Are you sure to delete?")) {
			fetch(link, { method: "DELETE" })
				.then(res => fetchData())
				.catch(err => console.error(err));
			openSnackbar({ message: "Car deleted successfully" });
		}
	};

	const saveCar = car => {
		fetch("https://carstockrest.herokuapp.com/cars", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(car)
		})
			.then(res => fetchData())
			.catch(err => console.error(err));
		openSnackbar({ message: "Car added successfully" });
	};

	const updateCar = (car, link) => {
		fetch(link, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(car)
		})
			.then(res => fetchData())
			.catch(err => console.error(err));
		openSnackbar({ message: "Car edited successfully" });
	};

	const columns = [
		{
			Header: "Brand",
			accessor: "brand"
		},
		{
			Header: "Model",
			accessor: "model"
		},
		{
			Header: "Color",
			accessor: "color"
		},
		{
			Header: "Fuel",
			accessor: "fuel"
		},
		{
			Header: "Year",
			accessor: "year"
		},
		{
			Header: "Price",
			accessor: "price"
		},
		{
			sortable: false,
			filterable: false,
			width: 100,
			Cell: row => <Editcar updateCar={updateCar} car={row.original} />
		},
		{
			sortable: false,
			filterable: false,
			width: 100,
			accessor: "_links.self.href",
			Cell: row => (
				<Button
					color="secondary"
					size="small"
					onClick={() => deleteCar(row.value)}
				>
					Delete
				</Button>
			)
		}
	];

	return (
		<div>
			<Button
				style={{ marginTop: 20 }}
				variant="contained"
				color="primary"
				href="#contained-buttons"
			>
				<CSVLink
					style={{ color: "#fff", textDecoration: "none" }}
					data={csvData}
				>
					Download CSV
				</CSVLink>
			</Button>
			<Notifier />
			<Addcar saveCar={saveCar} />
			<ReactTable filterable={true} data={cars} columns={columns} />
		</div>
	);
}
