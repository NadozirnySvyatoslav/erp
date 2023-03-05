import React, { useEffect, useState } from "react";
import FastAPIClient from "../../../client";
import config from "../../../config";
import DashboardHeader from "../../../components/DashboardHeader";
import Footer from "../../../components/Footer";
import jwtDecode from "jwt-decode";
import * as moment from "moment";
import { NotLoggedIn } from "../../error-page/NotLoggedIn";
import Loader from "../../../components/Loader";
import Login from '../../login';


const client = new FastAPIClient(config);

const AdminDashboard = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [error, setError] = useState({ label: "", url: "", source: "" });
	const [recipeForm, setRecipeForm] = useState({
		label: "",
		url: "https://",
		source: "",
	});

	const [showForm, setShowForm] = useState(false);
	const [recipes, setRecipes] = useState([]);

	const [loading, setLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(true);

    useEffect(() => {
            setRefreshing(false);
    }, []);


    useEffect(() => {
		const tokenString = localStorage.getItem("token");
		if (tokenString) {
			const token = JSON.parse(tokenString);
			const decodedAccessToken = jwtDecode(token.access_token);
			if (moment.unix(decodedAccessToken.exp).toDate() > new Date()) {
				setIsLoggedIn(true);
			}
		}
	}, []);

	if (refreshing) return !isLoggedIn ? <Login /> : <Loader />;

	return (
		<>
			<section
				className="flex flex-col"
				style={{ minHeight: "100vh" }}
			>
				<DashboardHeader />
				<div className="container px-5 pt-6 text-center mx-auto lg:px-20">
						{/*TODO - move to component*/}
					<h1 className="mb-12 text-3xl font-medium">
						Панель адміністрування
					</h1>
<div class="list-group">
  <a href="/admin/users" class="list-group-item list-group-item-action">Користувачі</a>
  <a href="/personal/human" class="list-group-item list-group-item-action">Особовий склад</a>
  <a href="#" class="list-group-item list-group-item-action">Майно особового складу</a>
  <a href="#" class="list-group-item list-group-item-action">Зброя особового складу</a>
  <a href="#" class="list-group-item list-group-item-action">Майно підрозділів</a>
  <a href="#" class="list-group-item list-group-item-action">Автомобілі</a>
</div>
				</div>
				<Footer />
			</section>
		</>
	);
};

export default AdminDashboard;
