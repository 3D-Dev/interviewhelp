import * as React from "react";
import { LineChart, Line } from "recharts";

export default function Graph({ data }) {
  return (
    <LineChart width={180} height={80} data={data}>
      <Line
        type="monotone"
        dataKey="conversions"
        stroke="black"
        strokeWidth={2}
        dot={false}
      />
    </LineChart>
  );
}
