import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddTicket = () => {
  const [tickettype, setTicketType] = useState("");
  const [currentapprovalname, setCurrentApprovalName] = useState("");
  const [currentapprovalrole, setCurrentApprovalRole] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [totalclaim, setTotalClaim] = useState("")
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const saveTicket = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/tickets", {
        tickettype: tickettype,
        currentapprovalname: currentapprovalname,
        currentapprovalrole: currentapprovalrole,
        status: status,
        description: description,
        totalclaim: totalclaim
      });
      navigate("/tickets");
    } catch (error) {
      if (error.response) {
        // setMsg(error.response.data.msg);
        console.log(error);
      }
    }
  };
  console.log(saveTicket);
  return (
    <div>
      <h1 className="title">Products</h1>
      <h2 className="subtitle">Add New Product</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveTicket}>
              {/* <p className="has-text-centered">{msg}</p> */}
              <div className="field">
                <label className="label">Ticket Type</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={tickettype}
                    onChange={(e) => setTicketType(e.target.value)}
                    placeholder="Ticket Name"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Approval Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={currentapprovalname}
                    onChange={(e) => setCurrentApprovalName(e.target.value)}
                    placeholder="Approval Name"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Approval Role</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={currentapprovalrole}
                    onChange={(e) => setCurrentApprovalRole(e.target.value)}
                    placeholder="Approval Role"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Status</label>
                <div className="control">
                  <div className="select is-fullwidth">
                  <input
                    type="text"
                    className="input"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    placeholder="PENDING"
                  />
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <div className="select is-fullwidth">
                  <input
                    type="text"
                    className="input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Deskripsi Ticket"
                  />
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label">Price</label>
                <div className="control">
                  <div className="select is-fullwidth">
                  <input
                    type="text"
                    className="input"
                    value={totalclaim}
                    onChange={(e) => setTotalClaim(e.target.value)}
                    placeholder="Price "
                  />
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddTicket;
