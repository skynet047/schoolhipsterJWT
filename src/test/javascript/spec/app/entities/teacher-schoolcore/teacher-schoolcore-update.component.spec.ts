/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SchoolhipsterJwtTestModule } from '../../../test.module';
import { TeacherSchoolcoreUpdateComponent } from 'app/entities/teacher-schoolcore/teacher-schoolcore-update.component';
import { TeacherSchoolcoreService } from 'app/entities/teacher-schoolcore/teacher-schoolcore.service';
import { TeacherSchoolcore } from 'app/shared/model/teacher-schoolcore.model';

describe('Component Tests', () => {
    describe('TeacherSchoolcore Management Update Component', () => {
        let comp: TeacherSchoolcoreUpdateComponent;
        let fixture: ComponentFixture<TeacherSchoolcoreUpdateComponent>;
        let service: TeacherSchoolcoreService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolhipsterJwtTestModule],
                declarations: [TeacherSchoolcoreUpdateComponent]
            })
                .overrideTemplate(TeacherSchoolcoreUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TeacherSchoolcoreUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeacherSchoolcoreService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TeacherSchoolcore(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.teacher = entity;
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
                    const entity = new TeacherSchoolcore();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.teacher = entity;
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
