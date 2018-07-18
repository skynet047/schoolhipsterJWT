package io.schoolhipster.application.service.mapper;

import io.schoolhipster.application.domain.*;
import io.schoolhipster.application.service.dto.LessonDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Lesson and its DTO LessonDTO.
 */
@Mapper(componentModel = "spring", uses = {TeacherMapper.class, SubjectMapper.class})
public interface LessonMapper extends EntityMapper<LessonDTO, Lesson> {

    @Mapping(source = "teacher.id", target = "teacherId")
    @Mapping(source = "subject.id", target = "subjectId")
    LessonDTO toDto(Lesson lesson);

    @Mapping(source = "teacherId", target = "teacher")
    @Mapping(source = "subjectId", target = "subject")
    @Mapping(target = "students", ignore = true)
    Lesson toEntity(LessonDTO lessonDTO);

    default Lesson fromId(Long id) {
        if (id == null) {
            return null;
        }
        Lesson lesson = new Lesson();
        lesson.setId(id);
        return lesson;
    }
}
