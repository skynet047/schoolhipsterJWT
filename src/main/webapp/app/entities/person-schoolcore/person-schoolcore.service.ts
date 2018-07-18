import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPersonSchoolcore } from 'app/shared/model/person-schoolcore.model';

type EntityResponseType = HttpResponse<IPersonSchoolcore>;
type EntityArrayResponseType = HttpResponse<IPersonSchoolcore[]>;

@Injectable({ providedIn: 'root' })
export class PersonSchoolcoreService {
    private resourceUrl = SERVER_API_URL + 'api/people';

    constructor(private http: HttpClient) {}

    create(person: IPersonSchoolcore): Observable<EntityResponseType> {
        return this.http.post<IPersonSchoolcore>(this.resourceUrl, person, { observe: 'response' });
    }

    update(person: IPersonSchoolcore): Observable<EntityResponseType> {
        return this.http.put<IPersonSchoolcore>(this.resourceUrl, person, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPersonSchoolcore>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPersonSchoolcore[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
