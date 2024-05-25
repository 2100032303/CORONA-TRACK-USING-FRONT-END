import React, { useState, useEffect } from "react";
import CountryPicker from "./CountryPicker";
import GlobalData from "./GlobalData";
import Home from "./home"
import axios from "axios";

const CovidMain = () => {
	const [covidData, setCovidData] = useState([]);
	const [covidStats, setCovidStats] = useState([]);
	const getData = async () => {
		try {
			const res = await axios.get(
				'https://covid-193.p.rapidapi.com/countries',
				{
					headers: {
						"x-rapidapi-host":
							'covid-193.p.rapidapi.com',
						"x-rapidapi-key":
							'866bd551d0msh19b6070956c3640p15a8a0jsn889af13b25c4',
					},
				}
			);

			const responce = res.data;
			setCovidData(responce.countries_stat);
			setCovidStats(responce.world_total);
			console.log(responce);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getData();
	}, []);
	return (
		<>
			<div style={{ backgroundImage: 'url("https://png.pngtree.com/background/20230426/original/pngtree-ai-generated-nature-background-picture-image_2486307.jpg")', backgroundSize: 'cover', minHeight: '100vh' }}>
            <GlobalData covidStats={covidStats} />
			<center>
			<button style={{ textAlign: 'center', backgroundColor: 'skyblue', color: 'red', border: 'none', padding: '10px 20px', borderRadius: '5px' }}>
        <a href="https://maharshi1.netlify.app/" style={{ textDecoration: 'none', color: 'inherit' }}>Get Detail</a>
      </button></center><br/>
        </div>
		
		</>
	);
};

export default CovidMain;
