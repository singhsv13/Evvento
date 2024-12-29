import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DialogueService } from './dialogue.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.firebaseDatabaseURL;
  private usersEndpoint = `${this.baseUrl}/users`;

  constructor(
    private http: HttpClient,
    private dialogueService: DialogueService
  ) {}

  getAllUsers(): Observable<User[]> {
    const url = `${this.usersEndpoint}.json`;
    return this.http.get<{ [key: string]: User }>(url).pipe(
      map((response) => Object.values(response || {})),
      tap(
        () => this.dialogueService.showDialogue('usersFetched'),
        (error) => {
          console.error('Error fetching users:', error);
          this.dialogueService.showDialogue('serverError');
        }
      )
    );
  }

  getUserById(id: string): Observable<User> {
    const url = `${this.usersEndpoint}/${id}.json`;
    return this.http.get<User>(url).pipe(
      tap(
        (user) => {
          if (user) {
            console.log('User fetched:', user);
            this.dialogueService.showDialogue('userFetched');
          } else {
            this.dialogueService.showDialogue('userNotFound');
          }
        },
        (error) => {
          console.error('Error fetching user by ID:', error);
          this.dialogueService.showDialogue('serverError');
        }
      )
    );
  }

  addUser(user: User): Observable<void> {
    const url = `${this.usersEndpoint}/${user.id}.json`;
    return this.http.put<void>(url, user).pipe(
      tap(
        () => {
          console.log('User added:', user);
          this.dialogueService.showDialogue('userAdded');
        },
        (error) => {
          console.error('Error adding user:', error);
          this.dialogueService.showDialogue('serverError');
        }
      )
    );
  }

  updateUser(id: string, user: User): Observable<void> {
    const url = `${this.usersEndpoint}/${id}.json`;
    return this.http.put<void>(url, user).pipe(
      tap(
        () => {
          console.log('User updated:', user);
          this.dialogueService.showDialogue('userUpdated');
        },
        (error) => {
          console.error('Error updating user:', error);
          this.dialogueService.showDialogue('serverError');
        }
      )
    );
  }

  deleteUser(id: string): Observable<void> {
    const url = `${this.usersEndpoint}/${id}.json`;
    return this.http.delete<void>(url).pipe(
      tap(
        () => {
          console.log(`User with ID: ${id} deleted`);
          this.dialogueService.showDialogue('userDeleted');
        },
        (error) => {
          console.error(`Error deleting user with ID: ${id}`, error);
          this.dialogueService.showDialogue('serverError');
        }
      )
    );
  }

  authenticateUser(email: string, password: string): Observable<User | null> {
    return this.getAllUsers().pipe(
      map((users) => {
        const user = users.find(
          (user) =>
            user.email.toLowerCase() === email.toLowerCase() &&
            user.password === password
        );
        if (user) {
          console.log('User authenticated:', user);
          this.dialogueService.showDialogue('authenticationSuccess');
          return user;
        } else {
          console.log('Invalid credentials:', email);
          this.dialogueService.showDialogue('invalidCredentials');
          return null;
        }
      }),
      tap(
        null,
        (error) => {
          console.error('Error during authentication:', error);
          this.dialogueService.showDialogue('serverError');
        }
      )
    );
  }
}
