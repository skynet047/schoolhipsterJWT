/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SchoolhipsterJwtTestModule } from '../../../test.module';
import { LessonSchoolcoreComponent } from '../../../../../../main/webapp/app/entities/lesson-schoolcore/lesson-schoolcore.component';
import { LessonSchoolcoreService } from '../../../../../../main/webapp/app/entities/lesson-schoolcore/lesson-schoolcore.service';
import { LessonSchoolcore } from '../../../../../../main/webapp/app/entities/lesson-schoolcore/lesson-schoolcore.model';

describe('Component Tests', () => {

    describe('LessonSchoolcore Management Component', () => {
        let comp: LessonSchoolcoreComponent;
        let fixture: ComponentFixture<LessonSchoolcoreComponent>;
        let service: LessonSchoolcoreService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolhipsterJwtTestModule],
                declarations: [LessonSchoolcoreComponent],
                providers: [
                    LessonSchoolcoreService
                ]
            })
            .overrideTemplate(LessonSchoolcoreComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LessonSchoolcoreComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LessonSchoolcoreService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new LessonSchoolcore(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.lessons[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
