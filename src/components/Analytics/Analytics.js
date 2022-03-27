import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = ({ analyticsData }) => {
  const [custData, setCustData] = useState({
    U001: null,
    U002: null,
    U005: null,
    U007: null,
    U013: null,
    CA02: null,
  });
  const [amountData, setAmountData] = useState({
    U001: null,
    U002: null,
    U005: null,
    U007: null,
    U013: null,
    CA02: null,
  });

  useEffect(() => {
    //   setCustData({
    //       ...custData,
    //       [analyticsData.business_code] : analyticsData.no_of_cust,
    //   })
    var a = 0,
      b = 0,
      c = 0,
      d = 0,
      e = 0,
      f = 0,
      g = 0,
      h = 0,
      i = 0,
      j = 0,
      k = 0,
      l = 0;
    analyticsData.map((d) => {
      if (d.business_code === "U001") {
        a = d.no_of_cust;
        g = d.sum_of_open_amount;
      }
      if (d.business_code === "U002") {
        b = d.no_of_cust;
        h = d.sum_of_open_amount;
      }
      if (d.business_code === "U005") {
        c = d.no_of_cust;
        i = d.sum_of_open_amount;
      }
      if (d.business_code === "U007") {
        d = d.no_of_cust;
        j = d.sum_of_open_amount;
      }
      if (d.business_code === "U013") {
        e = d.no_of_cust;
        k = d.sum_of_open_amount;
      }
      if (d.business_code === "CA02") {
        f = d.no_of_cust;
        l = d.sum_of_open_amount;
      }
    });
    setCustData({
      U001: a,
      U002: b,
      U005: c,
      U007: d,
      U013: e,
      CA02: f,
    });
    setAmountData({
      U001: g,
      U002: h,
      U005: i,
      U007: j,
      U013: k,
      CA02: l,
    });
    console.log(a, b, c, d, e, f);
  }, [analyticsData]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Bar Chart",
      },
    },
  };

  const labels = ["U001", "U002", "U005", "U007", "U013", "CA02"];

  const data = {
    labels,
    datasets: [
      {
        label: "No Of Customer",
        data: Object.values(custData),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Total Open Amount",
        data: Object.values(amountData),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div style={{ width: "100%" }}>
      <Bar options={options} data={data} />
    </div>
  );
};

export default Analytics;
