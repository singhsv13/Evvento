// import { Injectable } from '@angular/core';
// import { User } from '../model/User';

// @Injectable({
//   providedIn: 'root',
// })
// export class UserService {
  
//   users: User[] = [
//     new User('John Smith', 'johnsmith@xyz.in', '123456'),
//     new User('Mary Jane', 'merryjane@abc.com', 'abc456'),
//     new User('Mark Vaugh', 'markvaugh@def.in', '123def'),
//     new User('Sara King', 'sarahking@xyz.com', 'a1b2c3'),
//   ];

//   constructor() {}
// }


// import { Injectable } from '@angular/core';
// import { User } from '../model/User';

// @Injectable({
//   providedIn: 'root',
// })
// export class UserService {

//   users: User[] = [
//     new User('John Smith', 'johnsmith@xyz.in', '123456'),
//     new User('Mary Jane', 'merryjane@abc.com', 'abc456'),
//     new User('Mark Vaugh', 'markvaugh@def.in', '123def'),
//     new User('Sara King', 'sarahking@xyz.com', 'a1b2c3'),
//   ];

//   constructor() {}
// }
import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.firebaseDatabaseURL;
  private usersEndpoint = `${this.baseUrl}/users`;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    const url = `${this.usersEndpoint}.json`;
    return this.http
      .get<{ [key: string]: User }>(url)
      .pipe(map((response) => Object.values(response || {})));
  }


  getUserById(id: string): Observable<User> {
    const url = `${this.usersEndpoint}/${id}.json`;
    return this.http.get<User>(url);
  }


  addUser(user: User): Observable<void> {
    const url = `${this.usersEndpoint}/${user.id}.json`;
    return this.http.put<void>(url, user);
  }


  updateUser(id: string, user: User): Observable<void> {
    const url = `${this.usersEndpoint}/${id}.json`;
    return this.http.put<void>(url, user);
  }

  deleteUser(id: string): Observable<void> {
    const url = `${this.usersEndpoint}/${id}.json`;
    return this.http.delete<void>(url);
  }

  authenticateUser(email: string, password: string): Observable<User | null> {
    return this.getAllUsers().pipe(
      map((users) => {
        const user = users.find(
          (user) =>
            user.email.toLowerCase() === email.toLowerCase() &&
            user.password === password
        );
        if (!user) {
          console.log('Invalid credentials: ', email);
        }
        return user || null;
      })
    );
  }
}
