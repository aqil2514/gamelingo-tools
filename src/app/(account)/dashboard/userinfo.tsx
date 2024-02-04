"use client";

import Dashboard from "@/components/Account/Dashboard";
import axios from "axios";
import React, { useState, createContext, useContext } from "react";

export default function UserInfo({ data }: { data: Account.User }) {
  return (
    <div className="sm:w-1/3 w-4/5 mx-auto my-4 rounded-lg bg-[rgba(0,0,0,0.4)] p-4">
      <Dashboard data={data} />
    </div>
  );
}
// const UserInfoContext = createContext<React.ComponentState | boolean>(null);

// export default function UserInfo({ data }: { data: Account.User }) {
//   const [infoInit, setInfoInit] = useState<Account.User>(data);
//   const [info, setInfo] = useState<Account.User>(data);
//   const [isReadMode, setIsReadMode] = useState<boolean>(true);
//   const [passwordMode, setPasswordMode] = useState<boolean>(false);
//   const [editLoading, setEditLoading] = useState<boolean>(false);

//   // async function getInfo() {
//   //   try {
//   //     setLoading(true);

//   //     const { data } = await axios.get("/api/users");

//   //     setInfo(data.user);
//   //     setInfoInit(data.user);
//   //   } catch (error) {
//   //     alert("Silahkan login kembali");
//   //     signOut({ callbackUrl: "/login" });
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // }

//   // useEffect(() => {
//   //   getInfo();
//   // }, []);

//   return (
//     <div className="sm:w-1/3 w-4/5 mx-auto my-4 rounded-lg bg-[rgba(0,0,0,0.4)] p-4">
//       <UserInfoContext.Provider value={{ info, setInfo, infoInit, isReadMode, editLoading, setEditLoading, setIsReadMode, passwordMode, setPasswordMode }}>
//         {!passwordMode && <Info />}
//         {passwordMode && <Password />}
//         {isReadMode && <ButtonPassword />}
//       </UserInfoContext.Provider>
//     </div>
//   );
// }

// function Info() {
//   const { info, setInfo, infoInit, editLoading, setEditLoading, isReadMode, setIsReadMode } = useContext(UserInfoContext);
//   const [code, setCode] = useState<string>();
//   const [isCode, setIsCode] = useState<Boolean>();

//   async function changeHandler() {
//     try {
//       const allow = confirm("Yakin ingin mengubah data?");
//       if (!allow) {
//         return;
//       }

//       setEditLoading(true);

//       const { data } = await axios.put("/api/users/dashboard", {
//         info,
//         infoInit,
//         code,
//       });

//       if (data.status !== 200) {
//         alert(data.msg);
//         return;
//       }
//       alert(data.msg);
//       location.reload();
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setEditLoading(false);
//     }
//   }

//   async function codeHandler() {
//     try {
//       setEditLoading(true);
//       const { data } = await axios.get(`/api/users/dashboard/?email=${info?.email}`);

//       if (data.status !== 200) {
//         alert(data.msg);
//         return;
//       }

//       alert(data.msg);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setEditLoading(false);
//     }
//   }

//   return (
//     <>
//       <label htmlFor="username" className="text-white text-base font-bold font-poppins my-8">
//         Username :
//         <input
//           type="text"
//           name="username"
//           id="username"
//           value={info?.username}
//           onChange={(e) => setInfo({ ...info, username: e.target.value })}
//           placeholder="Masukkan Nama Anda..."
//           className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2"
//           disabled={isReadMode || editLoading}
//           required
//         />
//       </label>
//       <label htmlFor="name" className="text-white text-base font-bold font-poppins my-8">
//         Nama Pemilik Akun :
//         <input
//           type="text"
//           name="name"
//           id="name"
//           value={info?.name}
//           onChange={(e) => setInfo({ ...info, name: e.target.value })}
//           placeholder="Masukkan Nama Anda..."
//           className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2"
//           disabled={isReadMode || editLoading}
//           required
//         />
//       </label>
//       <label htmlFor="email" className="text-white text-base font-bold font-poppins my-8">
//         Email :
//         <input
//           type="text"
//           name="email"
//           id="email"
//           value={info?.email}
//           onChange={(e) => {
//             setInfo((prevInfo: React.ComponentState) => {
//               const updatedInfo = { ...prevInfo, email: e.target.value };
//               setIsCode(true);
//               if (updatedInfo.email === infoInit?.email) {
//                 setIsCode(false);
//               }
//               return updatedInfo;
//             });
//           }}
//           placeholder="Masukkan Email Anda..."
//           className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2"
//           disabled={isReadMode || editLoading}
//           required
//         />
//       </label>
//       {isCode && !isReadMode && (
//         <button onClick={codeHandler} disabled={editLoading} className="text-slate-950 px-2 py-1 font-bold font-poppins text-xs rounded-xl block bg-white">
//           Kirim Kode
//         </button>
//       )}
//       {isCode && !isReadMode && (
//         <label htmlFor="code" className="text-white text-base relative font-bold font-poppins my-8">
//           Kode Verifikasi :
//           <input
//             type="number"
//             name="code"
//             id="code"
//             value={code}
//             onChange={(e) => {
//               setCode(e.target.value);
//             }}
//             disabled={editLoading}
//             placeholder="Masukkan Kode Verifikasi..."
//             className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2"
//             required
//           />
//         </label>
//       )}
//       <label htmlFor="role" className="text-white text-base font-bold font-poppins my-8">
//         Role :
//         {isReadMode ? (
//           <input type="text" name="role" id="role" value="Pengguna" placeholder="Masukkan Nama Anda..." className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2" disabled={isReadMode || editLoading} required />
//         ) : (
//           <select name="set-role" id="set-role" disabled={isReadMode || editLoading} className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2">
//             <option value="Pengguna">Pengguna</option>
//             <option value="null" disabled>
//               General Admin (Belum Tersedia)
//             </option>
//             <option value="null" disabled>
//               Admin (Belum Tersedia)
//             </option>
//             <option value="null" disabled>
//               Moderator (Belum Tersedia)
//             </option>
//           </select>
//         )}
//       </label>
//       <button
//         type="button"
//         onClick={() => {
//           setIsReadMode(!isReadMode);
//           setInfo(infoInit);
//           setIsCode(false);
//         }}
//         disabled={editLoading}
//         className="bg-white px-6 py-2 block mx-auto font-poppins my-4 font-bold text-black text-xl rounded-xl"
//       >
//         {isReadMode ? "Edit Data" : "Batal Edit"}
//       </button>
//       {!isReadMode && (
//         <button type="button" onClick={changeHandler} className="bg-white px-6 py-2 block mx-auto font-poppins my-4 font-bold text-black text-xl rounded-xl" disabled={editLoading}>
//           {editLoading ? "Mengirim Data..." : "Ubah Data"}
//         </button>
//       )}
//     </>
//   );
// }

