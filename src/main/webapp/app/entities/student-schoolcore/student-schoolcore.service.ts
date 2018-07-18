import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStudentSchoolcore } from 'app/shared/model/student-schoolcore.model';

type EntityResponseType = HttpResponse<IStudentSchoolcore>;
type EntityArrayResponseType = HttpResponse<IStudentSchoolcore[]>;

@Injectable({ providedIn: 'root' })
export class StudentSchoolcoreService {
    private resourceUrl = SERVER_API_URL + 'api/students';

    constructor(private http: HttpClient) {}

    create(student: IStudentSchoolcore): Observable<EntityResponseType> {
        return this.http.post<IStudentSchoolcore>(this.resourceUrl, student, { observe: 'response' });
    }

    update(student: IStudentSchoolcore): Observable<EntityResponseType> {
        return this.http.put<IStudentSchoolcore>(this.resourceUrl, student, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IStudentSchoolcore>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IStudentSchoolcore[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
