import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import style from "./AppLayout.module.css";

export default function AppLayout() {
  return (
    <div className={style.app}>
      <Sidebar />
      <main className={style.main}>
        {/* <Header pageName={name} pageDescription={description} /> */}
          <Outlet />
      </main>
    </div>
  );
}
