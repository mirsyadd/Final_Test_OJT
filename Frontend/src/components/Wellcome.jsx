import React, {useEffect, useState} from "react";
import { useSelector } from 'react-redux';
import axios from "axios";

const Wellcome = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getTickets();
  },[]);

  const getTickets = async() => {
    const response = await axios.get('http://localhost:8080/tickets');
    setTickets(response.data)
  }

  const {user} = useSelector((state) => state.auth)
  return (
    <div>
        <h1 className='title'>Dashboard . Role :' <strong>{user && user.role} '</strong></h1>
        <h2 className='subtitle'>Welcome Sir <strong>{user && user.name}</strong></h2>
        {/* <h2 className='subtitle'>Role <strong>{user && user.role}</strong></h2> */}
        <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Approve</th>
            <th>Pending</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
        {tickets.map((ticket) => (
          <tr key={ticket.uuid}>
            <td>{ticket.status}</td>
            <td>{ticket.status}</td>
            <td>{ticket.status}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default Wellcome