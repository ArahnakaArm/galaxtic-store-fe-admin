import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

export default function RouteInfo(props) {
  return (
    <div className="px-4 mt-2">
      <div className="flex gap-1">
        <Link to="/">
          <p className="font-[500] text-blue-500 underline cursor-pointer">Dashboard</p>
        </Link>
        <p className="">/</p>
        <p className="font-[500]">{props.currentRoute}</p>
      </div>
    </div>
  );
}
