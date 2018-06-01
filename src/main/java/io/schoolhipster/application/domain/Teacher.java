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
 * A Teacher.
 */
@Entity
@Table(name = "teacher")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Teacher implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 2, max = 100)
    @Column(name = "first_name", length = 100)
    private String firstName;

    @Size(min = 2, max = 100)
    @Column(name = "last_name", length = 100)
    private String lastName;

    @NotNull
    @Size(min = 9, max = 18)
    @Column(name = "phone_number", length = 18, nullable = false)
    private String phoneNumber;

    @NotNull
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$")
    @Column(name = "email", nullable = false)
    private String email;

    @Min(value = 1)
    @Column(name = "hourly_rate")
    private Integer hourlyRate;

    @Column(name = "rate")
    private Integer rate;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @NotNull
    @JoinTable(name = "teacher_subjects",
               joinColumns = @JoinColumn(name="teachers_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="subjects_id", referencedColumnName="id"))
    private Set<Subject> subjects = new HashSet<>();

    @OneToMany(mappedBy = "teacher")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Lesson> lessons = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public Teacher firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Teacher lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Teacher phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public Teacher email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getHourlyRate() {
        return hourlyRate;
    }

    public Teacher hourlyRate(Integer hourlyRate) {
        this.hourlyRate = hourlyRate;
        return this;
    }

    public void setHourlyRate(Integer hourlyRate) {
        this.hourlyRate = hourlyRate;
    }

    public Integer getRate() {
        return rate;
    }

    public Teacher rate(Integer rate) {
        this.rate = rate;
        return this;
    }

    public void setRate(Integer rate) {
        this.rate = rate;
    }

    public Set<Subject> getSubjects() {
        return subjects;
    }

    public Teacher subjects(Set<Subject> subjects) {
        this.subjects = subjects;
        return this;
    }

    public Teacher addSubjects(Subject subject) {
        this.subjects.add(subject);
        subject.getTeachers().add(this);
        return this;
    }

    public Teacher removeSubjects(Subject subject) {
        this.subjects.remove(subject);
        subject.getTeachers().remove(this);
        return this;
    }

    public void setSubjects(Set<Subject> subjects) {
        this.subjects = subjects;
    }

    public Set<Lesson> getLessons() {
        return lessons;
    }

    public Teacher lessons(Set<Lesson> lessons) {
        this.lessons = lessons;
        return this;
    }

    public Teacher addLessons(Lesson lesson) {
        this.lessons.add(lesson);
        lesson.setTeacher(this);
        return this;
    }

    public Teacher removeLessons(Lesson lesson) {
        this.lessons.remove(lesson);
        lesson.setTeacher(null);
        return this;
    }

    public void setLessons(Set<Lesson> lessons) {
        this.lessons = lessons;
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
        Teacher teacher = (Teacher) o;
        if (teacher.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), teacher.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Teacher{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", email='" + getEmail() + "'" +
            ", hourlyRate=" + getHourlyRate() +
            ", rate=" + getRate() +
            "}";
    }
}
