/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SchoolhipsterJwtTestModule } from '../../../test.module';
import { PersonSchoolcoreUpdateComponent } from 'app/entities/person-schoolcore/person-schoolcore-update.component';
import { PersonSchoolcoreService } from 'app/entities/person-schoolcore/person-schoolcore.service';
import { PersonSchoolcore } from 'app/shared/model/person-schoolcore.model';

describe('Component Tests', () => {
    describe('PersonSchoolcore Management Update Component', () => {
        let comp: PersonSchoolcoreUpdateComponent;
        let fixture: ComponentFixture<PersonSchoolcoreUpdateComponent>;
        let service: PersonSchoolcoreService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolhipsterJwtTestModule],
                declarations: [PersonSchoolcoreUpdateComponent]
            })
                .overrideTemplate(PersonSchoolcoreUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PersonSchoolcoreUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonSchoolcoreService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PersonSchoolcore(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.person = entity;
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
                    const entity = new PersonSchoolcore();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.person = entity;
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
