import "./style.css";
import React from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {getDateFormat} from "../../utils/dateFormat";
import {deleteNotif, markReadUnread} from "../../features/notificationSlice";
const Notification = ({id, deviceId, seen}) => {
	const dispatch = useDispatch();
	const {computers} = useSelector(state => state.computers);

	const computer = computers.find(computer => computer.id === deviceId);
	if (!computer) {
		dispatch(deleteNotif({id}));
		return;
	}
	const date = new Date(computer.endTime);

	const deleteNotification = e => {
		e.preventDefault();
		e.stopPropagation();
		dispatch(deleteNotif({id}));
	};
	const seenNotification = e => {
		e.preventDefault();
		e.stopPropagation();
		dispatch(markReadUnread({id}));
	};
	return (
		<Link to={`/device/${deviceId}`}>
			<div className={`notification ${seen ? "seen" : ""}`}>
				<div className="deviceId">{computer.deviceId}</div>
				<div className="deviceInfo">
					<div className="name">{computer.name}</div>
					<div className="date">{getDateFormat(date)}</div>
				</div>
				<div className="notificationActions">
					{seen ? (
						<button
							className="btn"
							onClick={seenNotification}
							title="Mark unread">
							<i className="fa-solid fa-eye-slash"></i>
						</button>
					) : (
						<button
							className="btn"
							onClick={seenNotification}
							title="Mark as read">
							<i className="fa-solid fa-eye"></i>
						</button>
					)}

					<button
						className="btn"
						onClick={deleteNotification}
						title="Delete It">
						<i className="fa-solid fa-trash"></i>
					</button>
				</div>
			</div>
		</Link>
	);
};

export default Notification;
