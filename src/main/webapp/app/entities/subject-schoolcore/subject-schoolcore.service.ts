import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISubjectSchoolcore } from 'app/shared/model/subject-schoolcore.model';

type EntityResponseType = HttpResponse<ISubjectSchoolcore>;
type EntityArrayResponseType = HttpResponse<ISubjectSchoolcore[]>;

@Injectable({ providedIn: 'root' })
export class SubjectSchoolcoreService {
    private resourceUrl = SERVER_API_URL + 'api/subjects';

    constructor(private http: HttpClient) {}

    create(subject: ISubjectSchoolcore): Observable<EntityResponseType> {
        return this.http.post<ISubjectSchoolcore>(this.resourceUrl, subject, { observe: 'response' });
    }

    update(subject: ISubjectSchoolcore): Observable<EntityResponseType> {
        return this.http.put<ISubjectSchoolcore>(this.resourceUrl, subject, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISubjectSchoolcore>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISubjectSchoolcore[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
