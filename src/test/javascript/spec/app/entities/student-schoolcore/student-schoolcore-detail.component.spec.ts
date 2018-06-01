/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SchoolhipsterJwtTestModule } from '../../../test.module';
import { StudentSchoolcoreDetailComponent } from '../../../../../../main/webapp/app/entities/student-schoolcore/student-schoolcore-detail.component';
import { StudentSchoolcoreService } from '../../../../../../main/webapp/app/entities/student-schoolcore/student-schoolcore.service';
import { StudentSchoolcore } from '../../../../../../main/webapp/app/entities/student-schoolcore/student-schoolcore.model';

describe('Component Tests', () => {

    describe('StudentSchoolcore Management Detail Component', () => {
        let comp: StudentSchoolcoreDetailComponent;
        let fixture: ComponentFixture<StudentSchoolcoreDetailComponent>;
        let service: StudentSchoolcoreService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolhipsterJwtTestModule],
                declarations: [StudentSchoolcoreDetailComponent],
                providers: [
                    StudentSchoolcoreService
                ]
            })
            .overrideTemplate(StudentSchoolcoreDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StudentSchoolcoreDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StudentSchoolcoreService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new StudentSchoolcore(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.student).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
