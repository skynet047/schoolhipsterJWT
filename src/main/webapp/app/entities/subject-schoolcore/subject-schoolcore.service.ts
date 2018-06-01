import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SubjectSchoolcore } from './subject-schoolcore.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SubjectSchoolcore>;

@Injectable()
export class SubjectSchoolcoreService {

    private resourceUrl =  SERVER_API_URL + 'api/subjects';

    constructor(private http: HttpClient) { }

    create(subject: SubjectSchoolcore): Observable<EntityResponseType> {
        const copy = this.convert(subject);
        return this.http.post<SubjectSchoolcore>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(subject: SubjectSchoolcore): Observable<EntityResponseType> {
        const copy = this.convert(subject);
        return this.http.put<SubjectSchoolcore>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SubjectSchoolcore>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SubjectSchoolcore[]>> {
        const options = createRequestOption(req);
        return this.http.get<SubjectSchoolcore[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SubjectSchoolcore[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SubjectSchoolcore = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SubjectSchoolcore[]>): HttpResponse<SubjectSchoolcore[]> {
        const jsonResponse: SubjectSchoolcore[] = res.body;
        const body: SubjectSchoolcore[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SubjectSchoolcore.
     */
    private convertItemFromServer(subject: SubjectSchoolcore): SubjectSchoolcore {
        const copy: SubjectSchoolcore = Object.assign({}, subject);
        return copy;
    }

    /**
     * Convert a SubjectSchoolcore to a JSON which can be sent to the server.
     */
    private convert(subject: SubjectSchoolcore): SubjectSchoolcore {
        const copy: SubjectSchoolcore = Object.assign({}, subject);
        return copy;
    }
}
