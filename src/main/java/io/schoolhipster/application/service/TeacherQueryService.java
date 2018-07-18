package io.schoolhipster.application.service;


import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import io.schoolhipster.application.domain.Teacher;
import io.schoolhipster.application.domain.*; // for static metamodels
import io.schoolhipster.application.repository.TeacherRepository;
import io.schoolhipster.application.service.dto.TeacherCriteria;

import io.schoolhipster.application.service.dto.TeacherDTO;
import io.schoolhipster.application.service.mapper.TeacherMapper;

/**
 * Service for executing complex queries for Teacher entities in the database.
 * The main input is a {@link TeacherCriteria} which get's converted to {@link Specifications},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link TeacherDTO} or a {@link Page} of {@link TeacherDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class TeacherQueryService extends QueryService<Teacher> {

    private final Logger log = LoggerFactory.getLogger(TeacherQueryService.class);


    private final TeacherRepository teacherRepository;

    private final TeacherMapper teacherMapper;

    public TeacherQueryService(TeacherRepository teacherRepository, TeacherMapper teacherMapper) {
        this.teacherRepository = teacherRepository;
        this.teacherMapper = teacherMapper;
    }

    /**
     * Return a {@link List} of {@link TeacherDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<TeacherDTO> findByCriteria(TeacherCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specifications<Teacher> specification = createSpecification(criteria);
        return teacherMapper.toDto(teacherRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link TeacherDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<TeacherDTO> findByCriteria(TeacherCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specifications<Teacher> specification = createSpecification(criteria);
        final Page<Teacher> result = teacherRepository.findAll(specification, page);
        return result.map(teacherMapper::toDto);
    }

    /**
     * Function to convert TeacherCriteria to a {@link Specifications}
     */
    private Specifications<Teacher> createSpecification(TeacherCriteria criteria) {
        Specifications<Teacher> specification = Specifications.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Teacher_.id));
            }
            if (criteria.getFirstName() != null) {
                specification = specification.and(buildStringSpecification(criteria.getFirstName(), Teacher_.firstName));
            }
            if (criteria.getLastName() != null) {
                specification = specification.and(buildStringSpecification(criteria.getLastName(), Teacher_.lastName));
            }
            if (criteria.getPhoneNumber() != null) {
                specification = specification.and(buildStringSpecification(criteria.getPhoneNumber(), Teacher_.phoneNumber));
            }
            if (criteria.getEmail() != null) {
                specification = specification.and(buildStringSpecification(criteria.getEmail(), Teacher_.email));
            }
            if (criteria.getHourlyRate() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getHourlyRate(), Teacher_.hourlyRate));
            }
            if (criteria.getRate() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getRate(), Teacher_.rate));
            }
            if (criteria.getSubjectsId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getSubjectsId(), Teacher_.subjects, Subject_.id));
            }
            if (criteria.getLessonsId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getLessonsId(), Teacher_.lessons, Lesson_.id));
            }
        }
        return specification;
    }

}
