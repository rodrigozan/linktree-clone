import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';

import { HeaderComponent } from 'src/app/Components/header/header.component';
import { addIcons } from "ionicons";

@Component({
  selector: 'app-user-links',
  templateUrl: './user-links.page.html',
  styleUrls: ['./user-links.page.scss'],
  standalone: true,
  imports: [HeaderComponent, RouterLink, IonButton, IonButtons, IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, CommonModule, FormsModule]
})
export class UserLinksPage implements OnInit {
  title = 'Links Management'

  links = [
    { link: 'https://google.com', text: 'Percy Jackson e os Olimpianos' },
    { link: '', text: 'Harry Potter' },
    { link: '', text: 'As Crônicas dos Kane' },
    { link: '', text: 'A Lista das Crianças Más'},
    { link: '', text: 'A Filha do Tempo'},
    { link: '', text: 'Miguel Oliveira e os Deuses Brazucas'},
  ]

  constructor() { }

  ngOnInit() {
    console.log(this.title)
  }

  goTo(link: string){
    if(link) window.open(link, '_blank')
  }

}
