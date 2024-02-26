namespace Account {
  export interface UsersLogin {
    id?: string;
    name?: string;
    username: string;
    password: string;
    image?: string;
    oauthid?: string;
    email: string;
    role: "Pengguna" | "Moderator" | "Admin" | "General Admin";
    account_verified?: boolean;
    passwordExist?: boolean;
    createdAt?: string;
  }

  export interface User {
    id: string;
    name: string;
    username: string;
    role: "Pengguna" | "Moderator" | "Admin" | "General Admin";
    email: string;
    image: string;
    account_verified?: boolean;
    passwordExisting?: boolean;
  }

  export interface VerifCode {
    id?: string;
    email: string;
    uid: string;
    code: string;
    createAt?: Date;
  }

  export interface RegisterForm {
    name: string;
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    typeAction: "register";
  }

  export interface LoginForm {
    username: string;
    password: string;
    typeAction: "login";
  }

  export interface AdminUserOutput {
    id: string;
    oauthid?: string;
    image?: string;
    name: string;
    username: string;
    email: string;
    role: "Pengguna" | "Moderator" | "Admin" | "General Admin";
    account_verified: boolean;
    passwordExist: boolean;
    createdat: string;
  }

  export interface PasswordPurify {
    email: string;
    uid: string;
    createdat: string;
  }
}
