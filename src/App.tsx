// App.js
import React from 'react';
import './App.css';
import { AuthContextProvider } from './components/context/AuthContext';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import Login from './components/Login';
import ProfileCreation from './components/ProfileCreation';
import AvailabilityPage from './components/AvailabilityPage';
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Login />} />
        <Route path="/profileCreation" element={<ProfileCreation />} />
        <Route path="/Availiability" element={<AvailabilityPage />} />
      </Route>
    )
  );

  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

const Root = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default App;
