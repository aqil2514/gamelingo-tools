namespace Account {
  export interface UsersLogin {
    id?: string;
    name?: string;
    username: string;
    password: string;
    image?: string;
    oauthid?: string;
    email: string;
    role: "General Admin" | "Admin" | "Admin of Genshin Impact" | "Admin of Evertale" | "Moderator" | "User";
    account_verified?: boolean;
    passwordExist?: boolean;
    createdAt?: string;
  }

  export interface UserSession {
    name: string;
    id: string;
    image: string;
    email: string;
    role: Account.User["role"];
  }

  export interface User {
    id: string;
    name: string;
    username: string;
    role: "General Admin" | "Admin" | "Admin of Genshin Impact" | "Admin of Evertale" | "Moderator" | "User";
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
    createdat?: string;
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
    role: "General Admin" | "Admin" | "Admin of Genshin Impact" | "Admin of Evertale" | "User" | "Moderator";
    account_verified: boolean;
    passwordExist: boolean;
    createdat: string;
  }

  export interface UserFromMongoDB {
    username: string;
    name: string;
    image?: string;
    post: Post[];
    createdAt: string;
    email: string;
    userId: string;
  }

  interface Post {
    postId: string;
    title: string;
  }

  export interface PasswordPurify {
    email: string;
    uid: string;
    createdat: string;
  }
}
