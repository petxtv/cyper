import React from "react";
import NavBar from "./NavBar";
import {Outlet} from "react-router-dom";

const HomeWrapper = () => {
	return (
		<>
			<NavBar />
			<div className="container-fluid">
				<Outlet />
			</div>
		</>
	);
};

export default HomeWrapper;
