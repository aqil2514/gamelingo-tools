import { createClient } from "@supabase/supabase-js";

export enum DB {
  user = "userslogin",
  code = "verificationcode",
  purifyPassword = "password_purify",
}

export enum UserSelect {
  basic = "username, email, name, role, id, image, passwordExist",
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
export const supabase = createClient(supabaseUrl, supabaseKey);
