import React from "react";
import { Header } from "../components/header/header";
import Footer from "../components/footer/Footer";
import TableHeader from "../components/TableHeader/TableHeader";
import TableGrid from "../components/TableGrid/TableGrid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Dashboard = () => {
  const advanceNotify = () => {
    toast.success("Advance Search result loaded", {
      theme: "dark",
      containerId: "advance_search",
    });
  };
  const addNotify = (code, msg) => {
    code === "200"
      ? toast.success(msg, {
          theme: "dark",
        })
      : toast.error(msg, {
          theme: "dark",
        });
  };
  const updateNotify = (sl_no) => {
    toast.success(" One Record has been Updated SL No. " + sl_no, {
      theme: "dark",
      containerId: "advance_search",
    });
  };

  return (
    <div>
      <Header />
      <div style={{ height: "85vh" }}>
        {/* <TableHeader deleteRows /> */}
        <TableGrid
          deleteRows
          advanceNotify={advanceNotify}
          addNotify={addNotify}
          updateNotify={updateNotify}
        />
      </div>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={2000}/>
    </div>
  );
};
