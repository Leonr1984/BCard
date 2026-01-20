import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { apiService } from "../../services/api";
import "../../styles/forms.css";

export const Profile: React.FC = () => {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [fullUserData, setFullUserData] = useState<any>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    image: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userData = await apiService.getUser(user._id);
          setFullUserData(userData);
        } catch (err) {
          console.error("Error loading user data:", err);
        } finally {
          setLoadingData(false);
        }
      }
    };
    fetchUserData();
  }, [user]);

  useEffect(() => {
    if (fullUserData && isEditing) {
      const firstName = fullUserData.name?.first || "";
      const lastName = fullUserData.name?.last || "";

      const address = fullUserData.address || {};

      setFormData({
        firstName: firstName,
        lastName: lastName,
        phone: fullUserData.phone || "",
        image: fullUserData.image?.url || "",
        country: address.country || "",
        city: address.city || "",
        street: address.street || "",
        houseNumber: address.houseNumber ? String(address.houseNumber) : "",
        zip: address.zip ? String(address.zip) : "",
      });
    }
  }, [fullUserData, isEditing]);

  if (!user) return <div className="loading">Please login first</div>;
  if (loadingData) return <div className="loading">Loading profile...</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!formData.firstName.trim()) {
        setError("First name is required");
        setLoading(false);
        return;
      }
      if (!formData.phone.trim()) {
        setError("Phone is required");
        setLoading(false);
        return;
      }

      const lastName = formData.lastName.trim();
      const validLastName = lastName.length >= 2 ? lastName : "N/A";

      const updatePayload: any = {
        name: {
          first: formData.firstName.trim(),
          middle: "",
          last: validLastName,
        },
        phone: formData.phone.trim(),
      };

      if (formData.image.trim()) {
        updatePayload.image = {
          url: formData.image.trim(),
          alt: `${formData.firstName} ${validLastName}`,
        };
      }

      if (formData.city.trim() || formData.street.trim()) {
        updatePayload.address = {
          state: "",
          country: formData.country.trim() || "Israel",
          city: formData.city.trim() || "Unknown",
          street: formData.street.trim() || "Unknown",
          houseNumber: formData.houseNumber ? Number(formData.houseNumber) : 1,
          zip: formData.zip ? Number(formData.zip) : 1,
        };
      }

      const updatedUser = await apiService.updateUser(user._id, updatePayload);

      setFullUserData(updatedUser);
      setUser({
        ...user,
        name: `${formData.firstName} ${validLastName}`.trim(),
        phone: formData.phone,
        image: formData.image,
      });

      setIsEditing(false);
      setSuccess("Profile updated successfully!");
      setError("");
    } catch (err: any) {
      console.error("Update error:", err);
      const errorMessage =
        err.response?.data ||
        err.message ||
        "Failed to update profile. Please check all required fields.";
      setError(
        typeof errorMessage === "string"
          ? errorMessage
          : JSON.stringify(errorMessage)
      );
    } finally {
      setLoading(false);
    }
  };

  const getDisplayName = () => {
    if (!fullUserData?.name) return user.name || "Not provided";
    const { first, middle, last } = fullUserData.name;
    return (
      `${first || ""} ${middle || ""} ${last || ""}`.trim() || "Not provided"
    );
  };

  const getDisplayAddress = () => {
    if (!fullUserData?.address) return "Not provided";
    const addr = fullUserData.address;
    const parts = [
      addr.street,
      addr.houseNumber,
      addr.city,
      addr.state,
      addr.country,
      addr.zip,
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(", ") : "Not provided";
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>My Profile</h1>

        {success && <div className="success-message">{success}</div>}

        {!isEditing ? (
          <div className="profile-info">
            {fullUserData?.image?.url && (
              <div className="profile-image" style={{ marginBottom: "20px" }}>
                <img
                  src={fullUserData.image.url}
                  alt={fullUserData.image.alt || "Profile"}
                  style={{
                    maxWidth: "200px",
                    borderRadius: "50%",
                    border: "3px solid #007bff",
                    objectFit: "cover",
                    width: "200px",
                    height: "200px",
                  }}
                />
              </div>
            )}

            <div
              style={{ textAlign: "left", maxWidth: "500px", margin: "0 auto" }}
            >
              <p>
                <strong>Full Name:</strong> {getDisplayName()}
              </p>
              <p>
                <strong>Email:</strong> {fullUserData?.email || user.email}
              </p>
              <p>
                <strong>Phone:</strong> {fullUserData?.phone || "Not provided"}
              </p>
              <p>
                <strong>Account Type:</strong>{" "}
                {fullUserData?.isBusiness ? "Business" : "Regular"}
              </p>
              {fullUserData?.isAdmin && (
                <p>
                  <strong>Role:</strong> Administrator
                </p>
              )}
              <p>
                <strong>Address:</strong> {getDisplayAddress()}
              </p>
              <p>
                <strong>Member Since:</strong>{" "}
                {fullUserData?.createdAt
                  ? new Date(fullUserData.createdAt).toLocaleDateString()
                  : "Unknown"}
              </p>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-primary"
              style={{ marginTop: "20px" }}
            >
              ✏️ Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                minLength={2}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name (min 2 characters)</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Leave empty for 'N/A'"
                minLength={2}
              />
              <small
                style={{ color: "#666", marginTop: "5px", display: "block" }}
              >
                If empty or less than 2 characters, will be set to "N/A"
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="050-1234567"
              />
            </div>

            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Israel"
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Tel Aviv"
              />
            </div>

            <div className="form-group">
              <label htmlFor="street">Street</label>
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Dizengoff"
              />
            </div>

            <div className="form-group">
              <label htmlFor="houseNumber">House Number</label>
              <input
                type="number"
                id="houseNumber"
                name="houseNumber"
                value={formData.houseNumber}
                onChange={handleChange}
                placeholder="123"
              />
            </div>

            <div className="form-group">
              <label htmlFor="zip">ZIP Code</label>
              <input
                type="number"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                placeholder="6000000"
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Profile Image URL</label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-actions">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? "Saving..." : "💾 Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setError("");
                  setSuccess("");
                }}
                className="btn btn-secondary"
              >
                ❌ Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
