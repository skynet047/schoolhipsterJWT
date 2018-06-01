/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SchoolhipsterJwtTestModule } from '../../../test.module';
import { SubjectSchoolcoreComponent } from '../../../../../../main/webapp/app/entities/subject-schoolcore/subject-schoolcore.component';
import { SubjectSchoolcoreService } from '../../../../../../main/webapp/app/entities/subject-schoolcore/subject-schoolcore.service';
import { SubjectSchoolcore } from '../../../../../../main/webapp/app/entities/subject-schoolcore/subject-schoolcore.model';

describe('Component Tests', () => {

    describe('SubjectSchoolcore Management Component', () => {
        let comp: SubjectSchoolcoreComponent;
        let fixture: ComponentFixture<SubjectSchoolcoreComponent>;
        let service: SubjectSchoolcoreService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolhipsterJwtTestModule],
                declarations: [SubjectSchoolcoreComponent],
                providers: [
                    SubjectSchoolcoreService
                ]
            })
            .overrideTemplate(SubjectSchoolcoreComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubjectSchoolcoreComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubjectSchoolcoreService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SubjectSchoolcore(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.subjects[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
