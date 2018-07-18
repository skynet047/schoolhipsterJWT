import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LessonSchoolcore } from 'app/shared/model/lesson-schoolcore.model';
import { LessonSchoolcoreService } from './lesson-schoolcore.service';
import { LessonSchoolcoreComponent } from './lesson-schoolcore.component';
import { LessonSchoolcoreDetailComponent } from './lesson-schoolcore-detail.component';
import { LessonSchoolcoreUpdateComponent } from './lesson-schoolcore-update.component';
import { LessonSchoolcoreDeletePopupComponent } from './lesson-schoolcore-delete-dialog.component';
import { ILessonSchoolcore } from 'app/shared/model/lesson-schoolcore.model';

@Injectable({ providedIn: 'root' })
export class LessonSchoolcoreResolve implements Resolve<ILessonSchoolcore> {
    constructor(private service: LessonSchoolcoreService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((lesson: HttpResponse<LessonSchoolcore>) => lesson.body));
        }
        return of(new LessonSchoolcore());
    }
}

export const lessonRoute: Routes = [
    {
        path: 'lesson-schoolcore',
        component: LessonSchoolcoreComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'schoolhipsterJwtApp.lesson.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'lesson-schoolcore/:id/view',
        component: LessonSchoolcoreDetailComponent,
        resolve: {
            lesson: LessonSchoolcoreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.lesson.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'lesson-schoolcore/new',
        component: LessonSchoolcoreUpdateComponent,
        resolve: {
            lesson: LessonSchoolcoreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.lesson.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'lesson-schoolcore/:id/edit',
        component: LessonSchoolcoreUpdateComponent,
        resolve: {
            lesson: LessonSchoolcoreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.lesson.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const lessonPopupRoute: Routes = [
    {
        path: 'lesson-schoolcore/:id/delete',
        component: LessonSchoolcoreDeletePopupComponent,
        resolve: {
            lesson: LessonSchoolcoreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.lesson.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
