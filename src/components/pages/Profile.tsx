import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { apiService } from "../../services/api";
import "../../styles/forms.css";

export const Profile: React.FC = () => {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    image: user?.image || "",
    address: user?.address || "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) return <div>Please login first</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedUser = await apiService.updateUser(user._id, formData);
      setUser(updatedUser);
      setIsEditing(false);
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>My Profile</h1>

        {!isEditing ? (
          <div className="profile-info">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Account Type:</strong>{" "}
              {user.isBusiness ? "Business" : "Regular"}
            </p>
            {user.address && (
              <p>
                <strong>Address:</strong> {user.address}
              </p>
            )}
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-primary"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
