export function getFormData(e: React.FormEvent<HTMLFormElement>){
    const formData = new FormData(e.target as HTMLFormElement);

    const elements = document.querySelectorAll("input");
    const textarea = document.querySelector("textarea");

    const data:{ [key: string]: string | null }  = {};
    
    elements.forEach((el) => {
      data[el.name] = formData.get(el.name) as string;
    })  
    data[textarea!.name] = formData.get(textarea!.name) as string;

    return data;
}