export interface MigrationParams extends Record<string, string>{
    category: General.AdminQuery["field"];
}

export const optionData:Components.Input.SelectProps<General.AdminQuery["field"]>["data"]=[
    {
        value:"genshin-impact",
        label:"Genshin Impact",
    },
    {
        value:"evertale",
        label:"Evertale",
    },
]