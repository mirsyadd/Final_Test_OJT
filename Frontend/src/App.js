import {BrowserRouter, Route, Routes} from 'react-router-dom'
// import FormAddUser from './components/FormAddUser';
import Login from './components/Login';
import AddExcelPage from './pages/AddExcelPage';
import AddTicket from './pages/AddTicket';
import AddUser from './pages/AddUser';
import Dashboard from './pages/Dashboard';
import EditUser from './pages/EditUser';
import Tickets from './pages/Tickets';
import Users from './pages/Users';
import DetailTicketPages from './pages/DetailTicketPages'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/tickets/add" element={<AddTicket />} />
          <Route path="/tickets/add/excel" element={<AddExcelPage />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/tickets/detail/:id" element={<DetailTicketPages/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
