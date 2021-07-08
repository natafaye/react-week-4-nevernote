import React, { useState } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Settings from './components/Settings';
import Home from './components/Home';
import NotesList from './components/Notes/NotesList';
import NotFound from './components/NotFound';
import ConfirmModal from './components/ConfirmModal';

export default function App() {

	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
	const [confirmMessage, setConfirmMessage] = useState("");
	const [confirmButtonLabel, setConfirmButtonLabel] = useState("");
	const [onConfirm, setOnConfirm] = useState(() => () => {});

	const toggleConfirmModal = () => setIsConfirmModalOpen(prevIsOpen => !prevIsOpen);

	const startConfirm = (message, buttonLabel, handleConfirm) => {
		setConfirmMessage(message);
		setConfirmButtonLabel(buttonLabel);
		setOnConfirm(() => handleConfirm);
        toggleConfirmModal();
    }

	return (
		<React.Fragment>
			<Navbar bg="success" variant="dark" sticky="top" expand="true" className="flex-md-nowrap">
				<Navbar.Brand as={NavLink} className="ms-3" to="/">Nevernote</Navbar.Brand>
				<Nav>
					<Nav.Link as={NavLink} className="float-end me-3" to="/settings">Settings</Nav.Link>
				</Nav>
			</Navbar>
			<div className="bg-light sidebar">
				<div className="position-sticky pt-3">
					<Nav className="flex-column">
						<Nav.Item>
							<Nav.Link as={NavLink} to="/notes">Notes</Nav.Link>
						</Nav.Item>
					</Nav>
				</div>
			</div>
			<div className="main">
				<Switch>
					<Route exact path="/">
						<Home/>
					</Route>
					<Route path="/settings">
						<Settings />
					</Route>
					<Route path="/notes">
						<NotesList startConfirm={startConfirm} />
					</Route>
					<Route path="*">
						<NotFound/>
					</Route>
				</Switch>
			</div>
			<ConfirmModal 
				isOpen={isConfirmModalOpen} 
				toggleDisplay={toggleConfirmModal} 
				message={confirmMessage}
				confirmButtonLabel={confirmButtonLabel}
				onConfirm={onConfirm} />
		</React.Fragment>
	);
}
