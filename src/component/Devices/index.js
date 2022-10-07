import "./style.css";
import Device from "../Device";
import {useSelector} from "react-redux";
const Devices = () => {
	let {computers} = useSelector(state => state.computers);

	const computersElemnts = computers
		.filter(computer => !computer.isEnded)
		.map(computer => {
			return <Device key={computer.id} {...computer} />;
		});

	if (computersElemnts.length <= 0) {
		return <h1 className="noComputers">No Computers</h1>;
	}
	return <>{computersElemnts}</>;
};

export default Devices;
