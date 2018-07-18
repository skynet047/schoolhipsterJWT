/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolhipsterJwtTestModule } from '../../../test.module';
import { LessonSchoolcoreDeleteDialogComponent } from 'app/entities/lesson-schoolcore/lesson-schoolcore-delete-dialog.component';
import { LessonSchoolcoreService } from 'app/entities/lesson-schoolcore/lesson-schoolcore.service';

describe('Component Tests', () => {
    describe('LessonSchoolcore Management Delete Component', () => {
        let comp: LessonSchoolcoreDeleteDialogComponent;
        let fixture: ComponentFixture<LessonSchoolcoreDeleteDialogComponent>;
        let service: LessonSchoolcoreService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolhipsterJwtTestModule],
                declarations: [LessonSchoolcoreDeleteDialogComponent]
            })
                .overrideTemplate(LessonSchoolcoreDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LessonSchoolcoreDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LessonSchoolcoreService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
