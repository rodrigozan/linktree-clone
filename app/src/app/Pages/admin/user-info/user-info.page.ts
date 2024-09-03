import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton,IonButtons, IonMenuButton  } from '@ionic/angular/standalone';

import { HeaderComponent } from 'src/app/Components/header/header.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
  standalone: true,
  imports: [HeaderComponent, IonButton, IonButtons, IonMenuButton ,IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class UserInfoPage implements OnInit {
  title = 'User Management'

  constructor() { }

  ngOnInit() {
    console.log(this.title)
  }

}
