/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SchoolhipsterJwtTestModule } from '../../../test.module';
import { SubjectSchoolcoreUpdateComponent } from 'app/entities/subject-schoolcore/subject-schoolcore-update.component';
import { SubjectSchoolcoreService } from 'app/entities/subject-schoolcore/subject-schoolcore.service';
import { SubjectSchoolcore } from 'app/shared/model/subject-schoolcore.model';

describe('Component Tests', () => {
    describe('SubjectSchoolcore Management Update Component', () => {
        let comp: SubjectSchoolcoreUpdateComponent;
        let fixture: ComponentFixture<SubjectSchoolcoreUpdateComponent>;
        let service: SubjectSchoolcoreService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolhipsterJwtTestModule],
                declarations: [SubjectSchoolcoreUpdateComponent]
            })
                .overrideTemplate(SubjectSchoolcoreUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SubjectSchoolcoreUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubjectSchoolcoreService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SubjectSchoolcore(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.subject = entity;
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
                    const entity = new SubjectSchoolcore();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.subject = entity;
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
