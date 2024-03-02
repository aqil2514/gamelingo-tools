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
  const { color, refElement, location, time } = config;
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

// export function notif(msg: string, color: string, refElement: string, location: "before" | "after", time: number = 3000) {
//   const pElement = document.createElement("p");
//   pElement.innerHTML = msg;

//   pElement.classList.add(`text-${color}-500`);
//   pElement.classList.add("font-bold");

//   const ref = document.getElementById(refElement);
//   ref![location](pElement);

//   setTimeout(() => {
//     pElement.remove();
//   }, time);
// }
