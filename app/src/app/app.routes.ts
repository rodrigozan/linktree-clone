import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'user-info',
    loadComponent: () => import('./Pages/admin/user-info/user-info.page').then( m => m.UserInfoPage)
  },
  {
    path: 'user-links',
    loadComponent: () => import('./Pages/admin/user-links/user-links.page').then( m => m.UserLinksPage)
  },
  {
    path: 'theme-management',
    loadComponent: () => import('./Pages/admin/theme-management/theme-management.page').then( m => m.ThemeManagementPage)
  },
];
