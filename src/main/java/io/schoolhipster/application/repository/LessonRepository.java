package io.schoolhipster.application.repository;

import io.schoolhipster.application.domain.Lesson;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Lesson entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {

}
