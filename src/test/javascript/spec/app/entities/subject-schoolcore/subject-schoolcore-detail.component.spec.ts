/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SchoolhipsterJwtTestModule } from '../../../test.module';
import { SubjectSchoolcoreDetailComponent } from '../../../../../../main/webapp/app/entities/subject-schoolcore/subject-schoolcore-detail.component';
import { SubjectSchoolcoreService } from '../../../../../../main/webapp/app/entities/subject-schoolcore/subject-schoolcore.service';
import { SubjectSchoolcore } from '../../../../../../main/webapp/app/entities/subject-schoolcore/subject-schoolcore.model';

describe('Component Tests', () => {

    describe('SubjectSchoolcore Management Detail Component', () => {
        let comp: SubjectSchoolcoreDetailComponent;
        let fixture: ComponentFixture<SubjectSchoolcoreDetailComponent>;
        let service: SubjectSchoolcoreService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolhipsterJwtTestModule],
                declarations: [SubjectSchoolcoreDetailComponent],
                providers: [
                    SubjectSchoolcoreService
                ]
            })
            .overrideTemplate(SubjectSchoolcoreDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubjectSchoolcoreDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubjectSchoolcoreService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SubjectSchoolcore(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.subject).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
