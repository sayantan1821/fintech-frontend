import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics = ({ analyticsData, currencyData }) => {
  const [custData, setCustData] = useState({
    "U001": null,
    "U002": null,
    "U005": null,
    "U007": null,
    "U013": null,
    "CA02": null,
  });
  const [amountData, setAmountData] = useState({
    U001: null,
    U002: null,
    U005: null,
    U007: null,
    U013: null,
    CA02: null,
  });

  let chartInstance = null;
  useEffect(() => {
    // console.log(analyticsData);
      // analyticsData.map((data) => {
      //   setCustData({
      //     ...custData,
      //     [data.business_code]: data.no_of_cust,
      //   })
      // })
      // console.log(custData);
    // console.log(currencyData);
    // console.log([analyticsData]);
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
    analyticsData &&
      analyticsData.map((data) => {
        if (data.business_code === "U001") {
          a = data.no_of_cust;
          g = data.sum_of_open_amount;
        }
        if (data.business_code === "U002") {
          b = data.no_of_cust;
          h = data.sum_of_open_amount;
        }
        if (data.business_code === "U005") {
          c = data.no_of_cust;
          i = data.sum_of_open_amount;
        }
        if (data.business_code === "U007") {
          d = data.no_of_cust;
          j = data.sum_of_open_amount;
        }
        if (data.business_code === "U013") {
          e = data.no_of_cust;
          k = data.sum_of_open_amount;
        }
        if (data.business_code === "CA02") {
          f = data.no_of_cust;
          l = data.sum_of_open_amount;
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
    // console.log(a, b, c, d, e, f);
  }, [analyticsData]);

  const options = {
    normalized: true,
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

  const pieOptions = {
    legend: {
      display: false,
      position: "right",
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Pie Chart",
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };
  const pieData = {
    maintainAspectRatio: true,
    responsive: true,
    labels: ["USD", "CAD"],
    datasets: [
      {
        data: currencyData,
        backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(53, 162, 235, 0.5)"],
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(53, 162, 235, 0.7)",
        ],
      },
    ],
  };

  const labels = ["U001", "U002", "U005", "U007", "U013", "CA02"];

  const datas = {
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
    <div style={{ width: "70%", height: "80%", margin: "auto" }}>
      <div style={{ margin: "0 auto 70px", width: "40vw" }}>
        <Bar options={options} data={datas} />
      </div>
      <div style={{ width: "30vw", margin: "auto", textAlign: "center" }}>
      <h4>Pie Chart</h4>
      <br></br>
        <Pie
          data={pieData}
          options={pieOptions}
          ref={(input) => {
            chartInstance = input;
          }}
        />
      </div>
    </div>
  );
};

export default Analytics;
