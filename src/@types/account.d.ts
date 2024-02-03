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
    createdAt?: Date;
  }

  export interface User {
    id: string;
    name: string;
    username: string;
    role: "Pengguna" | "Moderator" | "Admin" | "General Admin";
    email: string;
    image: string;
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
}
