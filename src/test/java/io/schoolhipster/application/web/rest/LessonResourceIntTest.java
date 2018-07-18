package io.schoolhipster.application.web.rest;

import io.schoolhipster.application.SchoolhipsterJwtApp;

import io.schoolhipster.application.domain.Lesson;
import io.schoolhipster.application.domain.Teacher;
import io.schoolhipster.application.domain.Subject;
import io.schoolhipster.application.domain.Student;
import io.schoolhipster.application.repository.LessonRepository;
import io.schoolhipster.application.service.LessonService;
import io.schoolhipster.application.service.dto.LessonDTO;
import io.schoolhipster.application.service.mapper.LessonMapper;
import io.schoolhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;


import static io.schoolhipster.application.web.rest.TestUtil.sameInstant;
import static io.schoolhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the LessonResource REST controller.
 *
 * @see LessonResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolhipsterJwtApp.class)
public class LessonResourceIntTest {

    private static final ZonedDateTime DEFAULT_PLANNED_START_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_PLANNED_START_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_PLANNED_END_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_PLANNED_END_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_REAL_START_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_REAL_START_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_REAL_END_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_REAL_END_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_TOPIC = "AAAAAAAAAA";
    private static final String UPDATED_TOPIC = "BBBBBBBBBB";

    @Autowired
    private LessonRepository lessonRepository;


    @Autowired
    private LessonMapper lessonMapper;
    

    @Autowired
    private LessonService lessonService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLessonMockMvc;

