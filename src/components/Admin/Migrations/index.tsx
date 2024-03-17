"use client";

import Select from "@/components/Input/Select";
import { fetcher, fetcherWithParams } from "@/lib/Data";
import { Route } from "next";
import useSWR from "swr";
import { MigrationParams, optionData } from "./helper";
import React, { useState } from "react";


/** TODO: Fokus ke migrasi dulu */
export default function MigrationComponent(){
    const url:Route = "/api/admin/migrations";
    const [param, setParam] = useState<MigrationParams>({} as MigrationParams)
    const params:MigrationParams={
        category: param.category
    }
    
    function changeHandler(e:React.ChangeEvent<HTMLSelectElement>){
        setParam({category:e.target.value as MigrationParams["category"]})
    }
    return(
        <div>
            <Select template="default-variant-1" forId="category" data={optionData} onChange={changeHandler} />
        </div>
    )
}