import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login/page";
import { API_URL, BEARER_TOKEN } from "./api/page";
import axios from "axios";
import Banner from "./pages/admin/banner/page";
import Landing from "./pages/user/landing/page";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (BEARER_TOKEN) {
      axios
        .get(API_URL + "/profile", {
          headers: {
            Authorization: "Bearer " + BEARER_TOKEN,
          },
        })
        .then((result) => {
          setUser(result.data);
          setLoading(false);
          if (result.data.role === "admin") {
            if (window.location.pathname !== "/admin/banner") {
              window.location.href = "/admin/banner";
            }
          } else {
            if (window.location.pathname !== "/landing") {
              window.location.href = "/landing";
            }
          }
        })
        .catch((err) => {
          // alert(err.response.data.message);
          // localStorage.removeItem("token");
          // if (window.location.pathname !== "/login") {
          //   window.location.href = "/";
          // }
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [BEARER_TOKEN]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {localStorage.getItem("token") && (
        <nav>
          <ul>
            <li>
              <a
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/";
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </nav>
      )}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          {localStorage.getItem("token") ? (
            user?.role === "admin" ? (
              <Route path="/admin/banner" element={<Banner />} />
            ) : (
              <Route path="/landing" element={<Landing />} />
            )
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;
