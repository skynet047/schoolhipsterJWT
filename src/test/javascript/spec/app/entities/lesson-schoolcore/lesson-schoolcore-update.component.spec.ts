/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SchoolhipsterJwtTestModule } from '../../../test.module';
import { LessonSchoolcoreUpdateComponent } from 'app/entities/lesson-schoolcore/lesson-schoolcore-update.component';
import { LessonSchoolcoreService } from 'app/entities/lesson-schoolcore/lesson-schoolcore.service';
import { LessonSchoolcore } from 'app/shared/model/lesson-schoolcore.model';

describe('Component Tests', () => {
    describe('LessonSchoolcore Management Update Component', () => {
        let comp: LessonSchoolcoreUpdateComponent;
        let fixture: ComponentFixture<LessonSchoolcoreUpdateComponent>;
        let service: LessonSchoolcoreService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolhipsterJwtTestModule],
                declarations: [LessonSchoolcoreUpdateComponent]
            })
                .overrideTemplate(LessonSchoolcoreUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LessonSchoolcoreUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LessonSchoolcoreService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new LessonSchoolcore(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.lesson = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new LessonSchoolcore();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.lesson = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
