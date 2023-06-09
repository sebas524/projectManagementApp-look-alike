import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, filter, map, tap } from 'rxjs';
import { CurrentUser } from '../interfaces/currentUser.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environments';
import { Register } from '../interfaces/register.interface';
import { Login } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  // ? what is behaviorSubject? it is a representation of streams. it is a stream that has a default value. in this case default value is undefined. this gets edited inside setCurrentUser method.
  // * it is either Currentuser | null | undefined bc undefined means we still havent done any fetching. once we have, the its either CurrentUser | null
  currentUser$ = new BehaviorSubject<CurrentUser | null | undefined>(undefined);

  // * here we transofrm the currentUser$ value to boolean:
  isLoggedIn$ = this.currentUser$.pipe(
    filter((currentUser) => {
      return currentUser !== undefined;
    }),
    map((currentUser) => {
      return Boolean(currentUser);
    })
  );

  getCurrentUser(): Observable<CurrentUser> {
    return this.http.get<CurrentUser>(`${environment.baseUrl}/user`);
    // * note: we wabnt to get the user every time when we load our app. why? because normally we store our current user in memory, and after login or register we store it in localstorage. so every time we are jumping into our app we would need to get current user. best way to do this is in app component.because this component loads once throughout the whole lifecyle.
  }

  register(registerReq: Register): Observable<CurrentUser> {
    return this.http.post<CurrentUser>(
      `${environment.baseUrl}/users`,
      registerReq
    );
    // * remember here also comes a token, we gotta save it to localstorage (setToken() takes care of that).
  }

  setToken(currentUser: CurrentUser): void {
    // * it is void because we dont need to return anything, just save to localstorage
    localStorage.setItem('PMtoken', currentUser.token);
  }

  login(user: Login): Observable<CurrentUser> {
    return this.http.post<CurrentUser>(
      `${environment.baseUrl}/users/login`,
      user
    );
  }

  setCurrentUser(currentUser: CurrentUser | null): void {
    this.currentUser$.next(currentUser);
    // * so here currentUser$ can be either CurrentUser|null
  }
}
