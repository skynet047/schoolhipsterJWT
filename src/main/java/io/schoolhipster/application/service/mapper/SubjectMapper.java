package io.schoolhipster.application.service.mapper;

import io.schoolhipster.application.domain.*;
import io.schoolhipster.application.service.dto.SubjectDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Subject and its DTO SubjectDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SubjectMapper extends EntityMapper<SubjectDTO, Subject> {


    @Mapping(target = "lessons", ignore = true)
    @Mapping(target = "teachers", ignore = true)
    Subject toEntity(SubjectDTO subjectDTO);

    default Subject fromId(Long id) {
        if (id == null) {
            return null;
        }
        Subject subject = new Subject();
        subject.setId(id);
        return subject;
    }
}
