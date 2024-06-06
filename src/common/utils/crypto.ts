import crypto from 'crypto-js';

import { VITE_CLIENT_SECRET } from '../utils/constants';
import { UserData } from '../types';

const secretKey = VITE_CLIENT_SECRET || 'supersecret';

export const encrypt = (plainText: string) => {
  const cipherText = crypto.AES.encrypt(plainText, secretKey).toString();
  return cipherText;
};

export const decrypt = (cipherText: string) => {
  const bytes = crypto.AES.decrypt(cipherText, secretKey);
  const plainText = bytes.toString(crypto.enc.Utf8);
  return plainText;
};

export const encryptUser = (user: UserData) => {
  return encrypt(JSON.stringify(user));
};

export const decryptUser = (encryptedUser: string) => {
  return JSON.parse(decrypt(encryptedUser) || 'undefined') as
    | UserData
    | undefined;
};
