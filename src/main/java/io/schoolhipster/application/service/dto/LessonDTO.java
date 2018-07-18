package io.schoolhipster.application.service.dto;

import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Lesson entity.
 */
public class LessonDTO implements Serializable {

    private Long id;

    @NotNull
    private ZonedDateTime plannedStartTime;

    @NotNull
    private ZonedDateTime plannedEndTime;

    @NotNull
    private ZonedDateTime realStartDate;

    @NotNull
    private ZonedDateTime realEndDate;

    private String topic;

    private Long teacherId;

    private Long subjectId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getPlannedStartTime() {
        return plannedStartTime;
    }

    public void setPlannedStartTime(ZonedDateTime plannedStartTime) {
        this.plannedStartTime = plannedStartTime;
    }

    public ZonedDateTime getPlannedEndTime() {
        return plannedEndTime;
    }

    public void setPlannedEndTime(ZonedDateTime plannedEndTime) {
        this.plannedEndTime = plannedEndTime;
    }

    public ZonedDateTime getRealStartDate() {
        return realStartDate;
    }

    public void setRealStartDate(ZonedDateTime realStartDate) {
        this.realStartDate = realStartDate;
    }

    public ZonedDateTime getRealEndDate() {
        return realEndDate;
    }

    public void setRealEndDate(ZonedDateTime realEndDate) {
        this.realEndDate = realEndDate;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public Long getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Long teacherId) {
        this.teacherId = teacherId;
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(Long subjectId) {
        this.subjectId = subjectId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        LessonDTO lessonDTO = (LessonDTO) o;
        if (lessonDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), lessonDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LessonDTO{" +
            "id=" + getId() +
            ", plannedStartTime='" + getPlannedStartTime() + "'" +
            ", plannedEndTime='" + getPlannedEndTime() + "'" +
            ", realStartDate='" + getRealStartDate() + "'" +
            ", realEndDate='" + getRealEndDate() + "'" +
            ", topic='" + getTopic() + "'" +
            ", teacher=" + getTeacherId() +
            ", subject=" + getSubjectId() +
            "}";
    }
}
