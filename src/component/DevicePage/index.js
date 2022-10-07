import "../Device/style.css";
import "./style.css";

import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {deleteComputer, addTime} from "../../features/computersSlice";
import React, {useEffect, useRef, useState} from "react";
import useEnded from "../../utils/useEnded";
import {getDateFormat} from "../../utils/dateFormat";
const DevicePage = () => {
	const endIt = useEnded();

	const {computers, price} = useSelector(state => state.computers);
	const closeDeleteModalElement = useRef();
	const closeAddTimeModalElement = useRef();
	const inputsInitialState = {
		hours: 0,
		minutes: 0,
		price: 0,
	};

	const [inputs, setInputs] = useState(inputsInitialState);
	const handleInput = e => {
		const value = e.target.value;
		const name = e.target.name;
		setInputs(prevInputs => {
			return {
				...prevInputs,
				[name]: value,
			};
		});
	};

	useEffect(() => {
		const hours = Math.floor(inputs.price / price);
		const minutes = Math.round(((inputs.price / price) * 60) % 60);
		setInputs(prevInputs => {
			return {
				...prevInputs,
				hours: hours,
				minutes: minutes,
			};
		});
	}, [inputs.price, price]);

	const dispatch = useDispatch();
	const {id: deviceIdParam} = useParams();
	const currentComputer = computers.find(computer => {
		return parseInt(computer.id) === parseInt(deviceIdParam);
	});

	const {id, deviceId, name, startedTime, endTime, isEnded} = currentComputer;

	const startedTimeDate = new Date(startedTime);
	const endTimeDate = new Date(endTime);

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

	const deleteDevice = () => {
		closeDeleteModalElement.current.click();
		dispatch(deleteComputer({id}));
	};

	const addTimeToDevice = () => {
		const {hours, minutes} = inputs;
		const endTime =
			(parseFloat(hours) * 60 + parseFloat(minutes)) * 60 * 1000;
		if (deviceId.trim() !== "" && name !== "" && endTime > 0) {
			if (dispatch(addTime({id, endTime}))) {
				closeAddTimeModalElement.current.click();
				setInputs(inputsInitialState);
			}
		}
	};

	return (
		<div className="devices">
			<div
				className="modal fade"
				id="deleteModal"
				tabIndex="-1"
				aria-labelledby="deleteModal"
				aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="deleteModal">
								Delete Device
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"></button>
						</div>

						<div className="modal-body">
							Do You Want To Delete This Device
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
								ref={closeDeleteModalElement}>
								No
							</button>
							<button
								type="button"
								className="btn btn-primary"
								onClick={deleteDevice}>
								Yes
							</button>
						</div>
					</div>
				</div>
			</div>

			<div
				className="modal fade"
				id="addTime"
				tabIndex="-1"
				aria-labelledby="addTime"
				aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="addTime">
								Add Time
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"></button>
						</div>

						<div className="modal-body">
							<div className="mb-3 row">
								<label className="col-form-label col-3">
									Duration:
								</label>
								<div className="col">
									<div className="row">
										<div className="col">
											<input
												type="number"
												className="form-control"
												id="hours"
												name="hours"
												value={inputs.hours}
												onChange={handleInput}
											/>
										</div>
										<div className="col">
											<label className="col-form-label ">
												Hours
											</label>
										</div>
										<div className="col">
											<input
												type="number"
												className="form-control"
												id="minutes"
												name="minutes"
												value={inputs.minutes}
												onChange={handleInput}
											/>
										</div>
										<div className="col">
											<label className="col-form-label">
												Minutes
											</label>
										</div>
									</div>
								</div>
							</div>
							<div className="mb-3 row">
								<label
									htmlFor="price"
									className="col-form-label col-3">
									Price:
								</label>
								<div className="col">
									<input
										type="number"
										className="form-control"
										id="price"
										name="price"
										placeholder="3"
										value={inputs.price}
										onChange={handleInput}
									/>
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
								ref={closeAddTimeModalElement}>
								Close
							</button>
							<button
								type="button"
								className="btn btn-primary"
								onClick={addTimeToDevice}>
								Add
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="device devicePage">
				<div className="deviceTop">
					<div className="deviceId">{deviceId}</div>
					<div className="userName">{name}</div>
					<div
						className="duration"
						style={
							parseInt(minutes) < 1 && parseInt(hours) === 0
								? {color: "#910000"}
								: {}
						}>
						{duration <= 0
							? "Ended"
							: `${hours}:${minutes}:${seconds}`}
					</div>
					<div className="price" style={{marginLeft: "auto"}}>
						{remainPrice} L.E
					</div>
				</div>
				<div className="device-bottom">
					<div className="row mb-5">
						<div className="col-6">
							<div className="start-time">
								<div className="title">Start Time</div>
								<div
									style={{
										marginLeft: "20px",
										fontSize: "20px",
									}}>
									{getDateFormat(startedTimeDate)}
								</div>
							</div>
						</div>
						<div className="col-6">
							<div className="end-time">
								<div className="title">End Time</div>
								<div
									style={{
										marginLeft: "20px",
										fontSize: "20px",
									}}>
									{getDateFormat(endTimeDate)}
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col">
							<div className="actions">
								<div className="title">Actions</div>
								<div
									style={{
										marginLeft: "20px",
										fontSize: "20px",
									}}>
									<div className="row p-3">
										<div className="col">
											<div className="btn-group w-100">
												<button
													data-bs-toggle="modal"
													data-bs-target="#addTime"
													className="btn btn-success"
													title="Add More Time">
													<i className="fa-solid fa-plus"></i>
												</button>

												{!isEnded && (
													<button
														className="btn btn-warning"
														title="End Time"
														onClick={() => {
															endIt(id);
														}}>
														<i className="fa-solid fa-hourglass-end"></i>
													</button>
												)}

												<button
													type="button"
													className="btn btn-danger"
													data-bs-toggle="modal"
													data-bs-target="#deleteModal"
													title="Delete Device">
													<i className="fa-solid fa-trash"></i>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DevicePage;
