import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DepartmentComponent } from 'app/pages/department/department.component';
import { MunicipalitiesComponent } from 'app/pages/municipalities/municipalities.component';
import { RolesComponent } from 'app/pages/roles/roles.component';
import { UsersComponent } from 'app/pages/users/users.component';
import { MonitoringComponent } from 'app/pages/monitoring/monitoring.component';
import { MaintenanceComponent } from 'app/pages/maintenance/maintenance.component';
import { CreateQuestionComponent } from 'app/pages/create-question/create-question.component';
import { EditeQuestionComponent } from 'app/pages/edite-question/edite-question.component';
import { ServeysComponent } from 'app/pages/serveys/serveys.component';
import { MonitoringDetailComponent } from 'app/pages/monitoring-detail/monitoring-detail.component';
import { NewUsersComponent } from 'app/pages/new-users/new-users.component';


export const DashboardRoutes: Routes = [{
    path: '',
    children: [
        {
            path: 'dashboard',
            component: DashboardComponent
        },
        {
            path: 'monitoring',
            component: ServeysComponent
        },
        {
            path: 'create-question',
            component: CreateQuestionComponent
        },
        {
            path: 'edite-question',
            component: EditeQuestionComponent
        },
        {
            path: 'maintenance',
            component: MaintenanceComponent
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

        {
            path: 'monitoring-detail/:id',
            component: MonitoringDetailComponent
        },
    ]
}];
