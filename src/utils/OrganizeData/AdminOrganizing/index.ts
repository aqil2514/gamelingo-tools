export const adminOrganizing: OrganizeData.Admin = {
    user(data) {
      const finalData: Account.User = {
        id: data["user-id"],
        username: data.username,
        email: data.email,
        name: data.name,
        image: data.image,
        role: data.role as Account.User["role"],
        account_verified: data["account-verified"] === "on" ? true : false,
        passwordExisting: data["password-exist"] === "on" ? true : false,
      };
  
      return finalData;
    },
  };