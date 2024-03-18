import Select from "@/components/Input/Select";
import { MigrationParams, getTopic, optionData } from "./helper";
import { useMigrationContext } from ".";

export default function SelectData(){
    const {param, setParam, topicData, setTopicData, setTopic} = useMigrationContext();
    function changeHandler(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedCategory = e.target.value as MigrationParams["category"];
        setParam({ ...param, category: selectedCategory });
        const selectedTopic = getTopic(selectedCategory);
    
        if (!selectedTopic) return setTopicData([]);
    
        setTopicData(selectedTopic);
      }
    
      function topicHandler(e:React.ChangeEvent<HTMLSelectElement>){
        setTopic(e.target.value);
      }
    return(
        <div className=" flex justify-center gap-4">
        <Select
          defaultChoice="Game"
          template="default-variant-1"
          forId="category"
          data={optionData}
          onChange={changeHandler}
        />
        {param.category === ("Game" as unknown) ||
          (param.category && (
            <Select
              defaultChoice={
                param.category === ("Game" as unknown)
                  ? `No Selected`
                  : `Data for ${param.category}`
              }
              template="default-variant-1"
              forId="category"
              data={topicData}
              onChange={topicHandler}
            />
          ))}
      </div>
    )
}