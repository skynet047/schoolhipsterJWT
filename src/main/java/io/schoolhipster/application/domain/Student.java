package io.schoolhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Student.
 */
@Entity
@Table(name = "student")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Student implements Serializable {

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

    @Size(min = 9, max = 18)
    @Column(name = "phone_number", length = 18)
    private String phoneNumber;

    @NotNull
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$")
    @Column(name = "email", nullable = false)
    private String email;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "student_lessons",
               joinColumns = @JoinColumn(name = "students_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "lessons_id", referencedColumnName = "id"))
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

    public Student firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Student lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Student phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public Student email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Lesson> getLessons() {
        return lessons;
    }

    public Student lessons(Set<Lesson> lessons) {
        this.lessons = lessons;
        return this;
    }

    public Student addLessons(Lesson lesson) {
        this.lessons.add(lesson);
        lesson.getStudents().add(this);
        return this;
    }

    public Student removeLessons(Lesson lesson) {
        this.lessons.remove(lesson);
        lesson.getStudents().remove(this);
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
        Student student = (Student) o;
        if (student.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), student.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Student{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }
}
