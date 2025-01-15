import { Routes } from '@angular/router';
import { DisplayResultsComponent } from './display-results/display-results.component';
import { ConfigurationComponent } from './configuration/configuration.component';

export const routeConfig: Routes = [
    {
      path: 'configuration',
      component: ConfigurationComponent,
      title: 'Configuration'
    },
    {
      path: '',
      component: DisplayResultsComponent,
      title: 'Display Results'
    }
];
  