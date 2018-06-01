/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolhipsterJwtTestModule } from '../../../test.module';
import { PersonSchoolcoreDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/person-schoolcore/person-schoolcore-delete-dialog.component';
import { PersonSchoolcoreService } from '../../../../../../main/webapp/app/entities/person-schoolcore/person-schoolcore.service';

describe('Component Tests', () => {

    describe('PersonSchoolcore Management Delete Component', () => {
        let comp: PersonSchoolcoreDeleteDialogComponent;
        let fixture: ComponentFixture<PersonSchoolcoreDeleteDialogComponent>;
        let service: PersonSchoolcoreService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolhipsterJwtTestModule],
                declarations: [PersonSchoolcoreDeleteDialogComponent],
                providers: [
                    PersonSchoolcoreService
                ]
            })
            .overrideTemplate(PersonSchoolcoreDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PersonSchoolcoreDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonSchoolcoreService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

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
