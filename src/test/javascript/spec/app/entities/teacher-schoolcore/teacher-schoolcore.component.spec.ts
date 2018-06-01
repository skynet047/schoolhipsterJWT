/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SchoolhipsterJwtTestModule } from '../../../test.module';
import { TeacherSchoolcoreComponent } from '../../../../../../main/webapp/app/entities/teacher-schoolcore/teacher-schoolcore.component';
import { TeacherSchoolcoreService } from '../../../../../../main/webapp/app/entities/teacher-schoolcore/teacher-schoolcore.service';
import { TeacherSchoolcore } from '../../../../../../main/webapp/app/entities/teacher-schoolcore/teacher-schoolcore.model';

describe('Component Tests', () => {

    describe('TeacherSchoolcore Management Component', () => {
        let comp: TeacherSchoolcoreComponent;
        let fixture: ComponentFixture<TeacherSchoolcoreComponent>;
        let service: TeacherSchoolcoreService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolhipsterJwtTestModule],
                declarations: [TeacherSchoolcoreComponent],
                providers: [
                    TeacherSchoolcoreService
                ]
            })
            .overrideTemplate(TeacherSchoolcoreComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TeacherSchoolcoreComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeacherSchoolcoreService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TeacherSchoolcore(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.teachers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
