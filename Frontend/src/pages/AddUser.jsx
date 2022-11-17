import React, {useEffect} from 'react'
import FormAddUser from '../components/FormAddUser'
import Layout from './Layout'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user && user.role !== "HR") {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);

  return (
    <Layout>
        <FormAddUser />
    </Layout>
  )
}

export default AddUser