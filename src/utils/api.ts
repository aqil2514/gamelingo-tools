import { supabase } from "@/lib/supabase";
import { z } from "zod";

// UTILS FOR API/Users
export const register = {
  nameValidation: (name: string) => {
    if (!name) {
      return { status: false, ref: "name", msg: "Nama belum diisi" };
    }
    return { status: true };
  },
  usernameValidation: async (username: string) => {
    if (!username) {
      return { status: false, ref: "username", msg: "Username belum diisi" };
    }
    if (username.length <= 7) {
      return { status: false, ref: "username", msg: "Username kurang dari 8 karakter" };
    }

    const isThere = await supabase.from("userslogin").select("*").like("username", username);
    if (isThere.data?.length !== 0) {
      return { status: false, ref: "username", msg: "Username Telah digunakan" };
    }

    return { status: true };
  },
  emailValidation: async (email: string) => {
    const emailType = z.string().email();

    try {
      emailType.parse(email);
    } catch (error) {
      return { status: false, ref: "email", msg: "Email tidak valid" };
    }

    const isThere = await supabase.from("userslogin").select("*").like("email", email);
    if (isThere.data?.length !== 0) return { status: false, ref: "email", msg: "Email telah digunakan" };

    return { status: true };
  },
  passwordValidation: (password: string, confirmPassword: string) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)\w{7,20}$/;
    if (!password.match(regex)) {
      return { status: false, ref: "password", msg: "Password tidak sesuai dengan aturan" };
    }
    if (password !== confirmPassword) {
      return { status: false, ref: "confirm-password", msg: "Password tidak sama" };
    }

    return { status: true };
  },
};
