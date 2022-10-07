import React from "react";
import {useSelector} from "react-redux";
import {useParams, Navigate} from "react-router-dom";
const ProtectedDevicePage = ({children}) => {
	const {id: deviceIdParam} = useParams();
	const {computers} = useSelector(state => state.computers);
	const currentComputer = computers.find(computer => {
		return parseInt(computer.id) === parseInt(deviceIdParam);
	});
	if (currentComputer === undefined) {
		return <Navigate to={"/"} />;
	}

	return children;
};

export default ProtectedDevicePage;
