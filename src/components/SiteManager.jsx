import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../styles/users.module.css";

const SiteManager = () => {
  const [users, setUsers] = useState([]);

  const GET_USERS = "https://epinet-backend.onrender.com/api/users";

  const getUsers = () => {
    axios
      .get(GET_USERS)
      .then((response) => {
        const filteredUsers = response.data.filter(
          (user) => user.type === "user"
        );
        setUsers(filteredUsers);
        console.log("user data", filteredUsers);
        // getUsers;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleApproval = (id) => {
    axios
      .put(`https://epinet-backend.onrender.com/api/users/${id}/approve-site`)
      .then((response) => {
        console.log(response.data);
        getUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Site Data Manager</h2>
      <div className={styles.cards}>
        {users.map((user) => (
          <div key={user._id} className={styles.user_card}>
            <div className={styles.name}>{user.name}</div>
            <div className={styles.location}>{user.location}</div>
            <div className={styles.email}>{user.email}</div>
            <div className={styles.mobile}>{user.mobile}</div>
              {user.hasSiteApproved === true ? (
                <span className={styles.status}>Status: <span className={styles.approved}>Approved</span></span>
              ) : (
                <button
                  className={styles.button}
                  onClick={() => handleApproval(user._id)}
                >
                  Approve
                </button>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SiteManager;
