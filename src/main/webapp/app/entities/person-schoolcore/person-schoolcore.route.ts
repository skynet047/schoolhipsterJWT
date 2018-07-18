import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PersonSchoolcore } from 'app/shared/model/person-schoolcore.model';
import { PersonSchoolcoreService } from './person-schoolcore.service';
import { PersonSchoolcoreComponent } from './person-schoolcore.component';
import { PersonSchoolcoreDetailComponent } from './person-schoolcore-detail.component';
import { PersonSchoolcoreUpdateComponent } from './person-schoolcore-update.component';
import { PersonSchoolcoreDeletePopupComponent } from './person-schoolcore-delete-dialog.component';
import { IPersonSchoolcore } from 'app/shared/model/person-schoolcore.model';

@Injectable({ providedIn: 'root' })
export class PersonSchoolcoreResolve implements Resolve<IPersonSchoolcore> {
    constructor(private service: PersonSchoolcoreService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((person: HttpResponse<PersonSchoolcore>) => person.body));
        }
        return of(new PersonSchoolcore());
    }
}

export const personRoute: Routes = [
    {
        path: 'person-schoolcore',
        component: PersonSchoolcoreComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.person.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'person-schoolcore/:id/view',
        component: PersonSchoolcoreDetailComponent,
        resolve: {
            person: PersonSchoolcoreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.person.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'person-schoolcore/new',
        component: PersonSchoolcoreUpdateComponent,
        resolve: {
            person: PersonSchoolcoreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.person.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'person-schoolcore/:id/edit',
        component: PersonSchoolcoreUpdateComponent,
        resolve: {
            person: PersonSchoolcoreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.person.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const personPopupRoute: Routes = [
    {
        path: 'person-schoolcore/:id/delete',
        component: PersonSchoolcoreDeletePopupComponent,
        resolve: {
            person: PersonSchoolcoreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.person.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
