/** Tampilkan pesan dari server
 * @constructor
 * @param {string} msg - Pesan yang akan ditampilkan
 * @param {string} color - Warna teksnya (Gunakan tailwind, contoh: 'red','green', dsb)
 * @param {string} refElement - Id dari element target
 * @param {string} location - Lokasi ditempatkannya pesan. Relative ke refElement
 * @param {number} time - Opsional. Default 3000 (3 detik)
 */
export function notif(msg: string, color: string, refElement: string, location: "before" | "after", time: number = 3000) {
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
