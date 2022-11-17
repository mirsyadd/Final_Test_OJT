import React, {useEffect, useState} from "react";
import axios from "axios";

const GetSummary = () => {
    const [tickets, setTickets] = useState([]);

    
  useEffect(() => {
    getSummary();
  }, []);

  const getSummary = async() => {
    const response = await axios.get('http://localhost:8080/summary');
    setTickets(response.data)
  }

  return (
    <div className="box">
      <div>
        <div>
          <label className="label">Pending</label>
          <h2>{tickets.pending}</h2>
        </div>
        <div>
          <label className="label">Approve</label>
          <h2>{tickets.approve}</h2>
        </div>
        <div>
          <label className="label">Reject</label>
          <h2>{tickets.reject}</h2>
        </div>
      </div>
    </div>
  )
}

export default GetSummary