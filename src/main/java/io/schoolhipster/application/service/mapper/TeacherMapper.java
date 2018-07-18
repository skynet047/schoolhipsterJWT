package io.schoolhipster.application.service.mapper;

import io.schoolhipster.application.domain.*;
import io.schoolhipster.application.service.dto.TeacherDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Teacher and its DTO TeacherDTO.
 */
@Mapper(componentModel = "spring", uses = {SubjectMapper.class})
public interface TeacherMapper extends EntityMapper<TeacherDTO, Teacher> {


    @Mapping(target = "lessons", ignore = true)
    Teacher toEntity(TeacherDTO teacherDTO);

    default Teacher fromId(Long id) {
        if (id == null) {
            return null;
        }
        Teacher teacher = new Teacher();
        teacher.setId(id);
        return teacher;
    }
}
