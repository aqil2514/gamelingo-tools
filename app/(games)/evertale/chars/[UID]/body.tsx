"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CharBody() {
  const { UID } = useParams();
  const router = useRouter();

  async function getInfo() {
    try {
      const { data } = await axios.get(`/api/gamelingo/evertale?category=chars&UID=${UID}`);

      if (data.status !== 200) {
        alert(data.msg);
        router.replace("/evertale");
      }

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
