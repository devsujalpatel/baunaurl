interface User {
  firstname: string;
  lastname?: string;
  email: string;
  hashedPassword: string;
  salt: string;
}

export default User;
