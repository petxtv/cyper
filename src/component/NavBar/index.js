import "./style.css";
import {NavLink, Link} from "react-router-dom";
import Notifications from "../Notifications";
import {useSelector, useDispatch} from "react-redux";
import {opened} from "../../features/notificationSlice";
const NavBar = () => {
	const dispatch = useDispatch();
	const {count, seen} = useSelector(state => state.notifications);

	const openNotifs = () => {
		dispatch(opened());
	};
	return (
		<nav className="navbar navbar-expand-md navbar-dark bg-dark">
			<div className="container">
				<div
					className="collapse navbar-collapse"
					id="navbarSupportedContent">
					<Link className="navbar-brand" to="/">
						Cyper
					</Link>
					<ul className="navbar-nav me-auto">
						<li className="nav-item">
							<NavLink
								className="nav-link"
								aria-current="page"
								to="/">
								Home
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/history">
								History
							</NavLink>
						</li>
					</ul>
				</div>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="d-flex align-items-center" onClick={openNotifs}>
					<div className="dropdown">
						<button
							className="btn link-light"
							type="button"
							data-bs-toggle="dropdown"
							aria-expanded="false">
							{!seen && (
								<span className="position-absolute translate-middle badge rounded-pill bg-danger">
									{count}
									<span className="visually-hidden">
										unread messages
									</span>
								</span>
							)}

							<i className="fa-solid fa-bell"></i>
						</button>
						<div className="dropdown-menu dropdown-menu-dark dropdown-menu-end p-0">
							<Notifications />
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
