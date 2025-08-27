import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ResourcesComponent } from './pages/resources/resources.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SolarComponent } from './pages/solar/solar.component';
import { KhaoLakComponent } from './pages/khao-lak/khao-lak.component';
import { ForgeComponent } from './pages/forge/forge.component';
import { BlogComponent } from './pages/blog/blog.component';
import { WebDevelopmentComponent } from './pages/web-development/web-development.component';
import { FormbyWebDesignComponent } from './pages/formby-web-design/formby-web-design.component';
import { LiverpoolWebDesignComponent } from './pages/liverpool-web-design/liverpool-web-design.component';
import { SouthportWebDesignComponent } from './pages/southport-web-design/southport-web-design.component';
import { ShopWebdesignSouthportComponent } from './pages/shop-webdesign-southport/shop-webdesign-southport.component';
import { AppsInfoComponent } from './pages/apps-info/apps-info.component';
import { PromptBuilderComponent } from './pages/prompt-builder/prompt-builder.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'solar', component: SolarComponent },
  { path: 'khao-lak', component: KhaoLakComponent },
  { path: 'forge', component: ForgeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'web-development', component: WebDevelopmentComponent },
  { path: 'formby-web-design', component: FormbyWebDesignComponent },
  { path: 'liverpool-web-design', component: LiverpoolWebDesignComponent },
  { path: 'southport-web-design', component: SouthportWebDesignComponent },
  { path: 'shop-webdesign-southport', component: ShopWebdesignSouthportComponent },
  { path: 'apps_info', component: AppsInfoComponent },
  { path: 'prompt-builder', component: PromptBuilderComponent },
  { path: '', redirectTo: 'prompt-builder', pathMatch: 'full' },

{
  path: 'hex-test',
  loadComponent: () => import('./pages/hex-test.component').then(m => m.HexTestComponent) 
}

];
