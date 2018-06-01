import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { LessonSchoolcore } from './lesson-schoolcore.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<LessonSchoolcore>;

@Injectable()
export class LessonSchoolcoreService {

    private resourceUrl =  SERVER_API_URL + 'api/lessons';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(lesson: LessonSchoolcore): Observable<EntityResponseType> {
        const copy = this.convert(lesson);
        return this.http.post<LessonSchoolcore>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(lesson: LessonSchoolcore): Observable<EntityResponseType> {
        const copy = this.convert(lesson);
        return this.http.put<LessonSchoolcore>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<LessonSchoolcore>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<LessonSchoolcore[]>> {
        const options = createRequestOption(req);
        return this.http.get<LessonSchoolcore[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<LessonSchoolcore[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: LessonSchoolcore = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<LessonSchoolcore[]>): HttpResponse<LessonSchoolcore[]> {
        const jsonResponse: LessonSchoolcore[] = res.body;
        const body: LessonSchoolcore[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to LessonSchoolcore.
     */
    private convertItemFromServer(lesson: LessonSchoolcore): LessonSchoolcore {
        const copy: LessonSchoolcore = Object.assign({}, lesson);
        copy.plannedStartTime = this.dateUtils
            .convertDateTimeFromServer(lesson.plannedStartTime);
        copy.plannedEndTime = this.dateUtils
            .convertDateTimeFromServer(lesson.plannedEndTime);
        copy.realStartDate = this.dateUtils
            .convertDateTimeFromServer(lesson.realStartDate);
        copy.realEndDate = this.dateUtils
            .convertDateTimeFromServer(lesson.realEndDate);
        return copy;
    }

    /**
     * Convert a LessonSchoolcore to a JSON which can be sent to the server.
     */
    private convert(lesson: LessonSchoolcore): LessonSchoolcore {
        const copy: LessonSchoolcore = Object.assign({}, lesson);

        copy.plannedStartTime = this.dateUtils.toDate(lesson.plannedStartTime);

        copy.plannedEndTime = this.dateUtils.toDate(lesson.plannedEndTime);

        copy.realStartDate = this.dateUtils.toDate(lesson.realStartDate);

        copy.realEndDate = this.dateUtils.toDate(lesson.realEndDate);
        return copy;
    }
}
