import { useEffect, useState } from "react";
import { getAllUsers, updateUserStatus } from "../services/userService";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
} from "@mui/material";

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
      const updated = await updateUserStatus(userId, {
        isSuspended: !currentStatus,
      });
      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, isSuspended: updated.isSuspended } : u
        )
      );
    } catch {
      alert("Failed to update user status");
    }
  };

  const toggleBan = async (userId, currentStatus) => {
    try {
      const updated = await updateUserStatus(userId, {
        isBanned: !currentStatus,
      });
      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, isBanned: updated.isBanned } : u
        )
      );
    } catch {
      alert("Failed to update ban status");
    }
  };

  if (loading) return <Typography color="white">Loading users...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" color="white" gutterBottom>
        User Management
      </Typography>

      <Paper sx={{ backgroundColor: "#1e1e1e", padding: 2, overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                "Username",
                "Email",
                "Role",
                "Suspended",
                "Banned",
                "Actions",
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u._id}>
                <TableCell sx={{ color: "white" }}>{u.username}</TableCell>
                <TableCell sx={{ color: "white" }}>{u.email}</TableCell>
                <TableCell sx={{ color: "white" }}>{u.role}</TableCell>
                <TableCell sx={{ color: "white" }}>
                  {u.isSuspended ? "Yes" : "No"}
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  {u.isBanned ? "Yes" : "No"}
                </TableCell>
                <TableCell sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    color={u.isSuspended ? "warning" : "primary"}
                    size="small"
                    onClick={() => toggleSuspend(u._id, u.isSuspended)}
                  >
                    {u.isSuspended ? "Unsuspend" : "Suspend"}
                  </Button>
                  <Button
                    variant="contained"
                    color={u.isBanned ? "error" : "secondary"}
                    size="small"
                    onClick={() => toggleBan(u._id, u.isBanned)}
                  >
                    {u.isBanned ? "Unban" : "Ban"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default AdminUsers;
