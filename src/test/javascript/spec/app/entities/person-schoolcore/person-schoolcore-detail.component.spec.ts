/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SchoolhipsterJwtTestModule } from '../../../test.module';
import { PersonSchoolcoreDetailComponent } from 'app/entities/person-schoolcore/person-schoolcore-detail.component';
import { PersonSchoolcore } from 'app/shared/model/person-schoolcore.model';

describe('Component Tests', () => {
    describe('PersonSchoolcore Management Detail Component', () => {
        let comp: PersonSchoolcoreDetailComponent;
        let fixture: ComponentFixture<PersonSchoolcoreDetailComponent>;
        const route = ({ data: of({ person: new PersonSchoolcore(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolhipsterJwtTestModule],
                declarations: [PersonSchoolcoreDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PersonSchoolcoreDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PersonSchoolcoreDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.person).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
