import axios from "axios";
import { API_URL } from "../../api/page";
import styles from "./login.module.css";

export default function Login() {
  const handleLogin = async (e) => {
    e.preventDefault();
    await axios
      .post(API_URL + "/login", {
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then(function (response) {
        localStorage.setItem("token", response.data.token);
        alert("login successfully");
        window.location.reload();
      })
      .catch(function (error) {
        alert(error.response.data.message);
      });
  };

  return (
    <div className={styles.card}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input type="email" name="email" className={styles.input} />
        <label>Password:</label>
        <input type="password" name="password" className={styles.input} />
        <button className={styles.submit} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
