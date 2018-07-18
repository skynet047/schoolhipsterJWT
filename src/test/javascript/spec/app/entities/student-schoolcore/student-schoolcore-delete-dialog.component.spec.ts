/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolhipsterJwtTestModule } from '../../../test.module';
import { StudentSchoolcoreDeleteDialogComponent } from 'app/entities/student-schoolcore/student-schoolcore-delete-dialog.component';
import { StudentSchoolcoreService } from 'app/entities/student-schoolcore/student-schoolcore.service';

describe('Component Tests', () => {
    describe('StudentSchoolcore Management Delete Component', () => {
        let comp: StudentSchoolcoreDeleteDialogComponent;
        let fixture: ComponentFixture<StudentSchoolcoreDeleteDialogComponent>;
        let service: StudentSchoolcoreService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolhipsterJwtTestModule],
                declarations: [StudentSchoolcoreDeleteDialogComponent]
            })
                .overrideTemplate(StudentSchoolcoreDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StudentSchoolcoreDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StudentSchoolcoreService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
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
            ));
        });
    });
});
