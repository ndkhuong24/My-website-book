import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AgGridModule } from 'ag-grid-angular';
import { provideClientHydration } from '@angular/platform-browser';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { provideHttpClient, withFetch } from '@angular/common/http'; 
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    SidebarComponent,
    HeaderComponent,
    AgGridModule,
    ToastrModule,
    importProvidersFrom(
      BrowserAnimationsModule,
      ToastrModule.forRoot(),
    ),
    provideHttpClient(withFetch()) 
  ]
};
