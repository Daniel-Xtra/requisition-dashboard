import { Injectable } from '@angular/core';
import * as Crypto from 'crypto-js';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private keys = environment.CRYPT;
  constructor() {}

  encrypt(value: string, keys: string | null = null): string {
    let iv: Crypto.lib.WordArray;

    const encrypted = Crypto.AES.encrypt(
      Crypto.enc.Utf8.parse(value.toString()),
      this.keys,
      {
        keySize: 128 / 8,
        iv,
        mode: Crypto.mode.CBC,
        padding: Crypto.pad.Pkcs7,
      }
    );

    return encrypted.toString();
  }

  decrypt(value: string, keys: string | null = null): string {
    let iv: Crypto.lib.WordArray;

    const decrypted = Crypto.AES.decrypt(value, this.keys, {
      keySize: 128 / 8,
      iv,
      mode: Crypto.mode.CBC,
      padding: Crypto.pad.Pkcs7,
    });
    return decrypted.toString(Crypto.enc.Utf8);
  }
}
