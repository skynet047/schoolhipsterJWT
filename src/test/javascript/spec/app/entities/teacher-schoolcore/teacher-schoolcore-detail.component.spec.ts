/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SchoolhipsterJwtTestModule } from '../../../test.module';
import { TeacherSchoolcoreDetailComponent } from '../../../../../../main/webapp/app/entities/teacher-schoolcore/teacher-schoolcore-detail.component';
import { TeacherSchoolcoreService } from '../../../../../../main/webapp/app/entities/teacher-schoolcore/teacher-schoolcore.service';
import { TeacherSchoolcore } from '../../../../../../main/webapp/app/entities/teacher-schoolcore/teacher-schoolcore.model';

describe('Component Tests', () => {

    describe('TeacherSchoolcore Management Detail Component', () => {
        let comp: TeacherSchoolcoreDetailComponent;
        let fixture: ComponentFixture<TeacherSchoolcoreDetailComponent>;
        let service: TeacherSchoolcoreService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolhipsterJwtTestModule],
                declarations: [TeacherSchoolcoreDetailComponent],
                providers: [
                    TeacherSchoolcoreService
                ]
            })
            .overrideTemplate(TeacherSchoolcoreDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TeacherSchoolcoreDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeacherSchoolcoreService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TeacherSchoolcore(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.teacher).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
