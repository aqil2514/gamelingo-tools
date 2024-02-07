namespace Route {
  namespace Request {
    export interface Users {
      username: string;
      password: string;
      typeAction: "login" | "register";
      name?: string;
      confirmPassword?: string;
      email?: string;
    }
  }

  namespace Response {
    export interface Users {
      msg: string;
      ref: string;
      UID: string;
    }
  }
}
