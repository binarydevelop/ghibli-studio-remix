import { Outlet } from "@remix-run/react";

export default function Index() {
  return (
    <div className="p-20 ">
      <Outlet/>
      <h1>Welcome to Ghibli studio 🎬</h1>
    </div>
  );
}
