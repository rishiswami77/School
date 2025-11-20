import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Pages/Header";

const Layout: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* ===== Header / Navbar ===== */}
      <header className="shadow-sm">
        <Header />
      </header>

      {/* ===== Main Content ===== */}
      <main
        className="flex-fill"
        style={{ minHeight: "calc(100vh - 112px)" }}
      >
        <div>
          <Outlet />
        </div>
      </main>

      {/* ===== Footer ===== */}
      <footer className="bg-white border-top text-end py-3 px-4 mt-auto small text-muted">
        &copy; {new Date().getFullYear()} My App. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
