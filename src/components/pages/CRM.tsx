import React, { useState, useEffect } from "react";
import { User } from "../../types";
import { apiService } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import "../../styles/forms.css";

export const CRM: React.FC = () => {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAdmin) {
      setError("You do not have permission to access this page");
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      try {
        const data = await apiService.getAllUsers();
        setUsers(data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Error loading users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [isAdmin]);

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await apiService.deleteUser(userId);
        setUsers(users.filter((u) => u._id !== userId));
      } catch (err: any) {
        setError(err.response?.data?.message || "Error deleting user");
      }
    }
  };

  const handleChangeStatus = async (userId: string) => {
    try {
      const updatedUser = await apiService.changeUserStatus(userId);
      setUsers(users.map((u) => (u._id === userId ? updatedUser : u)));
    } catch (err: any) {
      setError(err.response?.data?.message || "Error changing user status");
    }
  };

  const getFullName = (user: User): string => {
    if (typeof user.name === "string") {
      return user.name;
    }
    if (user.name && typeof user.name === "object") {
      const name = user.name as any;
      return `${name.first || ""} ${name.last || ""}`.trim();
    }
    return "Unknown";
  };

  if (loading) return <div className="loading">Loading...</div>;

  if (!isAdmin) {
    return (
      <div className="error-page">
        <div className="error-container">
          <h1>Access Denied</h1>
          <p>You do not have permission to access the CRM system</p>
        </div>
      </div>
    );
  }

  return (
    <div className="crm-page">
      <div className="crm-container">
        <h1>⚙️ CRM System - User Management</h1>

        {error && <div className="error-message">{error}</div>}

        {users.length === 0 ? (
          <div className="empty-state">
            <p>No users found</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Account Type</th>
                  <th>Admin</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{getFullName(user)}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.isBusiness ? "💼 Business" : "👤 Regular"}</td>
                    <td>{user.isAdmin ? "✅ Yes" : "❌ No"}</td>
                    <td>
                      {!user.isAdmin && (
                        <>
                          <button
                            onClick={() => handleChangeStatus(user._id)}
                            className="btn-small"
                            style={{ marginRight: "0.5rem" }}
                            title={
                              user.isBusiness ? "Make Regular" : "Make Business"
                            }
                          >
                            {user.isBusiness ? "👤 Regular" : "💼 Business"}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="btn-small btn-delete"
                            title="Delete user"
                          >
                            🗑️ Delete
                          </button>
                        </>
                      )}
                      {user.isAdmin && (
                        <span style={{ color: "gray", fontSize: "0.9rem" }}>
                          Admin User
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p style={{ marginTop: "2rem", color: "var(--secondary-color)" }}>
          Total Users: {users.length}
        </p>
      </div>
    </div>
  );
};
