"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function CharBody() {
  const { UID } = useParams();

  async function getInfo() {
    try {
      const { data } = await axios.get(`/api/gamelingo/evertale?category=chars&UID=${UID}`);

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getInfo();
  }, []);
  return (
    <div>
      <h1>ok</h1>
    </div>
  );
}
