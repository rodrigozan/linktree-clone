import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonMenuButton } from '@ionic/angular/standalone';

import { ThemeService } from '../../../Services/theme/theme.service';

import { HeaderComponent } from 'src/app/Components/header/header.component';

@Component({
  selector: 'app-theme-management',
  templateUrl: './theme-management.page.html',
  styleUrls: ['./theme-management.page.scss'],
  standalone: true,
  imports: [HeaderComponent, IonButton, IonButtons, IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ThemeManagementPage implements OnInit {
  title = 'Theme Management'

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    console.log(this.title)
  }

  toggleTheme(){
    this.themeService.toggleTheme()
  }

}
