import TextField from "@/components/Input/TextField"

interface EvertaleCharacterFormProps{
    template:"Write" | "Edit"
} 
export default function EvertaleCharacterForm({template}: EvertaleCharacterFormProps){
    if(template === "Write") return <WriteContent />
}

function WriteContent(){
    return(
        <div>
            <TextField variant="default-variant-1" forId="charName" label="Character Name" />
        </div>
    )
}