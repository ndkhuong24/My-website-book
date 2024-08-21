import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AgGridModule } from 'ag-grid-angular';
import { provideClientHydration } from '@angular/platform-browser';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    SidebarComponent,
    HeaderComponent,
    AgGridModule, // Chỉ cần import AgGridModule
    provideHttpClient()
  ]
};
