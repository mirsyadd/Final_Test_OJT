import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const DetailTickets = () => {
  const [tickettype, setTicketType] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [totalclaim, setTotalClaim] = useState("");
  const [msg, setMsg] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getTicketsById = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/tickets/${id}`);
        setDescription(response.data.description);
        setTotalClaim(response.data.totalclaim);
        setStatus(response.data.status);
        setTicketType(response.data.tickettype);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getTicketsById();
    console.log(getTicketsById);
  }, [id]);

  //   const getTickets = async() => {
  //     const response = await axios.get('http://localhost:8080/tickets');
  //     setTickets(response.data)
  //   }
  const updateTickets = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/tickets/${id}`, {
        tickettype: tickettype,
        status: status,
        description: description,
        totalclaim: totalclaim,
      });
      navigate("/tickets");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h2 className="subtitle">Detail Ticket</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateTickets}>
              <p className="has-text-centered">{msg}</p>

              <div className="field">
                <label className="label">Ticket Type</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={tickettype}
                    disabled
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Status</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={status}
                    disabled
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={description}
                    disabled
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Price</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={totalclaim}
                    disabled
                  />
                </div>
              </div>
            </form>
            <div>
              <Link to="/tickets" className="button is-small is-danger mb-2">
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTickets;
