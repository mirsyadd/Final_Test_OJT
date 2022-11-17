import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditUser = () => {
  const [name, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [nik, setNik] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [projectname, setProjectname] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${id}`);
        setNama(response.data.name);
        setEmail(response.data.email);
        setRole(response.data.role);
        setAddress(response.data.address);
        setNik(response.data.nik);
        setPhone(response.data.phonenumber);
        setProjectname(response.data.projectname);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:8080/users/${id}`, {
        name: name,
        email : email,
        password : password,
        confpassword : confPassword,
        role : role,
        nik : nik,
        phonenumber : phonenumber,
        address : address,
        projectname : projectname
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
    <h1 className="title has-text-centered">Users</h1>
    <h2 className="subtitle has-text-centered">Add New User</h2>
    <div className="card is-shadowless">
      <div className="card-content">
        <div className="content">
          <form onSubmit={updateUser}>
            <p className="has-text-centered">{msg}</p>
            <div className="field">
              <label className="label">Nama</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  placeholder="Nama"
                  value={name}
                  onChange={(e) => setNama(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  type="password"
                  className="input"
                  placeholder="******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Confirm Password</label>
              <div className="control">
                <input
                  type="password"
                  className="input"
                  placeholder="******"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Role</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    >
                    <option value="Select">----</option>
                    <option value="PM">Project Manager</option>
                    <option value="HR">HR</option>
                    <option value="Developer">Developer</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Nomer Induk Keluarga</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  placeholder="Text"
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">No Telpon</label>
              <div className="control">
                <input 
                type="text" 
                className="input" 
                value={phonenumber}
                onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Address</label>
              <div className="control">
                <input 
                type="text" 
                className="input" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Project Name</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    value={projectname}
                    onChange={(e) => setProjectname(e.target.value)}
                  >
                    <option value="Select">---</option>
                    <option value="99Usahaku">99Usahaku</option>
                    <option value="DSC">DSC</option>
                    <option value="Digipos">Digipos</option>
                    <option value="None">None Project</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
            <div className="control">
              <button
                type="submit"
                className="button is-success is-fullwidth"
              >
                Update User
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

export default FormEditUser;
