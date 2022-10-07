import {useDispatch} from "react-redux";
import {ended} from "../features/computersSlice";
import {createNotif} from "../features/notificationSlice";
import {useSelector} from "react-redux";
const useEnded = _ => {
	const {computers} = useSelector(state => state.computers);
	const dispatch = useDispatch();

	const end = id => {
		const computer = computers.find(computer => computer.id === id);
		if (!computer.isEnded) {
			dispatch(ended({id}));
			dispatch(createNotif({id}));
		}
	};
	return end;
};

export default useEnded;
