import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getTickets();
  }, []);

  const getTickets = async () => {
    const response = await axios.get("http://localhost:8080/tickets");
    setTickets(response.data);
  };

  const deleteProduct = async (ticketId) => {
    await axios.delete(`http://localhost:8080/tickets/${ticketId}`);
    getTickets();
  };

  return (
    {user && user.projectname === "DSC" && (
      <div>
      <h1 className="title">Tickets</h1>
      <h2 className="subtitle">List of Tickets</h2>
      <Link to="/tickets/add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Ticket Type</th>
            <th>Created By</th>
            <th>Actions</th>
            <th>Role</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )}
  );
};

export default TicketList;
