import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider';

const Dashboard = () => {

  const { loggedUser } = useContext(AuthContext);

  return (
    <div>
      <h1>Hello, welcome <span className="fw-medium text-dark">
        {loggedUser?.name || "Guest"}
      </span></h1>
    </div>
  )
}

export default Dashboard