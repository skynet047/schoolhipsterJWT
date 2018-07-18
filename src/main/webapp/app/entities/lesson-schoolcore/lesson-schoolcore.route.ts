import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { LessonSchoolcoreComponent } from './lesson-schoolcore.component';
import { LessonSchoolcoreDetailComponent } from './lesson-schoolcore-detail.component';
import { LessonSchoolcorePopupComponent } from './lesson-schoolcore-dialog.component';
import { LessonSchoolcoreDeletePopupComponent } from './lesson-schoolcore-delete-dialog.component';

@Injectable()
export class LessonSchoolcoreResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const lessonRoute: Routes = [
    {
        path: 'lesson-schoolcore',
        component: LessonSchoolcoreComponent,
        resolve: {
            'pagingParams': LessonSchoolcoreResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.lesson.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'lesson-schoolcore/:id',
        component: LessonSchoolcoreDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.lesson.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const lessonPopupRoute: Routes = [
    {
        path: 'lesson-schoolcore-new',
        component: LessonSchoolcorePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.lesson.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'lesson-schoolcore/:id/edit',
        component: LessonSchoolcorePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.lesson.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'lesson-schoolcore/:id/delete',
        component: LessonSchoolcoreDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolhipsterJwtApp.lesson.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
