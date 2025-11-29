import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

export default function Layout({ username }) {
  return (
    <>
      <Navbar username={username} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}