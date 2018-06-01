import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { TeacherSchoolcore } from './teacher-schoolcore.model';
import { TeacherSchoolcoreService } from './teacher-schoolcore.service';

@Injectable()
export class TeacherSchoolcorePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private teacherService: TeacherSchoolcoreService

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
                this.teacherService.find(id)
                    .subscribe((teacherResponse: HttpResponse<TeacherSchoolcore>) => {
                        const teacher: TeacherSchoolcore = teacherResponse.body;
                        this.ngbModalRef = this.teacherModalRef(component, teacher);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.teacherModalRef(component, new TeacherSchoolcore());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    teacherModalRef(component: Component, teacher: TeacherSchoolcore): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.teacher = teacher;
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
