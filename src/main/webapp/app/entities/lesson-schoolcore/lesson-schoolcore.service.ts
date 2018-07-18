import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILessonSchoolcore } from 'app/shared/model/lesson-schoolcore.model';

type EntityResponseType = HttpResponse<ILessonSchoolcore>;
type EntityArrayResponseType = HttpResponse<ILessonSchoolcore[]>;

@Injectable({ providedIn: 'root' })
export class LessonSchoolcoreService {
    private resourceUrl = SERVER_API_URL + 'api/lessons';

    constructor(private http: HttpClient) {}

    create(lesson: ILessonSchoolcore): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(lesson);
        return this.http
            .post<ILessonSchoolcore>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(lesson: ILessonSchoolcore): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(lesson);
        return this.http
            .put<ILessonSchoolcore>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ILessonSchoolcore>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ILessonSchoolcore[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(lesson: ILessonSchoolcore): ILessonSchoolcore {
        const copy: ILessonSchoolcore = Object.assign({}, lesson, {
            plannedStartTime:
                lesson.plannedStartTime != null && lesson.plannedStartTime.isValid() ? lesson.plannedStartTime.toJSON() : null,
            plannedEndTime: lesson.plannedEndTime != null && lesson.plannedEndTime.isValid() ? lesson.plannedEndTime.toJSON() : null,
            realStartDate: lesson.realStartDate != null && lesson.realStartDate.isValid() ? lesson.realStartDate.toJSON() : null,
            realEndDate: lesson.realEndDate != null && lesson.realEndDate.isValid() ? lesson.realEndDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.plannedStartTime = res.body.plannedStartTime != null ? moment(res.body.plannedStartTime) : null;
        res.body.plannedEndTime = res.body.plannedEndTime != null ? moment(res.body.plannedEndTime) : null;
        res.body.realStartDate = res.body.realStartDate != null ? moment(res.body.realStartDate) : null;
        res.body.realEndDate = res.body.realEndDate != null ? moment(res.body.realEndDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((lesson: ILessonSchoolcore) => {
            lesson.plannedStartTime = lesson.plannedStartTime != null ? moment(lesson.plannedStartTime) : null;
            lesson.plannedEndTime = lesson.plannedEndTime != null ? moment(lesson.plannedEndTime) : null;
            lesson.realStartDate = lesson.realStartDate != null ? moment(lesson.realStartDate) : null;
            lesson.realEndDate = lesson.realEndDate != null ? moment(lesson.realEndDate) : null;
        });
        return res;
    }
}
