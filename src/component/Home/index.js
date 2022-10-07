import "./style.css";
import Devices from "../Devices";
import AddDevice from "../AddDevice";
import ClearDevices from "../ClearDevices";
import {useDispatch} from "react-redux";
import {changeSortType, sortTypes} from "../../features/computersSlice";
import {useEffect} from "react";
const Home = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(changeSortType({sortType: sortTypes.DURATION}));
	}, [dispatch]);
	return (
		<div className="devices">
			<Devices />
			<AddDevice />
			<ClearDevices />
		</div>
	);
};

export default Home;
