import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoTicket, IoHome, IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <aside className="menu pl-2 has-shadow">
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/dashboard"}>
              <IoHome /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={"/tickets"}>
              <IoTicket /> Tickets
            </NavLink>
          </li>
        </ul>
        <div>
          {user && user.role === "HR" && (
            <div>
              <p className="menu-label">HR</p>
              <ul className="menu-list">
                <li>
                  <NavLink to={"/users"}>
                    <IoPerson /> Users
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div>
          {user && user.role === "PM" && (
            <div>
              <p className="menu-label">Project Manager</p>
              <ul className="menu-list">
                <li>
                  <NavLink to={"/users"}>
                    <IoPerson /> Users
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
        <p className="menu-label">Settings</p>
        <ul className="menu-list">
          <li>
            <button className="button is-white" onClick={logout}>
              <IoLogOut /> Logout
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