// function Password() {
//   const { editLoading, setEditLoading, info, setInfo } = useContext(UserInfoContext);
//   const [password, setPassword] = useState<React.ComponentState>({ oldPassword: "", newPassword: "", confirmNewPassword: "" });

//   async function changeHandler() {
//     try {
//       setEditLoading(true);
//       const allow = confirm("Yakin ingin ganti password?");
//       if (!allow) {
//         return;
//       }

//       const { data } = await axios.put("/api/users", {
//         password,
//         username: info?.username,
//         putType: "changePassword",
//       });

//       if (data.status !== "ok") {
//         alert(data.msg);
//         return;
//       }

//       alert(data.msg);
//       location.reload();
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setEditLoading(false);
//     }
//   }

//   return (
//     <>
//       <label htmlFor="username" className="text-white text-base font-bold font-poppins my-8">
//         Username :
//         <input
//           type="text"
//           name="username"
//           id="username"
//           value={info?.username}
//           onChange={(e) => setInfo({ ...info, username: e.target.value })}
//           placeholder="Masukkan Nama Anda..."
//           className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2"
//           disabled
//           required
//         />
//       </label>
//       <label htmlFor="old-password" className="text-white text-base font-bold font-poppins my-8">
//         Kata Sandi Lama :
//         <input
//           type="password"
//           name="old-password"
//           id="old-password"
//           value={password.oldPassword}
//           onChange={(e) => setPassword({ ...password, oldPassword: e.target.value })}
//           placeholder="Masukkan kata sandi lama"
//           className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2"
//           disabled={editLoading}
//           required
//         />
//       </label>
//       <label htmlFor="new-password" className="text-white text-base font-bold font-poppins my-8">
//         Kata Sandi Baru :
//         <input
//           type="password"
//           name="new-password"
//           id="new-password"
//           value={password.newPassword}
//           onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
//           placeholder="Masukkan kata sandi baru"
//           className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2"
//           disabled={editLoading}
//           required
//         />
//       </label>
//       <label htmlFor="confirm-new-password" className="text-white text-base font-bold font-poppins my-8">
//         Konfirmasi Kata Sandi Baru :
//         <input
//           type="password"
//           name="confirm-new-password"
//           id="confirm-new-password"
//           value={password.confirmNewPassword}
//           onChange={(e) => setPassword({ ...password, confirmNewPassword: e.target.value })}
//           placeholder="Konfirmasi kata sandi baru"
//           className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2"
//           disabled={editLoading}
//           required
//         />
//       </label>
//       <button type="button" onClick={changeHandler} disabled={editLoading} className="bg-white px-6 py-2 block mx-auto font-poppins my-4 font-bold text-black text-xl rounded-xl">
//         {editLoading ? "Mengubah Kata Sandi..." : "Konfirmasi"}
//       </button>
//     </>
//   );
// }

// function ButtonPassword() {
//   const { setIsReadMode, isReadMode, setInfo, editLoading, infoInit, setPasswordMode, passwordMode } = useContext(UserInfoContext);

//   return (
//     <>
//       {passwordMode && !editLoading && (
//         <button
//           type="button"
//           onClick={() => {
//             setPasswordMode(false);
//             setInfo(infoInit);
//           }}
//           disabled={editLoading}
//           className="bg-white px-6 py-2 block mx-auto font-poppins my-4 font-bold text-black text-xl rounded-xl"
//         >
//           Batal
//         </button>
//       )}
//       {!passwordMode && (
//         <button
//           type="button"
//           onClick={() => {
//             setPasswordMode(true);
//             setInfo(infoInit);
//           }}
//           disabled={editLoading}
//           className="bg-white px-6 py-2 block mx-auto font-poppins my-4 font-bold text-black text-xl rounded-xl"
//         >
//           Ganti Password
//         </button>
//       )}
//     </>
//   );
// }
