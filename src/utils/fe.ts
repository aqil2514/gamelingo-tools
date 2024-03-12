// <<<<< Interface >>>>>

import axios from "axios";

/** Konfigurasi function Notif */
export interface NotifConfig {
  /**
   * Warna yang akan digunakan untuk menampilkan pesan. Gunakan warna yang valid ada di Tailwaind
   */
  color: string;
  /**
   * Elemen referensi tempat munculnya pesan. Gunakan attribute id pada elemen yang menjadi acuan
   */
  refElement: string;
  /**
   * Lokasi munculnya di setelah atau di sebelum referensi element
   */
  location: "before" | "after";
  /**
   * Lama waktu munculnya pesan.
   *
   * Default: 3000 (3 Detik)
   */
  time?: number;
}

/**
 * Menampilkan pesan
 * @param msg - Pesan yang akan ditampilkan
 * @param config - Konfigurasi penampilan pesan
 */
export function notif(msg: string, config: NotifConfig) {
  const { color, refElement, location, time = 3000 } = config;
  const pElement = document.createElement("p");
  pElement.innerHTML = msg;

  pElement.classList.add(`text-${color}-500`);
  pElement.classList.add("font-bold");

  const ref = document.getElementById(refElement);
  ref![location](pElement);

  setTimeout(() => {
    pElement.remove();
  }, time);
}

/**
 * Memberikan sebuah informasi di pojok kanan bawah Textarea
 */
export function showTextareMessage(e: React.FocusEvent<HTMLTextAreaElement>) {
  const target = e.target as HTMLTextAreaElement;
  const parent = target.parentElement as HTMLDivElement;
  const p = target.nextElementSibling as HTMLParagraphElement;

  if (parent.tagName !== "DIV") throw new Error("Parent harus Div element");

  if (p.tagName !== "P") throw new Error("Element selanjutnya harus p element");

  if (!parent.classList.contains("relative")) {
    parent.classList.add("relative");
  }

  p.classList.replace("hidden", "block");
}

/**
 * Menyembunyikan sebuah informasi di pojok kanan bawah Textarea
 */
export function hideTextareaMessage(e: React.FocusEvent<HTMLTextAreaElement>) {
  const target = e.target as HTMLTextAreaElement;
  const p = target.nextElementSibling as HTMLParagraphElement;

  if (p.tagName !== "P") throw new Error("Element selanjutnya harus p element");

  p.classList.replace("block", "hidden");
}

export const isSubfieldData = {
  account(subfield: any): subfield is General.AdminQueryUser["subfield"] {
    return subfield;
  },
  evertale(subfield: any): subfield is General.AdminQueryGameEvertale["subfield"] {
    return subfield;
  },
  genshinImpact(subfield: any): subfield is General.AdminQueryGameGenshin["subfield"] {
    return subfield;
  },
};


/**
 *Translate Handler Function
 *
 * @param {React.KeyboardEvent<HTMLTextAreaElement>} e - Elemen HTML TextArea yang menjadi sasaran
 * @param {any} data - UseState
 * @param {any} section - Mengikuti interface Evertale Character State
 * @param {React.Dispatch<React.SetStateAction<any>>} setData - Pasangan useState data
 * @returns {Promise<void>}
 */

 export async function translateHandler(e: React.KeyboardEvent<HTMLTextAreaElement>): Promise<void> {
  if (e.ctrlKey && e.key === "Enter") {
    const target = e.target as HTMLTextAreaElement;
    const id = target.id.includes("En") ? target.id.replace("En","Id"): target.id.replace("en", "id");
    const idElement = document.getElementById(id) as HTMLTextAreaElement;
    const text = target.value;

    const info = target.nextElementSibling as HTMLParagraphElement;
    const initValue = "CTRL + Enter untuk terjemahkan langsung";

    try { 
      info.innerText = "Menerjemahkan..."
      const res = await axios.post("/api/translate", {
        text,
      });

      const translated: string = res.data.translatedText;
      idElement.value = translated
    } catch (error) {
      console.error(error);
    } finally{
      info.innerText = "Penerjemahan selesai";

      setTimeout(() => {
        
        info.innerText = initValue
      }, 3000);
    }
  }
}