import { useDashboardData } from "..";

export default function ChangeInfo() {
  const { state } = useDashboardData();
  return (
    <div className="border-2 border-white rounded-xl px-4 my-4">
      <p className="text-white font-poppins my-2">
        <strong>Email Lama : </strong>
        {state.initialData.email}
      </p>
      <p className="text-white font-poppins my-2">
        <strong>Email Baru : </strong>
        {state.data.email}
      </p>
      <p className="text-white font-poppins my-2">Kode verifikasi telah dikirim ke {state.data.email}</p>
    </div>
  );
}
