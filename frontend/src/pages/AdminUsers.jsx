import { useEffect, useState } from "react";
import { getAllUsers, updateUserStatus } from "../services/userService";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleSuspend = async (userId, currentStatus) => {
    try {
      const updated = await updateUserStatus(userId, { isSuspended: !currentStatus });
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, isSuspended: updated.isSuspended } : u))
      );
    } catch (err) {
      alert("Failed to update user status");
    }
  };

  const toggleBan = async (userId, currentStatus) => {
    try {
      const updated = await updateUserStatus(userId, { isBanned: !currentStatus });
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, isBanned: updated.isBanned } : u))
      );
    } catch (err) {
      alert("Failed to update ban status");
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-users-container">
      <h2>User Management</h2>
      <table className="admin-users-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Suspended</th>
            <th>Banned</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.isSuspended ? "Yes" : "No"}</td>
              <td>{u.isBanned ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => toggleSuspend(u._id, u.isSuspended)}>
                  {u.isSuspended ? "Unsuspend" : "Suspend"}
                </button>
                <button onClick={() => toggleBan(u._id, u.isBanned)}>
                  {u.isBanned ? "Unban" : "Ban"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
