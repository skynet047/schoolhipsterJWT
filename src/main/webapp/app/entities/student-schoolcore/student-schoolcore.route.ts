import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { StudentSchoolcoreComponent } from './student-schoolcore.component';
import { StudentSchoolcoreDetailComponent } from './student-schoolcore-detail.component';
import { StudentSchoolcorePopupComponent } from './student-schoolcore-dialog.component';
import { StudentSchoolcoreDeletePopupComponent } from './student-schoolcore-delete-dialog.component';

export const studentRoute: Routes = [
    {
        path: 'student-schoolcore',
        component: StudentSchoolcoreComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.student.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'student-schoolcore/:id',
        component: StudentSchoolcoreDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.student.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const studentPopupRoute: Routes = [
    {
        path: 'student-schoolcore-new',
        component: StudentSchoolcorePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.student.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'student-schoolcore/:id/edit',
        component: StudentSchoolcorePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.student.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'student-schoolcore/:id/delete',
        component: StudentSchoolcoreDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.student.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
