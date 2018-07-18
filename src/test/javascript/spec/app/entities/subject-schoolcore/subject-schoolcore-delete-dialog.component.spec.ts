/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolhipsterJwtTestModule } from '../../../test.module';
import { SubjectSchoolcoreDeleteDialogComponent } from 'app/entities/subject-schoolcore/subject-schoolcore-delete-dialog.component';
import { SubjectSchoolcoreService } from 'app/entities/subject-schoolcore/subject-schoolcore.service';

describe('Component Tests', () => {
    describe('SubjectSchoolcore Management Delete Component', () => {
        let comp: SubjectSchoolcoreDeleteDialogComponent;
        let fixture: ComponentFixture<SubjectSchoolcoreDeleteDialogComponent>;
        let service: SubjectSchoolcoreService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolhipsterJwtTestModule],
                declarations: [SubjectSchoolcoreDeleteDialogComponent]
            })
                .overrideTemplate(SubjectSchoolcoreDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SubjectSchoolcoreDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubjectSchoolcoreService);
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
