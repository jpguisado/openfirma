import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthContextProvider } from './context/AuthContext';

import NotFound from './routes/notFound';
import Login from "./pages/Login/Login";
import App from './App';

import './index.css';
import { Firmas } from './pages/Firmas';
import { Admin } from './pages/Admin';

import Inbox from './components/Inbox/Index';
import Outbox from './components/Outbox/Index';

import SigningRequestDetails from './components/SigningRequestDetails/Index'
import NewSigningRequest from './components/NewSigningRequest/index'

import { MainMessages } from './components/MainMessages/Index';
import { CreateUser} from './components/CreateUser/Index';
import { Profile } from './components/Profile/Index'
import { PrivateRoute } from './components/PrivateRoute';
import { EditUserPortal } from './components/EditUserPortal/Index';
import { Positions } from './components/Positions/Index';
import { Help } from './components/Help/Index';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
	
	<BrowserRouter>
		<React.StrictMode>
			<AuthContextProvider>
				<Routes>
					<Route path="/" element={<PrivateRoute> <App /> </PrivateRoute>}>
						<Route index element={<Help />} />
						<Route path="firmas/*" element={ <Firmas/> }>
							<Route index element={<MainMessages />} />
							<Route path="inbox/*" element={<Inbox /> }>
								<Route index element={<MainMessages />} />
								<Route path=':requestId' element={<SigningRequestDetails />} />
								<Route path='new' element={<NewSigningRequest />} />
							</Route>
							<Route path="outbox/*" element={<Outbox />} >
								<Route index element={<MainMessages />} />
								<Route path=':requestId' element={<SigningRequestDetails />} />
							</Route>
						</Route>
						<Route path='admin/*' element={ <Admin/> }>
							<Route index element={ <CreateUser/> } />
							<Route path='users' element={<CreateUser/>}>
								<Route path=':userId' element={<EditUserPortal/>}/>
							</Route>
							<Route path='positions' element={<Positions/>} />
						</Route>
						<Route path='profile/*' element={<Profile/>} />
						<Route path="*" element={<NotFound />} />
					</Route>
					<Route path='/login' element={<Login />} />
				</Routes>
			</AuthContextProvider>
		</React.StrictMode>
	</BrowserRouter>

);