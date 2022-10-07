import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	notifications: [],
	count: 0,
	seen: true,
};
const notificationSlice = createSlice({
	name: "notifications",
	initialState,
	reducers: {
		createNotif: (state, {payload}) => {
			state.notifications = [
				...state.notifications,
				{
					id: Date.now(),
					deviceId: payload.id,
					seem: false,
				},
			];
			state.count = state.count += 1;
			state.seen = false;
		},
		deleteNotif: (state, {payload}) => {
			const notifications = state.notifications.filter(
				notif => notif.id !== payload.id,
			);
			state.notifications = notifications;
		},
		markReadUnread: (state, {payload}) => {
			const notif = state.notifications.find(
				notif => notif.id === payload.id,
			);
			notif.seen = !notif.seen;
		},
		opened: state => {
			state.count = 0;
			state.seen = true;
		},
	},
});

export default notificationSlice.reducer;
export const {createNotif, deleteNotif, markReadUnread, opened} =
	notificationSlice.actions;
