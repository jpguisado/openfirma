import React, { useEffect } from 'react';

import { Outlet } from "react-router-dom";

import Header from './components/Header/Index'

function App() {

	useEffect(function () {
		window.AutoScript.cargarAppAfirma();
	}, []);

	return (

		<div className='bg-gray-50 overflow-hidden h-screen'>

			<Header />

			<Outlet/>

		</div>

	)
}

export default App;