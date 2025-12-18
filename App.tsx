import React from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import Overview from './pages/Overview';
import Accounts from './pages/Accounts';
import Pipeline from './pages/Pipeline';
import Quotation from './pages/Quotation';
import Tasks from './pages/Tasks';
import Enablement from './pages/Enablement';
import Campaigns from './pages/Campaigns';

const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
        <Outlet />
      </div>
      <MobileNav />
    </div>
  );
};

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="pipeline" element={<Pipeline />} />
          <Route path="quotation" element={<Quotation />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="enablement" element={<Enablement />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;