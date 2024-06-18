import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DepartmentComponent } from 'app/pages/department/department.component';
import { MunicipalitiesComponent } from 'app/pages/municipalities/municipalities.component';
import { RolesComponent } from 'app/pages/roles/roles.component';
import { UsersComponent } from 'app/pages/users/users.component';
import { MonitoringComponent } from 'app/pages/monitoring/monitoring.component';
import { NewUsersComponent } from 'app/pages/new-users/new-users.component';



export const DashboardRoutes: Routes = [{
    path: '',
    children: [
        {
            path: 'dashboard',
            component: DashboardComponent
        },
        {
            path: 'maintenance',
            component: MonitoringComponent
        },
        {
            path: 'department',
            component: DepartmentComponent
        },
        {
            path: 'municipalities',
            component: MunicipalitiesComponent
        },
        {
            path: 'users-list',
            component: UsersComponent
        },
        {
            path: 'new-user',
            component: NewUsersComponent
        },
        {
            path: 'roles',
            component: RolesComponent
        },
        {
            path: 'new-monitoring',
            component: MonitoringComponent
        },
    ]
}];
