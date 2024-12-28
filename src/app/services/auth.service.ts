import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { Observable, tap, map, switchMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
// export class AuthService {

//   loggedUser : User;

//   private isLoggedIn: boolean = false;

//   constructor(private userservice: UserService, private router: Router) {}

//   logIn(email: string, password: string) {
//     let user = this.userservice.users.find((user) => {
//       return user.email === email && user.password === password;
//     });
//     console.log('User : ', user)

//     this.loggedUser = user;

//     if (user === undefined) {
//       this.isLoggedIn = false;
//     } else {
//       this.isLoggedIn = true;
//     }
//     return user;
//   }

//   registerUser(name: string, email: string, password: string) {
//     let newUser = this.userservice.users.find((user) => user.email === email);

//     if (newUser) {
//       return undefined;
//     } else {
//       newUser = new User(name, email, password);
//       this.loggedUser = newUser;
//       this.userservice.users.push(newUser);
//       this.isLoggedIn = true;
//     }
//     this.loggedUser = newUser;
//     console.log("new User : ",newUser)
//     return newUser;
//   }

//   getUserId() : string {
//     return this.loggedUser.id;
//   }

//   getActiveUser() : User{
//     return this.loggedUser;
//   }

//   logOut() {
//     this.isLoggedIn = false;
//     console.log(`${this.loggedUser.name}, Logged Out!!`)
//     this.router.navigate(['/login']);
//   }

//   isAuthenticated() {
//     return this.isLoggedIn;
//   }
// }


export class AuthService {
  private loggedUser: User | null = null;

  constructor(private userService: UserService, private router: Router) {}

  logIn(email: string, password: string): Observable<User | null> {
    return this.userService.authenticateUser(email, password).pipe(
      tap((user) => {
        if (user) {
          this.loggedUser = user;
          console.log('Login successful:', user);
        } else {
          console.log('Login failed: Invalid credentials');
        }
      })
    );
  }

  registerUser(name: string, email: string, password: string): Observable<User | null> {
    return this.userService.getAllUsers().pipe(
      map((users) => users.find((user) => user.email === email)),
      switchMap((existingUser) => {
        if (existingUser) {
          console.log('Registration failed: Email already in use');
          return of(null);
        } else {
          const newUser = new User(name, email, password);
          return this.userService.addUser(newUser).pipe(
            map(() => {
              this.loggedUser = newUser;
              console.log('Registration successful:', newUser);
              return newUser;
            })
          );
        }
      })
    );
  }
  

  getUserId(): string | null {
    return this.loggedUser?.id || null;
  }

  getActiveUser(): User | null {
    return this.loggedUser;
  }


  logOut(): void {
    if (this.loggedUser) {
      console.log(`${this.loggedUser.name} logged out.`);
    }
    this.loggedUser = null;
    this.router.navigate(['/login']);
  }

  
  isAuthenticated(): boolean {
    return !!this.loggedUser;
  }
}