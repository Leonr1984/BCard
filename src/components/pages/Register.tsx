import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { apiService } from "../../services/api";
import "../../styles/forms.css";

export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
    phone: "",
    isBusiness: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (pwd: string): boolean => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[a-zA-Z\d@$!%*?&_-]{8,}$/;
    return regex.test(pwd);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validatePassword(formData.password)) {
      setError(
        "Password must be at least 8 characters, with uppercase, lowercase, number, and special character"
      );
      return;
    }

    setLoading(true);

    try {
      await apiService.register({
        name: {
          first: formData.first,
          last: formData.last,
          middle: "",
        },
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        isBusiness: formData.isBusiness,
        image: {
          url: "",
          alt: "",
        },
        address: {
          state: "IL",
          country: "Israel",
          city: "Tel Aviv",
          street: "Main Street",
          houseNumber: 1,
          zip: 6000000,
        },
      });

      await login(formData.email, formData.password);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="first">First Name</label>
            <input
              type="text"
              id="first"
              name="first"
              value={formData.first}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="last">Last Name</label>
            <input
              type="text"
              id="last"
              name="last"
              value={formData.last}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Min 8 chars, uppercase, lowercase, number, special char"
            />
          </div>

          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="isBusiness"
              name="isBusiness"
              checked={formData.isBusiness}
              onChange={handleChange}
            />
            <label htmlFor="isBusiness">Register as Business Account</label>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? "Loading..." : "Register"}
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};
