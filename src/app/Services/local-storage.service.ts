import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    try {
      const storedItem = localStorage.getItem(key);
      return storedItem !== null ? JSON.parse(storedItem) : null;
    } catch (error) {
      console.error('Error al analizar JSON desde localStorage:', error);
      return null;
    }
  }
  

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
