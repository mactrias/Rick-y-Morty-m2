import styles from "../Form/Form.module.css";
import React from "react";
import { useState } from "react";
import validate from "./validate";

export default function Form(props) {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });

    setErrors(
      validate({
        ...userData,
        [name]: value,
      })
    );
  }

  function handleSubmit() {
    props.login(userData);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input
            className={errors.name && "warning"}
            name="username"
            value={userData.username}
            type="text"
            onChange={handleInputChange}
            placeholder="email"
          />
          <p className={styles.danger}>
            {errors.username ? errors.username : null}
          </p>
        </div>

        <div>
          <label>Password: </label>
          <input
            className={errors.name && "warning"}
            name="password"
            value={userData.password}
            type="password"
            onChange={handleInputChange}
            placeholder="clave"
          />
          <p className={styles.danger}>
            {errors.password ? errors.password : null}
          </p>
        </div>
        <button className={styles.btn} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
