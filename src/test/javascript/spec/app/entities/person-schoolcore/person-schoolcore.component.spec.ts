/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SchoolhipsterJwtTestModule } from '../../../test.module';
import { PersonSchoolcoreComponent } from '../../../../../../main/webapp/app/entities/person-schoolcore/person-schoolcore.component';
import { PersonSchoolcoreService } from '../../../../../../main/webapp/app/entities/person-schoolcore/person-schoolcore.service';
import { PersonSchoolcore } from '../../../../../../main/webapp/app/entities/person-schoolcore/person-schoolcore.model';

describe('Component Tests', () => {

    describe('PersonSchoolcore Management Component', () => {
        let comp: PersonSchoolcoreComponent;
        let fixture: ComponentFixture<PersonSchoolcoreComponent>;
        let service: PersonSchoolcoreService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolhipsterJwtTestModule],
                declarations: [PersonSchoolcoreComponent],
                providers: [
                    PersonSchoolcoreService
                ]
            })
            .overrideTemplate(PersonSchoolcoreComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PersonSchoolcoreComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonSchoolcoreService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PersonSchoolcore(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.people[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
