import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {sortTypes, changeSortType} from "../../features/computersSlice";
import Device from "../Device";
import "./style.css";

const History = () => {
	const dispatch = useDispatch();
	let {computers} = useSelector(state => state.computers);
	const computersElemnts = computers.map(computer => {
		return <Device key={computer.id} {...computer} />;
	});
	useEffect(() => {
		dispatch(changeSortType({sortType: sortTypes.STARTTIME}));
	}, [dispatch]);
	return (
		<div className="devices">
			{computersElemnts.length <= 0 ? (
				<h1 className="noComputers">No Computers</h1>
			) : (
				computersElemnts
			)}
		</div>
	);
};

export default History;
