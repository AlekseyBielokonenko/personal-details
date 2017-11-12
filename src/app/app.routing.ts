import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonalDetailsRootComponent } from './components/personal-details/personal-details-root/personal-details-root.component';
import { PersonalTabComponent } from './components/personal-details/personal-tab/personal-tab.component';
import { LocationTabComponent } from './components/personal-details/location-tab/location-tab.component';

import { HelloComponent } from './components/hello/hello.component';


const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'hello' },
    { path: 'hello', component: HelloComponent },
    {
        path: 'personal-details',
        component: PersonalDetailsRootComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'personal' },
            { path: 'personal', component: PersonalTabComponent },
            { path: 'location', component: LocationTabComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            enableTracing: false
        })
    ],
    exports: [
        RouterModule
    ],
})
export class AppRoutingModule {
}
