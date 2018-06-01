import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { StudentSchoolcore } from './student-schoolcore.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<StudentSchoolcore>;

@Injectable()
export class StudentSchoolcoreService {

    private resourceUrl =  SERVER_API_URL + 'api/students';

    constructor(private http: HttpClient) { }

    create(student: StudentSchoolcore): Observable<EntityResponseType> {
        const copy = this.convert(student);
        return this.http.post<StudentSchoolcore>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(student: StudentSchoolcore): Observable<EntityResponseType> {
        const copy = this.convert(student);
        return this.http.put<StudentSchoolcore>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<StudentSchoolcore>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<StudentSchoolcore[]>> {
        const options = createRequestOption(req);
        return this.http.get<StudentSchoolcore[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StudentSchoolcore[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: StudentSchoolcore = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<StudentSchoolcore[]>): HttpResponse<StudentSchoolcore[]> {
        const jsonResponse: StudentSchoolcore[] = res.body;
        const body: StudentSchoolcore[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to StudentSchoolcore.
     */
    private convertItemFromServer(student: StudentSchoolcore): StudentSchoolcore {
        const copy: StudentSchoolcore = Object.assign({}, student);
        return copy;
    }

    /**
     * Convert a StudentSchoolcore to a JSON which can be sent to the server.
     */
    private convert(student: StudentSchoolcore): StudentSchoolcore {
        const copy: StudentSchoolcore = Object.assign({}, student);
        return copy;
    }
}
