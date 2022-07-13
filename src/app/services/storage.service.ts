import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  setLocal = (name: string, value: any) => {
    localStorage.setItem(name, JSON.stringify(value))
  }

  getLocal = (name: string) => {
    const value = localStorage.getItem(name)
    if(value) {
      return JSON.parse(value)
    }

    return value
  }
}
