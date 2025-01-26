// import { Injectable } from '@angular/core';
// import { UserService } from './user.service';
// import { Router } from '@angular/router';
// import { User } from '../model/User';
// import { Observable, tap, map, switchMap, of } from 'rxjs';
// import { DialogueService } from './dialogue.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private loggedUser: User | null = null;

//   constructor(
//     private userService: UserService,
//     private router: Router,
//     private dialogService: DialogueService
//   ) {}

//   logIn(email: string, password: string): Observable<User | null> {
//     return this.userService.authenticateUser(email, password).pipe(
//       tap((user) => {
//         if (user) {
//           this.loggedUser = user;
//           this.dialogService.showDialogue('loginSuccess');
//           console.log('Login successful:', user);
//         } else {
//           this.dialogService.showDialogue('loginFailure');
//           console.log('Login failed: Invalid credentials');
//         }
//       })
//     );
//   }

//   registerUser(name: string, email: string, password: string): Observable<User | null> {
//     return this.userService.getAllUsers().pipe(
//       map((users) => users.find((user) => user.email === email)),
//       switchMap((existingUser) => {
//         if (existingUser) {
//           this.dialogService.showDialogue('registrationError');
//           console.log('Registration failed: Email already exists.');
//           return of(null);
//         } else {
//           const newUser = new User(name, email, password);
//           return this.userService.addUser(newUser).pipe(
//             map(() => {
//               this.loggedUser = newUser;
//               this.dialogService.showDialogue('registrationSuccess');
//               console.log('Registration successful:', newUser);
//               return newUser;
//             }),
//             tap(() => console.log('User added successfully to the system.'))
//           );
//         }
//       })
//     );
//   }

//   getUserId(): string | null {
//     return this.loggedUser?.id || null;
//   }

//   getActiveUser(): User | null {
//     return this.loggedUser;
//   }

//   logOut(): void {
//     if (this.loggedUser) {
//       this.dialogService.showDialogue('logoutConfirmation');
//       console.log(`${this.loggedUser.name} logged out.`);
//     } else {
//       console.log('No user is currently logged in.');
//     }
//     this.loggedUser = null;
//     this.router.navigate(['/login']);
//   }

//   isAuthenticated(): boolean {
//     return !!this.loggedUser;
//   }
// }

// import { Injectable } from '@angular/core';
// import { UserService } from './user.service';
// import { Router } from '@angular/router';
// import { User } from '../model/User';
// import { Observable, tap, map, switchMap, of } from 'rxjs';
// import { DialogueService } from './dialogue.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private loggedUser: User | null = null;

//   constructor(
//     private userService: UserService,
//     private router: Router,
//     private dialogService: DialogueService
//   ) {}

//   logIn(email: string, password: string): Observable<User | null> {
//     return this.userService.authenticateUser(email, password).pipe(
//       tap((user) => {
//         if (user) {
//           this.loggedUser = this.initializeUser(user); // Ensure `regEvents` is an array
//           this.dialogService.showDialogue('loginSuccess');
//           // console.log('Login successful:', user);
//         } else {
//           this.dialogService.showDialogue('loginFailure');
//           // console.log('Login failed: Invalid credentials');
//         }
//       })
//     );
//   }

//   registerUser(name: string, email: string, password: string): Observable<User | null> {
//     return this.userService.getAllUsers().pipe(
//       map((users) => users.find((user) => user.email === email)),
//       switchMap((existingUser) => {
//         if (existingUser) {
//           this.dialogService.showDialogue('registrationError');
//           // console.log('Registration failed: Email already exists.');
//           return of(null);
//         } else {
//           const newUser = new User(name, email, password);
//           newUser.regEvents = []; // Initialize `regEvents` during registration
//           return this.userService.addUser(newUser).pipe(
//             map(() => {
//               this.loggedUser = this.initializeUser(newUser);
//               this.dialogService.showDialogue('registrationSuccess');
//               // console.log('Registration successful:', newUser);
//               return newUser;
//             }),
//             tap(() => console.log('User added successfully to the system.'))
//           );
//         }
//       })
//     );
//   }

//   getUserId(): string | null {
//     return this.loggedUser?.id || null;
//   }

//   getActiveUser(): User | null {
//     return this.loggedUser;
//   }

//   logOut(): void {
//     if (this.loggedUser) {
//       this.dialogService.showDialogue('logoutConfirmation');
//       console.log(`${this.loggedUser.name} logged out.`);
//     } else {
//       this.dialogService.showDialogue('loginStatus');
//       console.log('No user is currently logged in.');
//     }
//     this.loggedUser = null;
//     this.router.navigate(['/login']);
//   }

//   isAuthenticated(): boolean {
//     return !!this.loggedUser;
//   }

//   // Helper function to ensure `regEvents` is always an array
//   private initializeUser(user: User): User {
//     if (!Array.isArray(user.regEvents)) {
//       user.regEvents = []; // Default to an empty array if not initialized
//     }
//     return user;
//   }
// }


import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { Observable, tap, map, switchMap, of, BehaviorSubject } from 'rxjs';
import { DialogueService } from './dialogue.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private loggedUserSubject = new BehaviorSubject<User | null>(null);
  loggedUser$ = this.loggedUserSubject.asObservable(); 

  constructor(
    private userService: UserService,
    private router: Router,
    private dialogService: DialogueService
  ) {}

  logIn(email: string, password: string): Observable<User | null> {
    return this.userService.authenticateUser(email, password).pipe(
      tap((user) => {
        if (user) {
          this.loggedUserSubject.next(this.initializeUser(user)); 
          this.dialogService.showDialogue('loginSuccess');
        } else {
          this.dialogService.showDialogue('loginFailure');
        }
      })
    );
  }

  registerUser(name: string, email: string, password: string): Observable<User | null> {
    return this.userService.getAllUsers().pipe(
      map((users) => users.find((user) => user.email === email)),
      switchMap((existingUser) => {
        if (existingUser) {
          this.dialogService.showDialogue('registrationError');
          return of(null);
        } else {
          const newUser = new User(name, email, password);
          newUser.regEvents = []; 
          return this.userService.addUser(newUser).pipe(
            map(() => {
              this.loggedUserSubject.next(this.initializeUser(newUser)); 
              this.dialogService.showDialogue('registrationSuccess');
              return newUser;
            }),
            tap(() => console.log('User added successfully to the system.'))
          );
        }
      })
    );
  }

  getUserId(): string | null {
    return this.loggedUserSubject.getValue()?.id || null;
  }

  getActiveUser(): Observable<User | null> {
    return this.loggedUser$;   }

  logOut(): void {
    if (this.loggedUserSubject.getValue()) {
      this.dialogService.showDialogue('logoutConfirmation');
      console.log(`${this.loggedUserSubject.getValue()?.name} logged out.`);
    } else {
      this.dialogService.showDialogue('loginStatus');
      console.log('No user is currently logged in.');
    }
    this.loggedUserSubject.next(null); 
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.loggedUserSubject.getValue();
  }

  
  private initializeUser(user: User): User {
    if (!Array.isArray(user.regEvents)) {
      user.regEvents = []; 
    }
    return user;
  }
}
