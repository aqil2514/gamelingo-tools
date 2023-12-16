import { DIV_MAIN_STYLE } from "./Styles";

export function SWRError() {
  return (
    <div className={DIV_MAIN_STYLE + " py-20"}>
      <p className="font-poppins font-semibold text-base lg:text-2xl text-white mx-8 mt-4">Gagal mengambil data...</p>
    </div>
  );
}

export function SWRLoading() {
  return (
    <div className={DIV_MAIN_STYLE + " py-20"}>
      <p className="font-poppins font-semibold text-base lg:text-2xl text-white mx-8 mt-4">Mengambil Data...</p>
    </div>
  );
}
