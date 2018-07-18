import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StudentSchoolcore } from 'app/shared/model/student-schoolcore.model';
import { StudentSchoolcoreService } from './student-schoolcore.service';
import { StudentSchoolcoreComponent } from './student-schoolcore.component';
import { StudentSchoolcoreDetailComponent } from './student-schoolcore-detail.component';
import { StudentSchoolcoreUpdateComponent } from './student-schoolcore-update.component';
import { StudentSchoolcoreDeletePopupComponent } from './student-schoolcore-delete-dialog.component';
import { IStudentSchoolcore } from 'app/shared/model/student-schoolcore.model';

@Injectable({ providedIn: 'root' })
export class StudentSchoolcoreResolve implements Resolve<IStudentSchoolcore> {
    constructor(private service: StudentSchoolcoreService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((student: HttpResponse<StudentSchoolcore>) => student.body));
        }
        return of(new StudentSchoolcore());
    }
}

export const studentRoute: Routes = [
    {
        path: 'student-schoolcore',
        component: StudentSchoolcoreComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.student.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'student-schoolcore/:id/view',
        component: StudentSchoolcoreDetailComponent,
        resolve: {
            student: StudentSchoolcoreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.student.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'student-schoolcore/new',
        component: StudentSchoolcoreUpdateComponent,
        resolve: {
            student: StudentSchoolcoreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.student.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'student-schoolcore/:id/edit',
        component: StudentSchoolcoreUpdateComponent,
        resolve: {
            student: StudentSchoolcoreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.student.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const studentPopupRoute: Routes = [
    {
        path: 'student-schoolcore/:id/delete',
        component: StudentSchoolcoreDeletePopupComponent,
        resolve: {
            student: StudentSchoolcoreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.student.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
