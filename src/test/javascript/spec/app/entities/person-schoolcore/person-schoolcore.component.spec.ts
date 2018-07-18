/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SchoolhipsterJwtTestModule } from '../../../test.module';
import { PersonSchoolcoreComponent } from 'app/entities/person-schoolcore/person-schoolcore.component';
import { PersonSchoolcoreService } from 'app/entities/person-schoolcore/person-schoolcore.service';
import { PersonSchoolcore } from 'app/shared/model/person-schoolcore.model';

describe('Component Tests', () => {
    describe('PersonSchoolcore Management Component', () => {
        let comp: PersonSchoolcoreComponent;
        let fixture: ComponentFixture<PersonSchoolcoreComponent>;
        let service: PersonSchoolcoreService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolhipsterJwtTestModule],
                declarations: [PersonSchoolcoreComponent],
                providers: []
            })
                .overrideTemplate(PersonSchoolcoreComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PersonSchoolcoreComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonSchoolcoreService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PersonSchoolcore(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.people[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
