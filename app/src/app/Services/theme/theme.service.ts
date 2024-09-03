import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme = 'light-theme'

  constructor() {
    const savedTheme = localStorage.getItem('selected-theme');
    if (savedTheme) {
      this.currentTheme = savedTheme;
      this.setTheme(this.currentTheme);
    }
  }

  setTheme(theme: string){
    document.body.classList.remove(this.currentTheme)
    document.body.classList.add(theme)
    this.currentTheme = theme
    localStorage.setItem('selected-theme', theme)
  }
  
  toggleTheme(){
    const newTheme = this.currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
    this.setTheme(newTheme);
  }
}