    private Lesson lesson;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LessonResource lessonResource = new LessonResource(lessonService);
        this.restLessonMockMvc = MockMvcBuilders.standaloneSetup(lessonResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Lesson createEntity(EntityManager em) {
        Lesson lesson = new Lesson()
            .plannedStartTime(DEFAULT_PLANNED_START_TIME)
            .plannedEndTime(DEFAULT_PLANNED_END_TIME)
            .realStartDate(DEFAULT_REAL_START_DATE)
            .realEndDate(DEFAULT_REAL_END_DATE)
            .topic(DEFAULT_TOPIC);
        // Add required entity
        Teacher teacher = TeacherResourceIntTest.createEntity(em);
        em.persist(teacher);
        em.flush();
        lesson.setTeacher(teacher);
        // Add required entity
        Subject subject = SubjectResourceIntTest.createEntity(em);
        em.persist(subject);
        em.flush();
        lesson.setSubject(subject);
        // Add required entity
        Student student = StudentResourceIntTest.createEntity(em);
        em.persist(student);
        em.flush();
        lesson.getStudents().add(student);
        return lesson;
    }

    @Before
    public void initTest() {
        lesson = createEntity(em);
    }

    @Test
    @Transactional
    public void createLesson() throws Exception {
        int databaseSizeBeforeCreate = lessonRepository.findAll().size();

        // Create the Lesson
        LessonDTO lessonDTO = lessonMapper.toDto(lesson);
        restLessonMockMvc.perform(post("/api/lessons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lessonDTO)))
            .andExpect(status().isCreated());

        // Validate the Lesson in the database
        List<Lesson> lessonList = lessonRepository.findAll();
        assertThat(lessonList).hasSize(databaseSizeBeforeCreate + 1);
        Lesson testLesson = lessonList.get(lessonList.size() - 1);
        assertThat(testLesson.getPlannedStartTime()).isEqualTo(DEFAULT_PLANNED_START_TIME);
        assertThat(testLesson.getPlannedEndTime()).isEqualTo(DEFAULT_PLANNED_END_TIME);
        assertThat(testLesson.getRealStartDate()).isEqualTo(DEFAULT_REAL_START_DATE);
        assertThat(testLesson.getRealEndDate()).isEqualTo(DEFAULT_REAL_END_DATE);
        assertThat(testLesson.getTopic()).isEqualTo(DEFAULT_TOPIC);
    }

    @Test
    @Transactional
    public void createLessonWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = lessonRepository.findAll().size();

        // Create the Lesson with an existing ID
        lesson.setId(1L);
        LessonDTO lessonDTO = lessonMapper.toDto(lesson);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLessonMockMvc.perform(post("/api/lessons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lessonDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Lesson in the database
        List<Lesson> lessonList = lessonRepository.findAll();
        assertThat(lessonList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkPlannedStartTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = lessonRepository.findAll().size();
        // set the field null
        lesson.setPlannedStartTime(null);

        // Create the Lesson, which fails.
        LessonDTO lessonDTO = lessonMapper.toDto(lesson);

        restLessonMockMvc.perform(post("/api/lessons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lessonDTO)))
            .andExpect(status().isBadRequest());

        List<Lesson> lessonList = lessonRepository.findAll();
        assertThat(lessonList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPlannedEndTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = lessonRepository.findAll().size();
        // set the field null
        lesson.setPlannedEndTime(null);

        // Create the Lesson, which fails.
        LessonDTO lessonDTO = lessonMapper.toDto(lesson);

        restLessonMockMvc.perform(post("/api/lessons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lessonDTO)))
            .andExpect(status().isBadRequest());

        List<Lesson> lessonList = lessonRepository.findAll();
        assertThat(lessonList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRealStartDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = lessonRepository.findAll().size();
        // set the field null
        lesson.setRealStartDate(null);

        // Create the Lesson, which fails.
        LessonDTO lessonDTO = lessonMapper.toDto(lesson);

        restLessonMockMvc.perform(post("/api/lessons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lessonDTO)))
            .andExpect(status().isBadRequest());

        List<Lesson> lessonList = lessonRepository.findAll();
        assertThat(lessonList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRealEndDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = lessonRepository.findAll().size();
        // set the field null
        lesson.setRealEndDate(null);

        // Create the Lesson, which fails.
        LessonDTO lessonDTO = lessonMapper.toDto(lesson);

        restLessonMockMvc.perform(post("/api/lessons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lessonDTO)))
            .andExpect(status().isBadRequest());

        List<Lesson> lessonList = lessonRepository.findAll();
        assertThat(lessonList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLessons() throws Exception {
        // Initialize the database
        lessonRepository.saveAndFlush(lesson);

        // Get all the lessonList
        restLessonMockMvc.perform(get("/api/lessons?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lesson.getId().intValue())))
            .andExpect(jsonPath("$.[*].plannedStartTime").value(hasItem(sameInstant(DEFAULT_PLANNED_START_TIME))))
            .andExpect(jsonPath("$.[*].plannedEndTime").value(hasItem(sameInstant(DEFAULT_PLANNED_END_TIME))))
            .andExpect(jsonPath("$.[*].realStartDate").value(hasItem(sameInstant(DEFAULT_REAL_START_DATE))))
            .andExpect(jsonPath("$.[*].realEndDate").value(hasItem(sameInstant(DEFAULT_REAL_END_DATE))))
            .andExpect(jsonPath("$.[*].topic").value(hasItem(DEFAULT_TOPIC.toString())));
    }
    

    @Test
    @Transactional
    public void getLesson() throws Exception {
        // Initialize the database
        lessonRepository.saveAndFlush(lesson);

        // Get the lesson
        restLessonMockMvc.perform(get("/api/lessons/{id}", lesson.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(lesson.getId().intValue()))
            .andExpect(jsonPath("$.plannedStartTime").value(sameInstant(DEFAULT_PLANNED_START_TIME)))
            .andExpect(jsonPath("$.plannedEndTime").value(sameInstant(DEFAULT_PLANNED_END_TIME)))
            .andExpect(jsonPath("$.realStartDate").value(sameInstant(DEFAULT_REAL_START_DATE)))
            .andExpect(jsonPath("$.realEndDate").value(sameInstant(DEFAULT_REAL_END_DATE)))
            .andExpect(jsonPath("$.topic").value(DEFAULT_TOPIC.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingLesson() throws Exception {
        // Get the lesson
        restLessonMockMvc.perform(get("/api/lessons/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLesson() throws Exception {
        // Initialize the database
        lessonRepository.saveAndFlush(lesson);

        int databaseSizeBeforeUpdate = lessonRepository.findAll().size();

        // Update the lesson
        Lesson updatedLesson = lessonRepository.findById(lesson.getId()).get();
        // Disconnect from session so that the updates on updatedLesson are not directly saved in db
        em.detach(updatedLesson);
        updatedLesson
            .plannedStartTime(UPDATED_PLANNED_START_TIME)
            .plannedEndTime(UPDATED_PLANNED_END_TIME)
            .realStartDate(UPDATED_REAL_START_DATE)
            .realEndDate(UPDATED_REAL_END_DATE)
            .topic(UPDATED_TOPIC);
        LessonDTO lessonDTO = lessonMapper.toDto(updatedLesson);

        restLessonMockMvc.perform(put("/api/lessons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lessonDTO)))
            .andExpect(status().isOk());

        // Validate the Lesson in the database
        List<Lesson> lessonList = lessonRepository.findAll();
        assertThat(lessonList).hasSize(databaseSizeBeforeUpdate);
        Lesson testLesson = lessonList.get(lessonList.size() - 1);
        assertThat(testLesson.getPlannedStartTime()).isEqualTo(UPDATED_PLANNED_START_TIME);
        assertThat(testLesson.getPlannedEndTime()).isEqualTo(UPDATED_PLANNED_END_TIME);
        assertThat(testLesson.getRealStartDate()).isEqualTo(UPDATED_REAL_START_DATE);
        assertThat(testLesson.getRealEndDate()).isEqualTo(UPDATED_REAL_END_DATE);
        assertThat(testLesson.getTopic()).isEqualTo(UPDATED_TOPIC);
    }

    @Test
    @Transactional
    public void updateNonExistingLesson() throws Exception {
        int databaseSizeBeforeUpdate = lessonRepository.findAll().size();

        // Create the Lesson
        LessonDTO lessonDTO = lessonMapper.toDto(lesson);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restLessonMockMvc.perform(put("/api/lessons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lessonDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Lesson in the database
        List<Lesson> lessonList = lessonRepository.findAll();
        assertThat(lessonList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLesson() throws Exception {
        // Initialize the database
        lessonRepository.saveAndFlush(lesson);

        int databaseSizeBeforeDelete = lessonRepository.findAll().size();

        // Get the lesson
        restLessonMockMvc.perform(delete("/api/lessons/{id}", lesson.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Lesson> lessonList = lessonRepository.findAll();
        assertThat(lessonList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Lesson.class);
        Lesson lesson1 = new Lesson();
        lesson1.setId(1L);
        Lesson lesson2 = new Lesson();
        lesson2.setId(lesson1.getId());
        assertThat(lesson1).isEqualTo(lesson2);
        lesson2.setId(2L);
        assertThat(lesson1).isNotEqualTo(lesson2);
        lesson1.setId(null);
        assertThat(lesson1).isNotEqualTo(lesson2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LessonDTO.class);
        LessonDTO lessonDTO1 = new LessonDTO();
        lessonDTO1.setId(1L);
        LessonDTO lessonDTO2 = new LessonDTO();
        assertThat(lessonDTO1).isNotEqualTo(lessonDTO2);
        lessonDTO2.setId(lessonDTO1.getId());
        assertThat(lessonDTO1).isEqualTo(lessonDTO2);
        lessonDTO2.setId(2L);
        assertThat(lessonDTO1).isNotEqualTo(lessonDTO2);
        lessonDTO1.setId(null);
        assertThat(lessonDTO1).isNotEqualTo(lessonDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(lessonMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(lessonMapper.fromId(null)).isNull();
    }
}
