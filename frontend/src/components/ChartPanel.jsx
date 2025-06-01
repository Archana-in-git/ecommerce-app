import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 6000 },
  { name: "Mar", value: 9000 },
  { name: "Apr", value: 15000 },
  { name: "May", value: 12000 },
];

const ChartPanel = () => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Monthly Sales
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#1976d2" />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default ChartPanel;
