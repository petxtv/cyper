import "./style.css";
import React from "react";
import Notification from "../Notification";
import {useSelector} from "react-redux";

const Notifications = () => {
	const {notifications} = useSelector(state => state.notifications);
	const {computers} = useSelector(state => state.computers);

	const notificationsElemnts = notifications
		.filter(notification => {
			const computer = computers.find(
				computer => computer.id === notification.deviceId,
			);
			return computer;
		})
		.map(notification => {
			return <Notification key={notification.id} {...notification} />;
		})
		.reverse();

	if (notificationsElemnts.length <= 0) {
		return (
			<div className="notifications">
				<NoNotifications />
			</div>
		);
	}
	return <div className="notifications">{notificationsElemnts}</div>;
};

const NoNotifications = () => {
	return <h1 style={{padding: "10px", color: "white"}}>No Notifications</h1>;
};
export default Notifications;
