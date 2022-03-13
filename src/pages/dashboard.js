import React from "react";
import { Header } from "../components/header/header";
import Footer from "../components/footer/Footer";
import TableHeader from "../components/TableHeader/TableHeader";
import TableGrid from "../components/TableGrid/TableGrid";
export const Dashboard = () => {
  const deleteRows = () => {};
  return (
    <div>
      <Header />
      <div style={{height: "85vh"}}>
        {/* <TableHeader deleteRows /> */}
        <TableGrid deleteRows />
      </div>
      <Footer />
    </div>
  );
};
