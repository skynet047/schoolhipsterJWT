import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TeacherSchoolcore } from './teacher-schoolcore.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TeacherSchoolcore>;

@Injectable()
export class TeacherSchoolcoreService {

    private resourceUrl =  SERVER_API_URL + 'api/teachers';

    constructor(private http: HttpClient) { }

    create(teacher: TeacherSchoolcore): Observable<EntityResponseType> {
        const copy = this.convert(teacher);
        return this.http.post<TeacherSchoolcore>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(teacher: TeacherSchoolcore): Observable<EntityResponseType> {
        const copy = this.convert(teacher);
        return this.http.put<TeacherSchoolcore>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TeacherSchoolcore>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TeacherSchoolcore[]>> {
        const options = createRequestOption(req);
        return this.http.get<TeacherSchoolcore[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TeacherSchoolcore[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TeacherSchoolcore = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TeacherSchoolcore[]>): HttpResponse<TeacherSchoolcore[]> {
        const jsonResponse: TeacherSchoolcore[] = res.body;
        const body: TeacherSchoolcore[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TeacherSchoolcore.
     */
    private convertItemFromServer(teacher: TeacherSchoolcore): TeacherSchoolcore {
        const copy: TeacherSchoolcore = Object.assign({}, teacher);
        return copy;
    }

    /**
     * Convert a TeacherSchoolcore to a JSON which can be sent to the server.
     */
    private convert(teacher: TeacherSchoolcore): TeacherSchoolcore {
        const copy: TeacherSchoolcore = Object.assign({}, teacher);
        return copy;
    }
}
