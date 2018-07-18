/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SchoolhipsterJwtTestModule } from '../../../test.module';
import { SubjectSchoolcoreDetailComponent } from 'app/entities/subject-schoolcore/subject-schoolcore-detail.component';
import { SubjectSchoolcore } from 'app/shared/model/subject-schoolcore.model';

describe('Component Tests', () => {
    describe('SubjectSchoolcore Management Detail Component', () => {
        let comp: SubjectSchoolcoreDetailComponent;
        let fixture: ComponentFixture<SubjectSchoolcoreDetailComponent>;
        const route = ({ data: of({ subject: new SubjectSchoolcore(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolhipsterJwtTestModule],
                declarations: [SubjectSchoolcoreDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SubjectSchoolcoreDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SubjectSchoolcoreDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.subject).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
