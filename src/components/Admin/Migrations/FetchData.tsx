import Button, { VariantClass } from "@/components/Input/Button";
import { MigrationParams } from "./helper";
import { Route } from "next";
import { useMigrationContext } from ".";
import axios from "axios";
import { useState } from "react";
import { Link } from "@/navigation";

// TODO: Akalin ini. Harus bisa download file json nanti 

export default function FetchData() {
  const { param, topic, topicData } = useMigrationContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uri, setUri] = useState<string[]>([]);
  const url: Route = "/api/admin/migrations";

  async function fetchHandler() {
    const parameter: MigrationParams = {
      category: param.category,
      topic,
    };
    const buttonContainerElement = document.getElementById(
      "butons"
    ) as HTMLDivElement;

    try {
      setIsLoading(true);
      const res = await axios.get(url, {
        params: parameter,
      });

      setUri(res.data.data);
    } catch (error) {
      console.error();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div id="buttons" className="flex justify-center my-4">
        <Button
          className={VariantClass.fetch}
          disabled={topicData.length === 0 || isLoading}
          onClick={fetchHandler}
        >
          Ambil Data
        </Button>
      </div>
      
      <div>
        {uri.map(u => (
          <a key={u} href={`/${u}`} className="text-white">Download Data</a>
        ))}
      </div>
    </>
  );
}
