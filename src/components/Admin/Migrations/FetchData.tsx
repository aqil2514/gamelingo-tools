import Button, { VariantClass } from "@/components/Input/Button";
import { MigrationParams } from "./helper";
import { Route } from "next";
import { useMigrationContext } from ".";
import axios from "axios";

export default function FetchData() {
    const {param, topic, topicData} = useMigrationContext();
  const url: Route = "/api/admin/migrations";

  async function fetchHandler() {
    const parameter: MigrationParams = {
      category: param.category,
      topic,
    };

    try {
      const res = await axios.get(url, {
        params: parameter,
      });

      console.log(res.data);
    } catch (error) {
      console.error();
    }
  }

  return (
    <div className="flex justify-center my-4">
      <Button
        className={VariantClass.fetch}
        disabled={topicData.length === 0}
        onClick={fetchHandler}
      >
        Lihat Data
      </Button>
    </div>
  );
}
