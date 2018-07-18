import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SubjectSchoolcoreComponent } from './subject-schoolcore.component';
import { SubjectSchoolcoreDetailComponent } from './subject-schoolcore-detail.component';
import { SubjectSchoolcorePopupComponent } from './subject-schoolcore-dialog.component';
import { SubjectSchoolcoreDeletePopupComponent } from './subject-schoolcore-delete-dialog.component';

export const subjectRoute: Routes = [
    {
        path: 'subject-schoolcore',
        component: SubjectSchoolcoreComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.subject.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'subject-schoolcore/:id',
        component: SubjectSchoolcoreDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.subject.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const subjectPopupRoute: Routes = [
    {
        path: 'subject-schoolcore-new',
        component: SubjectSchoolcorePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.subject.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'subject-schoolcore/:id/edit',
        component: SubjectSchoolcorePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.subject.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'subject-schoolcore/:id/delete',
        component: SubjectSchoolcoreDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.subject.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
