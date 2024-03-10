// <<<<< Interface >>>>>

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

export function focusHandler(e: React.FocusEvent<HTMLTextAreaElement>) {
  const target = e.target as HTMLTextAreaElement;
  const parent = target.parentElement as HTMLDivElement;
  const p = target.nextElementSibling as HTMLParagraphElement;

  console.log(parent)

  if(parent.tagName !== "DIV") 
  throw new Error("Parent harus Div element");

  if (p.tagName !== "P")
    throw new Error("Element selanjutnya harus p element");

    if(!parent.classList.contains("relative")){
      parent.classList.add("relative")
    }

  p.classList.replace("hidden", "block");
}

export function blurHandler(e: React.FocusEvent<HTMLTextAreaElement>) {
  const target = e.target as HTMLTextAreaElement;
  const p = target.nextElementSibling as HTMLParagraphElement;

  if (p.tagName !== "P")
    throw new Error("Element selanjutnya harus p element");

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

