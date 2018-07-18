import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { LessonSchoolcore } from './lesson-schoolcore.model';
import { LessonSchoolcoreService } from './lesson-schoolcore.service';

@Injectable()
export class LessonSchoolcorePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private lessonService: LessonSchoolcoreService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.lessonService.find(id)
                    .subscribe((lessonResponse: HttpResponse<LessonSchoolcore>) => {
                        const lesson: LessonSchoolcore = lessonResponse.body;
                        lesson.plannedStartTime = this.datePipe
                            .transform(lesson.plannedStartTime, 'yyyy-MM-ddTHH:mm:ss');
                        lesson.plannedEndTime = this.datePipe
                            .transform(lesson.plannedEndTime, 'yyyy-MM-ddTHH:mm:ss');
                        lesson.realStartDate = this.datePipe
                            .transform(lesson.realStartDate, 'yyyy-MM-ddTHH:mm:ss');
                        lesson.realEndDate = this.datePipe
                            .transform(lesson.realEndDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.lessonModalRef(component, lesson);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.lessonModalRef(component, new LessonSchoolcore());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    lessonModalRef(component: Component, lesson: LessonSchoolcore): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.lesson = lesson;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
