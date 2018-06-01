import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TeacherSchoolcoreComponent } from './teacher-schoolcore.component';
import { TeacherSchoolcoreDetailComponent } from './teacher-schoolcore-detail.component';
import { TeacherSchoolcorePopupComponent } from './teacher-schoolcore-dialog.component';
import { TeacherSchoolcoreDeletePopupComponent } from './teacher-schoolcore-delete-dialog.component';

export const teacherRoute: Routes = [
    {
        path: 'teacher-schoolcore',
        component: TeacherSchoolcoreComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.teacher.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'teacher-schoolcore/:id',
        component: TeacherSchoolcoreDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.teacher.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const teacherPopupRoute: Routes = [
    {
        path: 'teacher-schoolcore-new',
        component: TeacherSchoolcorePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.teacher.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'teacher-schoolcore/:id/edit',
        component: TeacherSchoolcorePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.teacher.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'teacher-schoolcore/:id/delete',
        component: TeacherSchoolcoreDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.teacher.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
