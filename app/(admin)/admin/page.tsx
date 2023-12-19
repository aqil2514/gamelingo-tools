"use client";

import { DIV_MAIN_STYLE } from "@/app/components/Styles";
import axios from "axios";
import { useEffect } from "react";
export default function Character() {
  async function getData() {
    try {
      console.log("getting data");
      const { data } = await axios.get("/api/admin?key=ok");

      console.log(data);
    } catch (error) {
      console.error;
    } finally {
      console.log("Done");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  console.log("ok");
  return <div className={DIV_MAIN_STYLE}>ok</div>;
}
