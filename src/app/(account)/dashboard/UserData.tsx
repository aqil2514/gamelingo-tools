"use client";

import Dashboard from "@/components/Account/Dashboard";
import React from "react";

export default function UserData({ data }: { data: Account.User }) {
  return (
    <div className="sm:w-1/3 w-4/5 mx-auto my-4 rounded-lg bg-[rgba(0,0,0,0.4)] p-4">
      <Dashboard data={data} />
    </div>
  );
}
