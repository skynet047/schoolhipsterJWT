/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolhipsterJwtTestModule } from '../../../test.module';
import { LessonSchoolcoreDialogComponent } from '../../../../../../main/webapp/app/entities/lesson-schoolcore/lesson-schoolcore-dialog.component';
import { LessonSchoolcoreService } from '../../../../../../main/webapp/app/entities/lesson-schoolcore/lesson-schoolcore.service';
import { LessonSchoolcore } from '../../../../../../main/webapp/app/entities/lesson-schoolcore/lesson-schoolcore.model';
import { TeacherSchoolcoreService } from '../../../../../../main/webapp/app/entities/teacher-schoolcore';
import { SubjectSchoolcoreService } from '../../../../../../main/webapp/app/entities/subject-schoolcore';
import { StudentSchoolcoreService } from '../../../../../../main/webapp/app/entities/student-schoolcore';

describe('Component Tests', () => {

    describe('LessonSchoolcore Management Dialog Component', () => {
        let comp: LessonSchoolcoreDialogComponent;
        let fixture: ComponentFixture<LessonSchoolcoreDialogComponent>;
        let service: LessonSchoolcoreService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolhipsterJwtTestModule],
                declarations: [LessonSchoolcoreDialogComponent],
                providers: [
                    TeacherSchoolcoreService,
                    SubjectSchoolcoreService,
                    StudentSchoolcoreService,
                    LessonSchoolcoreService
                ]
            })
            .overrideTemplate(LessonSchoolcoreDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LessonSchoolcoreDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LessonSchoolcoreService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new LessonSchoolcore(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.lesson = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'lessonListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new LessonSchoolcore();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.lesson = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'lessonListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
