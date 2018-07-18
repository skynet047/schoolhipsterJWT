import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeacherSchoolcore } from 'app/shared/model/teacher-schoolcore.model';
import { TeacherSchoolcoreService } from './teacher-schoolcore.service';
import { TeacherSchoolcoreComponent } from './teacher-schoolcore.component';
import { TeacherSchoolcoreDetailComponent } from './teacher-schoolcore-detail.component';
import { TeacherSchoolcoreUpdateComponent } from './teacher-schoolcore-update.component';
import { TeacherSchoolcoreDeletePopupComponent } from './teacher-schoolcore-delete-dialog.component';
import { ITeacherSchoolcore } from 'app/shared/model/teacher-schoolcore.model';

@Injectable({ providedIn: 'root' })
export class TeacherSchoolcoreResolve implements Resolve<ITeacherSchoolcore> {
    constructor(private service: TeacherSchoolcoreService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((teacher: HttpResponse<TeacherSchoolcore>) => teacher.body));
        }
        return of(new TeacherSchoolcore());
    }
}

export const teacherRoute: Routes = [
    {
        path: 'teacher-schoolcore',
        component: TeacherSchoolcoreComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.teacher.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'teacher-schoolcore/:id/view',
        component: TeacherSchoolcoreDetailComponent,
        resolve: {
            teacher: TeacherSchoolcoreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.teacher.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'teacher-schoolcore/new',
        component: TeacherSchoolcoreUpdateComponent,
        resolve: {
            teacher: TeacherSchoolcoreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.teacher.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'teacher-schoolcore/:id/edit',
        component: TeacherSchoolcoreUpdateComponent,
        resolve: {
            teacher: TeacherSchoolcoreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.teacher.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const teacherPopupRoute: Routes = [
    {
        path: 'teacher-schoolcore/:id/delete',
        component: TeacherSchoolcoreDeletePopupComponent,
        resolve: {
            teacher: TeacherSchoolcoreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.teacher.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
