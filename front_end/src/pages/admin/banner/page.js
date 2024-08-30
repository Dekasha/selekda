import axios from "axios";
import { useState } from "react";
import { API_URL, BEARER_TOKEN, MAIN_URL } from "../../../api/page";
import styles from "./banner.module.css";

export default function Banner() {
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [bannerDescription, setBannerDescription] = useState("");
  const [status, setStatus] = useState("");
  const [banners, setBanners] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bannerTitle || !bannerImage || !bannerDescription || !status) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("banner_title", bannerTitle);
    formData.append("banner_image", bannerImage);
    formData.append("banner_description", bannerDescription);
    formData.append("status", status);

    await axios
      .post(API_URL + "/admin/banner", formData, {
        headers: {
          Authorization: BEARER_TOKEN,
        },
      })
      .then(function (response) {
        setBanners([...banners, response.data]);
        setBannerTitle("");
        setBannerImage("");
        setBannerDescription("");
        setStatus("");
        alert("Data berhasil di tambahkan");
      })
      .catch(function (error) {
        alert(error.response.data.message);
      });
  };

  const handleEdit = async (id) => {
    const response = await axios.get(API_URL + "/admin/banner/" + id, {
      headers: {
        Authorization: BEARER_TOKEN,
      },
    });
    setBannerTitle(response.data.banner_title);
    setBannerImage(response.data.banner_image);
    setBannerDescription(response.data.banner_description);
    setStatus(response.data.status);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!bannerTitle || !bannerImage || !bannerDescription || !status) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("banner_title", bannerTitle);
    formData.append("banner_image", bannerImage);
    formData.append("banner_description", bannerDescription);
    formData.append("status", status);

    await axios
      .post(API_URL + "/admin/banner/" + e.target.id.value, formData, {
        headers: {
          Authorization: BEARER_TOKEN,
        },
      })
      .then(function (response) {
        const newBanners = banners.map((banner) =>
          banner.id === parseInt(e.target.id.value) ? response.data : banner
        );
        setBanners(newBanners);
        setBannerTitle("");
        setBannerImage("");
        setBannerDescription("");
        setStatus("");
        alert("Data berhasil di update");
      })
      .catch(function (error) {
        alert(error.response.data.message);
      });
  };

  const handleDelete = async (id) => {
    await axios
      .delete(API_URL + "/admin/banner/" + id, {
        headers: {
          Authorization: BEARER_TOKEN,
        },
      })
      .then(function () {
        const newBanners = banners.filter((banner) => banner.id !== id);
        setBanners(newBanners);
        alert("Data berhasil di hapus");
      })
      .catch(function (error) {
        alert(error.response.data.message);
      });
  };

  const fetchBanners = async () => {
    const response = await axios.get(API_URL + "/admin/banner", {
      headers: {
        Authorization: BEARER_TOKEN,
      },
    });
    setBanners(response.data);
  };

  useState(() => {
    fetchBanners();
  }, []);

  return (
    <div className={styles.card}>
      <h1>Banner</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="banner_title"
          value={bannerTitle}
          onChange={(e) => setBannerTitle(e.target.value)}
        />
        <label>Image:</label>
        <input
          type="file"
          name="banner_image"
          onChange={(e) => setBannerImage(e.target.files[0])}
        />
        <label>Description:</label>
        <textarea
          name="banner_description"
          value={bannerDescription}
          onChange={(e) => setBannerDescription(e.target.value)}
        />
        <label>Status:</label>
        <select
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button className={styles.submit} type="submit">
          Create
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Image</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((banner, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{banner.banner_title}</td>
              <td>
                <img
                  src={`${MAIN_URL}storage/${banner.banner_image}`}
                  alt={banner.banner_title}
                  width="100"
                />
              </td>
              <td>{banner.banner_description}</td>
              <td>{banner.status}</td>
              <td>
                <button
                  onClick={() => handleEdit(banner.id)}
                  className={styles.edit}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(banner.id)}
                  className={styles.delete}
                >
                  Delete
                </button>
                <form onSubmit={handleUpdate}>
                  <input type="hidden" name="id" value={banner.id} />
                  <button className={styles.update} type="submit">
                    Update
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
