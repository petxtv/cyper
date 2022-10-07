import "./style.css";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addComputer} from "../../features/computersSlice";
const AddDevice = () => {
	const dispatch = useDispatch();
	const inputsInitialState = {
		deviceId: "",
		name: "",
		hours: 0,
		minutes: 0,
		price: 0,
	};
	const [inputs, setInputs] = useState(inputsInitialState);

	const {price, computers} = useSelector(state => state.computers);
	const closeModalElement = useRef();
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

	const handleSubmit = () => {
		const {deviceId, name, hours, minutes} = inputs;
		const endTime =
			(parseFloat(hours) * 60 + parseFloat(minutes)) * 60 * 1000;
		if (deviceId.trim() !== "" && name !== "" && endTime > 0) {
			if (dispatch(addComputer({deviceId, name, endTime}))) {
				closeModalElement.current.click();
				setInputs(inputsInitialState);
			}
		}
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

	const checkComp = id => {
		const exist = computers
			.filter(computer => !computer.isEnded)
			.filter(computer => {
				return parseInt(computer.deviceId) === parseInt(id);
			}).length;

		return !exist;
	};

	return (
		<div className="add-device">
			<div className="add-btn">
				<button
					className="btn btn-outline-dark text-light  w-100 p-3"
					data-bs-toggle="modal"
					data-bs-target="#addDeviceModal">
					Add Device
				</button>
				<div
					className="modal fade"
					id="addDeviceModal"
					tabIndex="-1"
					aria-labelledby="addDeviceModalLabel"
					aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered modal-lg">
						<div className="modal-content">
							<div className="modal-header">
								<h5
									className="modal-title"
									id="exampleModalLabel">
									Add Device
								</h5>
								<button
									type="button"
									className="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"></button>
							</div>
							<div className="modal-body">
								<div className="mb-3 row">
									<label
										htmlFor="deviceId"
										className="col-form-label col-3">
										Device Id:
									</label>
									<div className="col">
										{/* <input
											type="email"
											className="form-control"
											id="deviceId"
											name="deviceId"
											placeholder="1"
											value={inputs.deviceId}
											onChange={handleInput}
										/> */}
										<select
											className="form-control"
											value={inputs.deviceId}
											onChange={handleInput}
											name="deviceId">
											<option value="" disabled>
												Select device number
											</option>
											{checkComp("1") && (
												<option value="1">1</option>
											)}
											{checkComp("2") && (
												<option value="2">2</option>
											)}
											{checkComp("3") && (
												<option value="3">3</option>
											)}
											{checkComp("4") && (
												<option value="4">4</option>
											)}
											{checkComp("5") && (
												<option value="5">5</option>
											)}
											{checkComp("6") && (
												<option value="6">6</option>
											)}
											{checkComp("7") && (
												<option value="7">7</option>
											)}
											{checkComp("8") && (
												<option value="8">8</option>
											)}
											{checkComp("9") && (
												<option value="9">9</option>
											)}
										</select>
									</div>
								</div>
								<div className="mb-3 row">
									<label
										htmlFor="name"
										className="col-form-label col-3">
										Name:
									</label>
									<div className="col">
										<input
											type="text"
											className="form-control"
											id="name"
											name="name"
											placeholder="Mohamed"
											value={inputs.name}
											onChange={handleInput}
										/>
									</div>
								</div>
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
									ref={closeModalElement}>
									Close
								</button>
								<button
									type="button"
									className="btn btn-primary"
									onClick={handleSubmit}>
									Save changes
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddDevice;
