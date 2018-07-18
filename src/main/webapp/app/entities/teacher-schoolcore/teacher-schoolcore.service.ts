import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITeacherSchoolcore } from 'app/shared/model/teacher-schoolcore.model';

type EntityResponseType = HttpResponse<ITeacherSchoolcore>;
type EntityArrayResponseType = HttpResponse<ITeacherSchoolcore[]>;

@Injectable({ providedIn: 'root' })
export class TeacherSchoolcoreService {
    private resourceUrl = SERVER_API_URL + 'api/teachers';

    constructor(private http: HttpClient) {}

    create(teacher: ITeacherSchoolcore): Observable<EntityResponseType> {
        return this.http.post<ITeacherSchoolcore>(this.resourceUrl, teacher, { observe: 'response' });
    }

    update(teacher: ITeacherSchoolcore): Observable<EntityResponseType> {
        return this.http.put<ITeacherSchoolcore>(this.resourceUrl, teacher, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITeacherSchoolcore>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITeacherSchoolcore[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
