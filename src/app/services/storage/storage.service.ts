import { Injectable } from '@angular/core';
import localforage from 'localforage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {
    localforage.config({
      name: 'myApp',
      version: 1.0,
      storeName: 'keyvaluepairs', // Should be alphanumeric, with underscores
      description: 'Some description',
    });

  }

  async setItem(key: string, value: any): Promise<void> {
    try {
      await localforage.setItem(key, value);
      console.log('Data saved');
    } catch (err) {
      console.error('Failed to save data', err);
    }
  }

  async getItem(key: string): Promise<any> {
    try {
      const value = await localforage.getItem(key);
      return value;
    } catch (err) {
      console.error('Failed to get data', err);
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await localforage.removeItem(key);
      console.log('Data removed');
    } catch (err) {
      console.error('Failed to remove data', err);
    }
  }
}
