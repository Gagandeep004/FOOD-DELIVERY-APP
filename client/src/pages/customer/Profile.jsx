import { useState } from "react";
import API from "../../services/api";
import Navbar from "../../components/customer/Navbar";
import toast from "react-hot-toast";
import "../../styles/customer.css";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [address, setAddress] = useState(user.address || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await API.put(`/auth/profile/${user._id}`, {
        name,
        phone,
        address,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (!user || !user._id) {
    return (
      <>
        <Navbar />
        <div className="section-container" style={{ marginTop: "40px", textAlign: "center" }}>
          <h2>My Profile</h2>
          <p>Please log in to view or edit your profile settings.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="profile-container">
        <h1>👤 My Profile</h1>

        <label>Full Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email Address</label>
        <input value={user.email || ""} disabled />

        <label>Account Role</label>
        <input value={user.role ? user.role.toUpperCase() : "CUSTOMER"} disabled />

        <label>Phone Number</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone number..." />

        <label>Default Delivery Address</label>
        <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter delivery address..." />

        <button className="btn-primary" onClick={handleSave} disabled={saving} style={{ marginTop: "24px", width: "100%", padding: "14px" }}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </>
  );
}

export default Profile;