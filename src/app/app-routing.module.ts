import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { checkTokenGuard } from './guard/check-token.guard';
import { EditprofileComponent } from './auth/editprofile/editprofile.component';
import { EventDetaitsComponent } from './dashboard/event-detaits/event-detaits.component';
import { Error404Component } from './dashboard/error404/error404.component';
import { AddEventComponent } from './dashboard/add-event/add-event.component';
import { TableComponent } from './component/table/table.component';
import { AddUserInEventComponent } from './dashboard/add-user-in-event/add-user-in-event.component';

export const Approutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '404', component: Error404Component},
  {
    path: '',
    component: FullComponent,
    canActivate: [checkTokenGuard], // Add canActivate here
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'edit-profile', component: EditprofileComponent, canActivate: [checkTokenGuard] }, // Add canActivate here
      { path: 'dashboard/event/:id', component: EventDetaitsComponent, canActivate: [checkTokenGuard] }, // Add canActivate here
      { path: 'event/new', component: AddEventComponent, canActivate: [checkTokenGuard] }, // Add canActivate here
      { path: 'event/:code', component: TableComponent, canActivate: [checkTokenGuard] }, // Add canActivate here
      { path: 'event/:code/user/new', component: AddUserInEventComponent, canActivate: [checkTokenGuard] }, // Add canActivate here
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [checkTokenGuard] // Add canActivate here
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
        canActivate: [checkTokenGuard] // Add canActivate here
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule),
        canActivate: [checkTokenGuard] // Add canActivate here
      }
    ]
  },  
  { path: '**', redirectTo: '/dashboard' }
];
