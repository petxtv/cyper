import React, {useRef} from "react";

import {useDispatch, useSelector} from "react-redux";
import {deleteComputer} from "../../features/computersSlice";

const ClearDevices = () => {
	const dispatch = useDispatch();
	const closeClearModalElement = useRef();

	let {computers} = useSelector(state => state.computers);

	const activeComputers = computers.filter(computer => !computer.isEnded);

	if (activeComputers.length <= 0) {
		return "";
	}

	const clearDevices = () => {
		activeComputers.forEach(computer => {
			dispatch(deleteComputer({id: computer.id}));
		});
		closeClearModalElement.current.click();
	};
	return (
		<div className="clear-devices">
			<button
				className="btn btn-outline-danger text-light  w-100 p-3"
				data-bs-toggle="modal"
				data-bs-target="#clearDevices">
				Clear
			</button>
			<div
				className="modal fade"
				id="clearDevices"
				tabIndex="-1"
				aria-labelledby="clearDevices"
				aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered">
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
							Do You Want To Delete all Devices
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
								ref={closeClearModalElement}>
								No
							</button>
							<button
								type="button"
								className="btn btn-primary"
								onClick={clearDevices}>
								Yes
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ClearDevices;
