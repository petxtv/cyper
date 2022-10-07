import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import DevicePage from "./component/DevicePage";
import History from "./component/History";
import Home from "./component/Home";
import HomeWrapper from "./component/HomeWrapper";
import ProtectedDevicePage from "./component/ProtectedDevicePage";
import {sort} from "./features/computersSlice";

function App() {
	const {computers, sortType} = useSelector(state => state.computers);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(sort({sortType: sortType}));
	}, [computers, dispatch, sortType]);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomeWrapper />}>
					<Route index element={<Home />} />
					<Route path="history" element={<History />} />
					<Route
						path="/device/:id"
						element={
							<ProtectedDevicePage>
								<DevicePage />
							</ProtectedDevicePage>
						}
					/>
				</Route>
				<Route path="*" element={<Navigate to={"/"} />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
