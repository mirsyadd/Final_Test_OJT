import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddExcel = () => {
  const [isFetching, setFetching] = useState(false);
  const [files, setFiles] = useState(null);
  const [dataTableInput, setDataTableInput] = useState([]);
  const [redisKeyUpload, setRedisKeyUpload] = useState("");

  const navigate = useNavigate();

  const changeHandlerInput = (event) => {
    console.log(event.target.files[0], "tes");
    setFiles(event.target.files[0]);

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    fetch("http://localhost:8080/ticket/upload-excel", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        const {
          data: { tableInput, redisKey },
        } = result;
        setDataTableInput(tableInput);
        setRedisKeyUpload(redisKey);
        setFetching(true);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("submit");
  };

  const handleSubmit = () => {
    fetch(`http://localhost:8080/ticket/submit-ticket/${redisKeyUpload}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result, "tes");
      });
  };

  return (
    <div style={{ marginLeft: "2rem" }}>
      <h1 className="title is-1">Input File</h1>
      <div style={{ marginBottom: "2rem" }}>
        {/* <a href="http://localhost:3001/product/download-template">
          Download Template Ticket
        </a> */}
      </div>
      <input
        type="file"
        name="file"
        accept=".xlsx"
        onChange={changeHandlerInput}
      />
      <br />
      <br />
      {isFetching ? (
        <table border={1} style={{ marginTop: "2rem" }}>
          <thead>
            <th>Ticket Id</th>
            <th>Description</th>
            <th>Tanggal</th>
            <th>Total Claim</th>
          </thead>
          <tbody>
            {dataTableInput &&
              dataTableInput.map((item) => {
                return (
                  <tr>
                    <td>{item.id_ticket}</td>
                    <td>{item.description}</td>
                    <td>{item.activity_date}</td>
                    <td>{item.total_claim}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      ) : (
        ""
      )}
      <button
        type="submit"
        className="button is-success"
        disabled={!files}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default AddExcel;
