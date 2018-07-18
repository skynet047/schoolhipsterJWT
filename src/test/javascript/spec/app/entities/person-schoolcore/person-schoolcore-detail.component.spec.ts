/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SchoolhipsterJwtTestModule } from '../../../test.module';
import { PersonSchoolcoreDetailComponent } from '../../../../../../main/webapp/app/entities/person-schoolcore/person-schoolcore-detail.component';
import { PersonSchoolcoreService } from '../../../../../../main/webapp/app/entities/person-schoolcore/person-schoolcore.service';
import { PersonSchoolcore } from '../../../../../../main/webapp/app/entities/person-schoolcore/person-schoolcore.model';

describe('Component Tests', () => {

    describe('PersonSchoolcore Management Detail Component', () => {
        let comp: PersonSchoolcoreDetailComponent;
        let fixture: ComponentFixture<PersonSchoolcoreDetailComponent>;
        let service: PersonSchoolcoreService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolhipsterJwtTestModule],
                declarations: [PersonSchoolcoreDetailComponent],
                providers: [
                    PersonSchoolcoreService
                ]
            })
            .overrideTemplate(PersonSchoolcoreDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PersonSchoolcoreDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonSchoolcoreService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PersonSchoolcore(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.person).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
