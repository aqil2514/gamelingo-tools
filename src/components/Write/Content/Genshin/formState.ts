export function getFormData(e: React.FormEvent<HTMLFormElement>){
    const formData = new FormData(e.target as HTMLFormElement);

    const elements = document.querySelectorAll("input[type=text]") as NodeListOf<HTMLInputElement>;
    const textarea = document.querySelector("textarea");
    const files = document.querySelectorAll("input[type=file]") as NodeListOf<HTMLInputElement>;

    const data:{ [key: string]: string | null |FileList }  = {};
    
    elements.forEach((el) => {
      data[el.name] = formData.get(el.name) as string;
    })  

    files.forEach((file) => 
    data[file.name] = file.files
    )
    data[textarea!.name] = formData.get(textarea!.name) as string;

    console.log(data)

    return data;
}