/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SchoolhipsterJwtTestModule } from '../../../test.module';
import { StudentSchoolcoreComponent } from '../../../../../../main/webapp/app/entities/student-schoolcore/student-schoolcore.component';
import { StudentSchoolcoreService } from '../../../../../../main/webapp/app/entities/student-schoolcore/student-schoolcore.service';
import { StudentSchoolcore } from '../../../../../../main/webapp/app/entities/student-schoolcore/student-schoolcore.model';

describe('Component Tests', () => {

    describe('StudentSchoolcore Management Component', () => {
        let comp: StudentSchoolcoreComponent;
        let fixture: ComponentFixture<StudentSchoolcoreComponent>;
        let service: StudentSchoolcoreService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolhipsterJwtTestModule],
                declarations: [StudentSchoolcoreComponent],
                providers: [
                    StudentSchoolcoreService
                ]
            })
            .overrideTemplate(StudentSchoolcoreComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StudentSchoolcoreComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StudentSchoolcoreService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new StudentSchoolcore(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.students[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
