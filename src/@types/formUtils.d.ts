namespace FormUtils{
    interface Result{
        msg?:string,
        status:number
    }
    export interface Genshin{
        processMaterial: (formData: FormData) => Promise<Result>
    }
}