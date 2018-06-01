import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PersonSchoolcoreComponent } from './person-schoolcore.component';
import { PersonSchoolcoreDetailComponent } from './person-schoolcore-detail.component';
import { PersonSchoolcorePopupComponent } from './person-schoolcore-dialog.component';
import { PersonSchoolcoreDeletePopupComponent } from './person-schoolcore-delete-dialog.component';

export const personRoute: Routes = [
    {
        path: 'person-schoolcore',
        component: PersonSchoolcoreComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.person.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'person-schoolcore/:id',
        component: PersonSchoolcoreDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.person.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const personPopupRoute: Routes = [
    {
        path: 'person-schoolcore-new',
        component: PersonSchoolcorePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.person.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'person-schoolcore/:id/edit',
        component: PersonSchoolcorePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.person.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'person-schoolcore/:id/delete',
        component: PersonSchoolcoreDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.person.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
