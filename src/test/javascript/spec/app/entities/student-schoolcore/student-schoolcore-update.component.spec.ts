/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SchoolhipsterJwtTestModule } from '../../../test.module';
import { StudentSchoolcoreUpdateComponent } from 'app/entities/student-schoolcore/student-schoolcore-update.component';
import { StudentSchoolcoreService } from 'app/entities/student-schoolcore/student-schoolcore.service';
import { StudentSchoolcore } from 'app/shared/model/student-schoolcore.model';

describe('Component Tests', () => {
    describe('StudentSchoolcore Management Update Component', () => {
        let comp: StudentSchoolcoreUpdateComponent;
        let fixture: ComponentFixture<StudentSchoolcoreUpdateComponent>;
        let service: StudentSchoolcoreService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolhipsterJwtTestModule],
                declarations: [StudentSchoolcoreUpdateComponent]
            })
                .overrideTemplate(StudentSchoolcoreUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StudentSchoolcoreUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StudentSchoolcoreService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new StudentSchoolcore(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.student = entity;
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
                    const entity = new StudentSchoolcore();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.student = entity;
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
