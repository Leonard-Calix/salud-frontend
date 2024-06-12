import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { isAuthenticatedGuard } from './guards/is-authenticate.guard';
import { isNotAuthenticateGuard } from './guards/is-not-authenticate.guard';

export const AppRoutes: Routes = [
    {
        path: '',
        //redirectTo: '/dashboard',
        redirectTo: 'pages/login',
        pathMatch: 'full',
    },
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [isAuthenticatedGuard],
        children: [{
            path: '',
            loadChildren: () => import('./dashboard/dashboard.module').then(x => x.DashboardModule)
        },
        /*{
            path: 'components',
            loadChildren: () => import('./components/components.module').then(x => x.ComponentsModule)
        }, {
            path: 'forms',
            loadChildren: () => import('./forms/forms.module').then(x => x.Forms)
        }, {
            path: 'tables',
            loadChildren: () => import('./tables/tables.module').then(x => x.TablesModule)
        }, {
            path: 'maps',
            loadChildren: () => import('./maps/maps.module').then(x => x.MapsModule)
        }, {
            path: 'charts',
            loadChildren: () => import('./charts/charts.module').then(x => x.ChartsModule)
        }, {
            path: 'calendar',
            loadChildren: () => import('./calendar/calendar.module').then(x => x.CalendarModule)
        }, 
        */{
            path: '',
            loadChildren: () => import('./userpage/user.module').then(x => x.UserModule)
        }
    ]
    }, {
        path: '',
        component: AuthLayoutComponent,
        canActivate: [isNotAuthenticateGuard],
        children: [{
            path: 'pages',
            loadChildren: () => import('./pages/pages.module').then(x => x.PagesModule)
        }]
    }
];
