import {createSlice} from "@reduxjs/toolkit";

export const sortTypes = {
	ORDER: "order",
	DURATION: "duration",
	STARTTIME: "startTime",
};
const initialState = {
	computers: [],
	amount: 0,
	totalPrice: 0,
	sortType: sortTypes.DURATION,
	price: 4,
};

const computersSlice = createSlice({
	name: "computers",
	initialState,
	reducers: {
		ended: (state, {payload}) => {
			const device = state.computers.find(item => {
				return item.id === payload.id;
			});
			if (!device.isEnded) {
				device.endTime = Date.now() - 2000;

				device.isEnded = true;
			}
		},
		sort: (state, {payload}) => {
			if (payload.sortType === sortTypes.DURATION) {
				state.computers.sort((a, b) => a.endTime - b.endTime);
			} else if (payload.sortType === sortTypes.ORDER) {
				state.computers.sort((a, b) => a.deviceId - b.deviceId);
			} else if (payload.sortType === sortTypes.STARTTIME) {
				state.computers.sort((a, b) => b.startedTime - a.startedTime);
			}
		},
		changeSortType: (state, {payload}) => {
			state.sortType = payload.sortType;
		},
		addComputer: (state, {payload}) => {
			state.computers = [
				...state.computers,
				{
					id: Date.now(),
					deviceId: payload.deviceId,
					name: payload.name,
					startedTime: Date.now(),
					endTime: Date.now() + payload.endTime,
					isEnded: false,
				},
			];
			state.amount = state.amount + 1;
			state.totalPrice +=
				(payload.endTime / 1000 / 60 / 60) * state.price;
		},
		deleteComputer: (state, {payload}) => {
			const devices = state.computers.filter(item => {
				return item.id !== payload.id;
			});
			state.computers = devices;
		},
		clearComputers: state => {
			state.computers = [];
		},
		addTime: (state, {payload}) => {
			const device = state.computers.find(item => {
				return item.id === payload.id;
			});

			state.totalPrice +=
				(payload.endTime / 1000 / 60 / 60) * state.price;

			device.endTime = device.endTime + payload.endTime;
			device.isEnded = false;
		},
	},
});
export const {
	ended,
	sort,
	changeSortType,
	addComputer,
	deleteComputer,
	clearComputers,
	addTime,
} = computersSlice.actions;
export default computersSlice.reducer;
