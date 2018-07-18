package io.schoolhipster.application.service.dto;

import java.io.Serializable;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;






/**
 * Criteria class for the Teacher entity. This class is used in TeacherResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /teachers?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class TeacherCriteria implements Serializable {
    private static final long serialVersionUID = 1L;


    private LongFilter id;

    private StringFilter firstName;

    private StringFilter lastName;

    private StringFilter phoneNumber;

    private StringFilter email;

    private IntegerFilter hourlyRate;

    private IntegerFilter rate;

    private LongFilter subjectsId;

    private LongFilter lessonsId;

    public TeacherCriteria() {
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getFirstName() {
        return firstName;
    }

    public void setFirstName(StringFilter firstName) {
        this.firstName = firstName;
    }

    public StringFilter getLastName() {
        return lastName;
    }

    public void setLastName(StringFilter lastName) {
        this.lastName = lastName;
    }

    public StringFilter getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(StringFilter phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public StringFilter getEmail() {
        return email;
    }

    public void setEmail(StringFilter email) {
        this.email = email;
    }

    public IntegerFilter getHourlyRate() {
        return hourlyRate;
    }

    public void setHourlyRate(IntegerFilter hourlyRate) {
        this.hourlyRate = hourlyRate;
    }

    public IntegerFilter getRate() {
        return rate;
    }

    public void setRate(IntegerFilter rate) {
        this.rate = rate;
    }

    public LongFilter getSubjectsId() {
        return subjectsId;
    }

    public void setSubjectsId(LongFilter subjectsId) {
        this.subjectsId = subjectsId;
    }

    public LongFilter getLessonsId() {
        return lessonsId;
    }

    public void setLessonsId(LongFilter lessonsId) {
        this.lessonsId = lessonsId;
    }

    @Override
    public String toString() {
        return "TeacherCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (firstName != null ? "firstName=" + firstName + ", " : "") +
                (lastName != null ? "lastName=" + lastName + ", " : "") +
                (phoneNumber != null ? "phoneNumber=" + phoneNumber + ", " : "") +
                (email != null ? "email=" + email + ", " : "") +
                (hourlyRate != null ? "hourlyRate=" + hourlyRate + ", " : "") +
                (rate != null ? "rate=" + rate + ", " : "") +
                (subjectsId != null ? "subjectsId=" + subjectsId + ", " : "") +
                (lessonsId != null ? "lessonsId=" + lessonsId + ", " : "") +
            "}";
    }

}
