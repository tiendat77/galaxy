import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

import { BehaviorSubject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import jwt_decode from 'jwt-decode';
import * as moment from 'moment';

import { User } from '../interfaces/user';
import { STORAGE_USER, STORAGE_TOKEN, STORAGE_TOKEN_EXPIRATE } from '../configs/storage-keys';

@Injectable({ providedIn: 'root' })
export class AuthService {

  authorized$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  user$: BehaviorSubject<User> = new BehaviorSubject(null);

  private expiration;
  private token;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  private getUser() {
    const user = localStorage.getItem(STORAGE_USER);
    return JSON.parse(user);
  }

  private setUser(user: any) {
    localStorage.setItem(STORAGE_USER, JSON.stringify(user));
    this.user$.next(user);
  }

  private getToken() {
    const token = localStorage.getItem(STORAGE_TOKEN);
    return token;
  }

  private setToken(token) {
    localStorage.setItem(STORAGE_TOKEN, JSON.stringify(token));
    this.token = token;
  }

  private getExpiration() {
    const expiration = localStorage.getItem(STORAGE_TOKEN_EXPIRATE);
    return Number.parseInt(expiration, 10);
  }

  private setExpiration(expiration) {
    localStorage.setItem(STORAGE_TOKEN_EXPIRATE, expiration);
    this.expiration = expiration;
  }

  private validateToken(token: string) {
    try {
      const decoded: any = jwt_decode(token);

      const expiration = moment.unix(decoded.exp);

      if (moment().isAfter(expiration)) {
        return;
      }

      const user: User = {
        id: null,
        name: decoded.name,
        username: decoded.username,
        avatar: decoded.avatar || null,
        password: null,
        token: null,
      };

      return { user, expiration: expiration.unix() };

    } catch (error) {
      console.error(error);
      return;
    }
  }

  private isExpire() {
    const expiration = this.getExpiration();

    if (!expiration) {
      return true;
    }

    try {
      const now = moment();
      const expire = moment.unix(expiration);

      if (now.isAfter(expire)) {
        return true;

      } else {
        return false;
      }

    } catch (error) {
      return true;
    }
  }

  init() {
    const user = this.getUser();
    const token = this.getToken();
    const expiration = this.getExpiration();

    this.user$.next(user);
    this.token = token;
    this.expiration = expiration;

    if (!token || !user || !expiration) {
      return this.router.navigate(['/login']);
    }

    if (this.isExpire()) {
      return this.router.navigate(['/login']);
    }

    this.authorized$.next(true);
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/login`, { username, password }).pipe(
      map((res: any) => {
        if (!res || !res.token) {
          return throwError('Invalid token');
        }

        const token = res.token;
        const { user, expiration } = this.validateToken(token);

        if (!user || !expiration) {
          return throwError('Invalid token');
        }

        this.setUser(user);
        this.setToken(token);
        this.setExpiration(expiration);

        return token;
      }),
      map((token) => {
        this.authorized$.next(true);
        return token;
      })
    );
  }

  logout() {
    localStorage.removeItem(STORAGE_TOKEN);
    localStorage.removeItem(STORAGE_USER);
    localStorage.removeItem(STORAGE_TOKEN_EXPIRATE);
    this.authorized$.next(false);
    this.user$.next(null);
    this.token = null;
    this.expiration = null;

    this.router.navigate(['/login']);
  }

}
