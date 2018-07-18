import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubjectSchoolcore } from 'app/shared/model/subject-schoolcore.model';
import { SubjectSchoolcoreService } from './subject-schoolcore.service';
import { SubjectSchoolcoreComponent } from './subject-schoolcore.component';
import { SubjectSchoolcoreDetailComponent } from './subject-schoolcore-detail.component';
import { SubjectSchoolcoreUpdateComponent } from './subject-schoolcore-update.component';
import { SubjectSchoolcoreDeletePopupComponent } from './subject-schoolcore-delete-dialog.component';
import { ISubjectSchoolcore } from 'app/shared/model/subject-schoolcore.model';

@Injectable({ providedIn: 'root' })
export class SubjectSchoolcoreResolve implements Resolve<ISubjectSchoolcore> {
    constructor(private service: SubjectSchoolcoreService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((subject: HttpResponse<SubjectSchoolcore>) => subject.body));
        }
        return of(new SubjectSchoolcore());
    }
}

export const subjectRoute: Routes = [
    {
        path: 'subject-schoolcore',
        component: SubjectSchoolcoreComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.subject.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'subject-schoolcore/:id/view',
        component: SubjectSchoolcoreDetailComponent,
        resolve: {
            subject: SubjectSchoolcoreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.subject.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'subject-schoolcore/new',
        component: SubjectSchoolcoreUpdateComponent,
        resolve: {
            subject: SubjectSchoolcoreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.subject.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'subject-schoolcore/:id/edit',
        component: SubjectSchoolcoreUpdateComponent,
        resolve: {
            subject: SubjectSchoolcoreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.subject.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const subjectPopupRoute: Routes = [
    {
        path: 'subject-schoolcore/:id/delete',
        component: SubjectSchoolcoreDeletePopupComponent,
        resolve: {
            subject: SubjectSchoolcoreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.subject.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
