/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SchoolhipsterJwtTestModule } from '../../../test.module';
import { TeacherSchoolcoreDetailComponent } from 'app/entities/teacher-schoolcore/teacher-schoolcore-detail.component';
import { TeacherSchoolcore } from 'app/shared/model/teacher-schoolcore.model';

describe('Component Tests', () => {
    describe('TeacherSchoolcore Management Detail Component', () => {
        let comp: TeacherSchoolcoreDetailComponent;
        let fixture: ComponentFixture<TeacherSchoolcoreDetailComponent>;
        const route = ({ data: of({ teacher: new TeacherSchoolcore(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolhipsterJwtTestModule],
                declarations: [TeacherSchoolcoreDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TeacherSchoolcoreDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TeacherSchoolcoreDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.teacher).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
