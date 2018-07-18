/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SchoolhipsterJwtTestModule } from '../../../test.module';
import { LessonSchoolcoreDetailComponent } from 'app/entities/lesson-schoolcore/lesson-schoolcore-detail.component';
import { LessonSchoolcore } from 'app/shared/model/lesson-schoolcore.model';

describe('Component Tests', () => {
    describe('LessonSchoolcore Management Detail Component', () => {
        let comp: LessonSchoolcoreDetailComponent;
        let fixture: ComponentFixture<LessonSchoolcoreDetailComponent>;
        const route = ({ data: of({ lesson: new LessonSchoolcore(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolhipsterJwtTestModule],
                declarations: [LessonSchoolcoreDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LessonSchoolcoreDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LessonSchoolcoreDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.lesson).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
