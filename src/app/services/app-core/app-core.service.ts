import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TUser } from 'src/app/types/user';
import { CryptoService } from '../crypto/crypto.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppCoreService {
  private keys = environment.CRYPT;
  authToken: string | null = null;
  authenticationState = new BehaviorSubject(false);
  appUser = signal<TUser | null>(null);

  public cryptoService = inject(CryptoService);
  private router = inject(Router);

  constructor() {
    this.getAuthenticatedUser();
    this.getAuthenticatedToken();
  }

  setLocalData = async (key: string, value: any) => {
    await localStorage.setItem(
      key,
      this.cryptoService.encrypt(JSON.stringify(value))
    );
  };

  getLocalData = (key: string) => {
    let data = localStorage.getItem(key);

    if (!data) {
      return null;
    } else {
      data = this.cryptoService.decrypt(data);
    }

    return JSON.parse(data);
  };

  /**
   * It gets the token from the storage and decrypts it
   *
   * @returns A promise that resolves to a TokenInfo object.
   */
  async getAuthenticatedToken(): Promise<string> {
    let res = await localStorage.getItem('token');
    if (res !== null) {
      return new Promise((resolve, reject) => {
        try {
          this.authToken = this.cryptoService.decrypt(res, this.keys);

          resolve(this.authToken);
        } catch (e) {
          this.authToken = null;
          this.authenticationState.next(false);
          reject(e);
        }
      });
    } else {
      return new Promise((reject) => {
        const e = `Auth Token is undefined`;
        this.authToken = null;
        this.authenticationState.next(false);
        reject(e);
      });
    }
  }

  /**
   * It gets the user's token data from the local storage, decrypts it, and returns the decrypt data as
   * a promise
   *
   * @returns The user's information.
   */
  async getAuthenticatedUser(nextUser = true): Promise<any | TUser> {
    let res = localStorage.getItem('user');
    if (res !== null) {
      const user: TUser = JSON.parse(
        this.cryptoService.decrypt(res, this.keys)
      );
      if (nextUser) {
        this.appUser.set(user);
      }
      return new Promise((resolve) => {
        resolve(user);
      });
    }
    return null;
  }

  /**
   * It returns a promise that resolves to a boolean value
   *
   * @returns A boolean value.
   */
  async isAuthenticated(): Promise<boolean> {
    return this.authenticationState.value;
  }

  async setAuthenticatedToken(token: string) {
    this.authToken = token;
    await localStorage.setItem(
      'token',
      this.cryptoService.encrypt(token, this.keys)
    );
  }

  async setAuthenticatedUser(user: TUser) {
    await localStorage.setItem(
      'user',
      this.cryptoService.encrypt(JSON.stringify(user), this.keys)
    );
    this.appUser.set(user);
  }

  async logout(gotoLogin = true) {
    await localStorage.removeItem('token');
    await localStorage.removeItem('user');
    this.authToken = null;
    this.authenticationState.next(false);
    this.appUser.set(null);
    if (gotoLogin) {
      // document.location.href = `${environment.URL}/login`;
      this.router.navigate(['/login']);
    }
  }
}
