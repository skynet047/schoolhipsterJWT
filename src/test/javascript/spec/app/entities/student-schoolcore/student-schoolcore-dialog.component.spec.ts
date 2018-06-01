/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolhipsterJwtTestModule } from '../../../test.module';
import { StudentSchoolcoreDialogComponent } from '../../../../../../main/webapp/app/entities/student-schoolcore/student-schoolcore-dialog.component';
import { StudentSchoolcoreService } from '../../../../../../main/webapp/app/entities/student-schoolcore/student-schoolcore.service';
import { StudentSchoolcore } from '../../../../../../main/webapp/app/entities/student-schoolcore/student-schoolcore.model';
import { LessonSchoolcoreService } from '../../../../../../main/webapp/app/entities/lesson-schoolcore';

describe('Component Tests', () => {

    describe('StudentSchoolcore Management Dialog Component', () => {
        let comp: StudentSchoolcoreDialogComponent;
        let fixture: ComponentFixture<StudentSchoolcoreDialogComponent>;
        let service: StudentSchoolcoreService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolhipsterJwtTestModule],
                declarations: [StudentSchoolcoreDialogComponent],
                providers: [
                    LessonSchoolcoreService,
                    StudentSchoolcoreService
                ]
            })
            .overrideTemplate(StudentSchoolcoreDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StudentSchoolcoreDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StudentSchoolcoreService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StudentSchoolcore(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.student = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'studentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StudentSchoolcore();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.student = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'studentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
