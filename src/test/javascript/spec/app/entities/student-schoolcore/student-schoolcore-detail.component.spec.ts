/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SchoolhipsterJwtTestModule } from '../../../test.module';
import { StudentSchoolcoreDetailComponent } from 'app/entities/student-schoolcore/student-schoolcore-detail.component';
import { StudentSchoolcore } from 'app/shared/model/student-schoolcore.model';

describe('Component Tests', () => {
    describe('StudentSchoolcore Management Detail Component', () => {
        let comp: StudentSchoolcoreDetailComponent;
        let fixture: ComponentFixture<StudentSchoolcoreDetailComponent>;
        const route = ({ data: of({ student: new StudentSchoolcore(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolhipsterJwtTestModule],
                declarations: [StudentSchoolcoreDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(StudentSchoolcoreDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StudentSchoolcoreDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.student).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
