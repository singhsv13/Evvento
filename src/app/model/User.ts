import { Event } from "./Event";

export class User {
    id: string;
    name?: string;
    email: string;
    password: string;
     regEvents : Event[];
  
    constructor(name: string, email: string, password: string) {
      this.id = generateUserID();
      this.name = name;
      this.email = email;
      this.password = password;
      this.regEvents = [];
    }   
  }

  function generateUserID(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const length = 10;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }


  