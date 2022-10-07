import "./style.css";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import useEnded from "../../utils/useEnded";
const Device = ({id, deviceId, name, endTime}) => {
	const endIt = useEnded();

	const {price} = useSelector(state => state.computers);
	const [duration, setDuration] = useState(() =>
		endTime - Date.now() > 0 ? endTime - Date.now() : 0,
	);
	const remainPrice = ((duration / 60 / 60 / 1000) * price).toFixed(2);
	let hours = Math.floor(duration / 60 / 60 / 1000);
	hours = hours < 10 ? "0" + hours : hours;
	let minutes = Math.floor((duration / 60 / 1000) % 60);
	minutes = minutes < 10 ? "0" + minutes : minutes;

	let seconds = Math.floor((duration / 1000) % 60);
	seconds = seconds < 10 ? "0" + seconds : seconds;

	useEffect(() => {
		const interval = setInterval(() => {
			const time = endTime - Date.now();
			if (time > 0) {
				setDuration(endTime - Date.now());
			} else {
				clearInterval(interval);
				endIt(id);
				setDuration(0);
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [endTime, id, endIt]);
	return (
		<Link to={`/device/${id}`}>
			<div className={`device`}>
				<div className="deviceId">{deviceId}</div>
				<div className="userName">{name}</div>
				<div
					className="duration"
					style={
						parseInt(minutes) < 1 && parseInt(hours) === 0
							? {color: "#910000"}
							: {}
					}>
					{duration <= 0 ? "Ended" : `${hours}:${minutes}:${seconds}`}
				</div>
				<div className="price" style={{marginLeft: "auto"}}>
					{remainPrice} L.E
				</div>
			</div>
		</Link>
	);
};

export default Device;
