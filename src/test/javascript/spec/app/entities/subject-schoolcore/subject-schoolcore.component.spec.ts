/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SchoolhipsterJwtTestModule } from '../../../test.module';
import { SubjectSchoolcoreComponent } from 'app/entities/subject-schoolcore/subject-schoolcore.component';
import { SubjectSchoolcoreService } from 'app/entities/subject-schoolcore/subject-schoolcore.service';
import { SubjectSchoolcore } from 'app/shared/model/subject-schoolcore.model';

describe('Component Tests', () => {
    describe('SubjectSchoolcore Management Component', () => {
        let comp: SubjectSchoolcoreComponent;
        let fixture: ComponentFixture<SubjectSchoolcoreComponent>;
        let service: SubjectSchoolcoreService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolhipsterJwtTestModule],
                declarations: [SubjectSchoolcoreComponent],
                providers: []
            })
                .overrideTemplate(SubjectSchoolcoreComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SubjectSchoolcoreComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubjectSchoolcoreService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new SubjectSchoolcore(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.subjects[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
