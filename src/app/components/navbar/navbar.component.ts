import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { SeedService } from '../../services/seed.service';
import { RegisterComponent } from "../register/register.component";
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { IconComponent } from "../icon/icon.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, RegisterComponent, CommonModule, LoginComponent, IconComponent, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {




  constructor(private authService:AuthService, private seedService:SeedService) {
    this.authService = authService;
    this.seedService = seedService;
  }

  ngOnInit() {
    console.log(this.primaryColor)
    this.darkMode = document.body.getAttribute('data-bs-theme') === 'dark';
    if (this.darkMode) {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
    this.colorMode = document.body.getAttribute('data-bs-color-mode') || '';
    if (this.colorMode) {
      this.setColorMode(this.colorMode);
    } else {
      this.colorMode = '';
    }
    this.primaryColor= this.colors[Math.floor(Math.random() * this.colors.length)];
    this.secondaryColor = this.primarySecondaryAssociations[this.primaryColor as keyof typeof this.primarySecondaryAssociations];  
    this.setPrimaryColor(this.primaryColor);
    this.colorMode = this.colorModes[Math.floor(Math.random() * this.colorModes.length)];
    if (this.colorMode === '-pastel') {
      this.enableDarkMode();
    } else if (this.colorMode === '-dark') {
      this.disableDarkMode();
    }
    this.setChangeColorMode(this.colorMode);
  }

  primaryColor: string = '';
  secondaryColor: string = '';
  showLogin: boolean = false;
  showRegister: boolean = false;
  activeTab: string = 'home';
  darkMode: boolean = false;
  theme: string = 'light';

  colorMode: string = '';
  themes = [
    'dark',
  'light',
  'paper',
  'dark-paper',
  'light-paper',
  'sunrise',
  'sunset',
  'ocean',
  'forest',
  'desert',
  'autumn',
  'winter',
  'spring'
  ]

  colors = 
  [
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'cyan',
    'blue',
    'indigo',
    'purple',
    'pink',
    'gray',
    'gray-dark'
  ]

  primarySecondaryAssociations = {
    'red': 'pink',
    'orange': 'blue',
    'yellow': 'cyan',
    'green': 'blue',
    'teal': 'indigo',
    'cyan': 'purple',
    'blue': 'red',
    'indigo': 'orange',
    'purple': 'yellow',
    'pink': 'green',
  }

  colorModes = [
    '-pastel',
    '-dark',
    ''
  ];


  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  loggedIn() {
    return this.authService.isLoggedIn();
  }
  logout() {
    this.authService.logout();
    window.location.reload();
  }
  isAdmin() {
    return this.authService.isAdmin();
  }
  isStaff() {
    return this.authService.isStaff();
  }
  isUser() {
    return this.authService.isUser();
  }
  isSeeded() {
    return this.seedService.seeded;
  }
  seedData() {
    this.seedService.seed().subscribe((data)=>{
      window.location.reload();
    });
  }
  getName() {
    return this.authService.getName();
    }
  enableDarkMode() {
    document.body.setAttribute('data-bs-theme', 'dark');
    this.darkMode = true;
  }
  disableDarkMode() {
    document.body.setAttribute('data-bs-theme', 'light');
    this.darkMode = false;
  }
  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
  }
  setColorMode(colorMode: string) {
    if( colorMode.startsWith('-')) {
      colorMode = colorMode.substring(1);
    } else if (colorMode === '') {
      colorMode = 'normal';
    }
    document.body.setAttribute('data-bs-color-mode', colorMode);
  }
  changeTheme(event : Event) {
    // const theme = (event.target as HTMLSelectElement).value;
    // this.theme = theme;
    console.log(this.theme);
    document.body.setAttribute('data-bs-theme', this.theme);
  }

  setPrimaryColor(color: string) {
    document.body.style.setProperty('--bs-primary', 'var(--bs-' + color + this.colorMode + ')');
    document.body.style.setProperty('--bs-primary-gradient', 'var(--bs-' + color +this.colorMode+ '-gradient)');
    document.body.style.setProperty('--bs-primary-rgb', 'var(--bs-' + color + this.colorMode + '-rgb)');
    this.primaryColor = color;
    this.secondaryColor = this.primarySecondaryAssociations[color as keyof typeof this.primarySecondaryAssociations];
    document.body.style.setProperty('--bs-secondary', 'var(--bs-' + this.secondaryColor + this.colorMode + ')');
    document.body.style.setProperty('--bs-secondary-gradient', 'var(--bs-' + this.secondaryColor + this.colorMode + '-gradient)');
    document.body.style.setProperty('--bs-secondary-rgb', 'var(--bs-' + this.secondaryColor + this.colorMode + '-rgb)');
  }

  setChangeColorMode(colorMode: string) {
    this.setColorMode(colorMode);
    document.body.style.setProperty('--bs-primary', 'var(--bs-' + this.primaryColor + colorMode + ')');
    document.body.style.setProperty('--bs-primary-gradient', 'var(--bs-' + this.primaryColor + colorMode + '-gradient)');
    document.body.style.setProperty('--bs-primary-rgb', 'var(--bs-' + this.primaryColor + colorMode + '-rgb)');
    document.body.style.setProperty('--bs-secondary', 'var(--bs-' + this.secondaryColor + this.colorMode + ')');
    document.body.style.setProperty('--bs-secondary-gradient', 'var(--bs-' + this.secondaryColor + this.colorMode + '-gradient)');
    document.body.style.setProperty('--bs-secondary-rgb', 'var(--bs-' + this.secondaryColor + this.colorMode + '-rgb)');
    this.colorMode = colorMode;
  }

  changePrimaryColor(event : Event) {
    const color = (event.target as HTMLSelectElement).value;
    this.setPrimaryColor(color);
  }
  changeColorMode(event : Event) {
    const colorMode = (event.target as HTMLSelectElement).value;
    this.setChangeColorMode(colorMode);
  }
}
