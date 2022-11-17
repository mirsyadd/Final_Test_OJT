import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getTickets();
  },[]);

  const getTickets = async() => {
    const response = await axios.get('http://localhost:8080/tickets');
    setTickets(response.data)
  }

  const deleteProduct = async (ticketId) => {
    await axios.delete(`http://localhost:8080/tickets/${ticketId}`);
    getTickets();
  };

  return (
    <div>
      <h1 className="title">Tickets</h1>
      <h2 className="subtitle">List of Tickets</h2>
      <Link to="/tickets/add" className="button is-primary mb-2">
        Add New
      </Link>
      <br/>
      <Link to="/tickets/add/excel" className="button is-primary mb-2">
        Add New Excel
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Ticket Type</th>
            <th>Created By</th>
            <th>Role</th>
            <th>Actions</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
        {tickets.map((ticket, index) => (
          <tr key={ticket.uuid}>
            <td>{index + 1}</td>
            <td>{ticket.tickettype}</td>
            <td>{ticket.user.name}</td>
            <td>{ticket.user.role}</td>
            
            <td>
              <Link className="button is-small is-info">Approve</Link>
              <button className="button is-small is-danger">Reject</button>
            </td>
            <td>
              <Link to={`/tickets/detail/${ticket.uuid}`} className="button is-small is-info">Lihat</Link>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketList;
