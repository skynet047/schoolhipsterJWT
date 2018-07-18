/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolhipsterJwtTestModule } from '../../../test.module';
import { PersonSchoolcoreDeleteDialogComponent } from 'app/entities/person-schoolcore/person-schoolcore-delete-dialog.component';
import { PersonSchoolcoreService } from 'app/entities/person-schoolcore/person-schoolcore.service';

describe('Component Tests', () => {
    describe('PersonSchoolcore Management Delete Component', () => {
        let comp: PersonSchoolcoreDeleteDialogComponent;
        let fixture: ComponentFixture<PersonSchoolcoreDeleteDialogComponent>;
        let service: PersonSchoolcoreService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolhipsterJwtTestModule],
                declarations: [PersonSchoolcoreDeleteDialogComponent]
            })
                .overrideTemplate(PersonSchoolcoreDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PersonSchoolcoreDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonSchoolcoreService);
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
