import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';

import { ThemeService } from '../Services/theme/theme.service';
import { addIcons } from "ionicons";

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: true,
  imports: [IonButton, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  toggleTheme(){
    this.themeService.toggleTheme()
  }
}
