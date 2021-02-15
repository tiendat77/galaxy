import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../interfaces/user';

const STORAGE_TOKEN = 'token';

@Injectable({ providedIn: 'root' })
export class AuthService {

  user: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    this.getUser();
  }

  private getUser() {
    const user = localStorage.getItem(STORAGE_TOKEN);
    this.user.next(JSON.parse(user));
  }

  private setUser(user: any) {
    localStorage.setItem(STORAGE_TOKEN, JSON.stringify(user));
    this.user.next(user);
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/login`, { username, password })
      .pipe(map(user => {
        this.setUser(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem(STORAGE_TOKEN);
    this.user.next(null);
  }

}