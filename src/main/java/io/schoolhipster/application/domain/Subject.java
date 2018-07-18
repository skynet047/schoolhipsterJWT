package io.schoolhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Subject.
 */
@Entity
@Table(name = "subject")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Subject implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "subject")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Lesson> lessons = new HashSet<>();

    @ManyToMany(mappedBy = "subjects")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Teacher> teachers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Subject name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Lesson> getLessons() {
        return lessons;
    }

    public Subject lessons(Set<Lesson> lessons) {
        this.lessons = lessons;
        return this;
    }

    public Subject addLesson(Lesson lesson) {
        this.lessons.add(lesson);
        lesson.setSubject(this);
        return this;
    }

    public Subject removeLesson(Lesson lesson) {
        this.lessons.remove(lesson);
        lesson.setSubject(null);
        return this;
    }

    public void setLessons(Set<Lesson> lessons) {
        this.lessons = lessons;
    }

    public Set<Teacher> getTeachers() {
        return teachers;
    }

    public Subject teachers(Set<Teacher> teachers) {
        this.teachers = teachers;
        return this;
    }

    public Subject addTeachers(Teacher teacher) {
        this.teachers.add(teacher);
        teacher.getSubjects().add(this);
        return this;
    }

    public Subject removeTeachers(Teacher teacher) {
        this.teachers.remove(teacher);
        teacher.getSubjects().remove(this);
        return this;
    }

    public void setTeachers(Set<Teacher> teachers) {
        this.teachers = teachers;
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
        Subject subject = (Subject) o;
        if (subject.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), subject.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Subject{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
