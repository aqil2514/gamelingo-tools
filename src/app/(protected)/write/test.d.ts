// Mendeklarasikan modul "test"
declare module "test" {
    // Mendeklarasikan tipe untuk fungsi test
    export function test(msg: string): void;

    // Mendeklarasikan tipe untuk objek
    export interface MyObject {
        name: string;
        age: number;
    }

    // Mendeklarasikan tipe untuk kelas
    export class MyClass {
        constructor(name: string, age: number);
        getName(): string;
        getAge(): number;
    }
}