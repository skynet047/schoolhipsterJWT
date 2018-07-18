/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SchoolhipsterJwtTestModule } from '../../../test.module';
import { LessonSchoolcoreDetailComponent } from '../../../../../../main/webapp/app/entities/lesson-schoolcore/lesson-schoolcore-detail.component';
import { LessonSchoolcoreService } from '../../../../../../main/webapp/app/entities/lesson-schoolcore/lesson-schoolcore.service';
import { LessonSchoolcore } from '../../../../../../main/webapp/app/entities/lesson-schoolcore/lesson-schoolcore.model';

describe('Component Tests', () => {

    describe('LessonSchoolcore Management Detail Component', () => {
        let comp: LessonSchoolcoreDetailComponent;
        let fixture: ComponentFixture<LessonSchoolcoreDetailComponent>;
        let service: LessonSchoolcoreService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolhipsterJwtTestModule],
                declarations: [LessonSchoolcoreDetailComponent],
                providers: [
                    LessonSchoolcoreService
                ]
            })
            .overrideTemplate(LessonSchoolcoreDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LessonSchoolcoreDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LessonSchoolcoreService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new LessonSchoolcore(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.lesson).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
