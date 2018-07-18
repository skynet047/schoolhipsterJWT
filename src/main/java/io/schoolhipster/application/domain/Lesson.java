package io.schoolhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Lesson.
 */
@Entity
@Table(name = "lesson")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Lesson implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "planned_start_time", nullable = false)
    private ZonedDateTime plannedStartTime;

    @NotNull
    @Column(name = "planned_end_time", nullable = false)
    private ZonedDateTime plannedEndTime;

    @NotNull
    @Column(name = "real_start_date", nullable = false)
    private ZonedDateTime realStartDate;

    @NotNull
    @Column(name = "real_end_date", nullable = false)
    private ZonedDateTime realEndDate;

    @Column(name = "topic")
    private String topic;

    @ManyToOne(optional = false)
    @NotNull
    private Teacher teacher;

    @ManyToOne(optional = false)
    @NotNull
    private Subject subject;

    @ManyToMany(mappedBy = "lessons")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Student> students = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getPlannedStartTime() {
        return plannedStartTime;
    }

    public Lesson plannedStartTime(ZonedDateTime plannedStartTime) {
        this.plannedStartTime = plannedStartTime;
        return this;
    }

    public void setPlannedStartTime(ZonedDateTime plannedStartTime) {
        this.plannedStartTime = plannedStartTime;
    }

    public ZonedDateTime getPlannedEndTime() {
        return plannedEndTime;
    }

    public Lesson plannedEndTime(ZonedDateTime plannedEndTime) {
        this.plannedEndTime = plannedEndTime;
        return this;
    }

    public void setPlannedEndTime(ZonedDateTime plannedEndTime) {
        this.plannedEndTime = plannedEndTime;
    }

    public ZonedDateTime getRealStartDate() {
        return realStartDate;
    }

    public Lesson realStartDate(ZonedDateTime realStartDate) {
        this.realStartDate = realStartDate;
        return this;
    }

    public void setRealStartDate(ZonedDateTime realStartDate) {
        this.realStartDate = realStartDate;
    }

    public ZonedDateTime getRealEndDate() {
        return realEndDate;
    }

    public Lesson realEndDate(ZonedDateTime realEndDate) {
        this.realEndDate = realEndDate;
        return this;
    }

    public void setRealEndDate(ZonedDateTime realEndDate) {
        this.realEndDate = realEndDate;
    }

    public String getTopic() {
        return topic;
    }

    public Lesson topic(String topic) {
        this.topic = topic;
        return this;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public Lesson teacher(Teacher teacher) {
        this.teacher = teacher;
        return this;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public Subject getSubject() {
        return subject;
    }

    public Lesson subject(Subject subject) {
        this.subject = subject;
        return this;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public Set<Student> getStudents() {
        return students;
    }

    public Lesson students(Set<Student> students) {
        this.students = students;
        return this;
    }

    public Lesson addStudents(Student student) {
        this.students.add(student);
        student.getLessons().add(this);
        return this;
    }

    public Lesson removeStudents(Student student) {
        this.students.remove(student);
        student.getLessons().remove(this);
        return this;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Lesson lesson = (Lesson) o;
        if (lesson.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), lesson.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Lesson{" +
            "id=" + getId() +
            ", plannedStartTime='" + getPlannedStartTime() + "'" +
            ", plannedEndTime='" + getPlannedEndTime() + "'" +
            ", realStartDate='" + getRealStartDate() + "'" +
            ", realEndDate='" + getRealEndDate() + "'" +
            ", topic='" + getTopic() + "'" +
            "}";
    }
}
