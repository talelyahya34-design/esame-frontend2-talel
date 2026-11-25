import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function Shell() {
  return (
    <div className="page-wrapper">
      <div className="app-frame">
        <Header />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}