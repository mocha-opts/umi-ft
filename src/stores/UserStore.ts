import { action, makeObservable, observable } from "mobx";

interface User {
  id: string | number;
  email: string;
  firstname: string;
  lastname: string;
  avatarUrl: string;
  gender: number;
  birthday: string;
  contacts: string;
  address: string;
}
export class UserImpl {
  user: User = {
    id: "",
    email: "",
    firstname: "",
    lastname: "",
    avatarUrl: "",
    gender: 0,
    birthday: "",
    contacts: "",
    address: "",
  };

  constructor() {
    makeObservable(this, {
      user: observable,
      setUser: action,
    });
  }
  get getUser() {
    return this.user;
  }
  setUser(user: User) {
    this.user = { ...user };
  }
  login(user: User) {
    if (user) {
      this.setUser(user);
    }
  }
  logout() {
    this.user = {
      id: "",
      email: "",
      firstname: "",
      lastname: "",
      avatarUrl: "",
      gender: 0,
      birthday: "",
      contacts: "",
      address: "",
    };
  }
}

export const UserStore = new UserImpl();
