package io.schoolhipster.application.web.rest;

import io.schoolhipster.application.SchoolhipsterJwtApp;

import io.schoolhipster.application.domain.Teacher;
import io.schoolhipster.application.domain.Subject;
import io.schoolhipster.application.domain.Lesson;
import io.schoolhipster.application.repository.TeacherRepository;
import io.schoolhipster.application.service.TeacherService;
import io.schoolhipster.application.service.dto.TeacherDTO;
import io.schoolhipster.application.service.mapper.TeacherMapper;
import io.schoolhipster.application.web.rest.errors.ExceptionTranslator;
import io.schoolhipster.application.service.dto.TeacherCriteria;
import io.schoolhipster.application.service.TeacherQueryService;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;


import static io.schoolhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TeacherResource REST controller.
 *
 * @see TeacherResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolhipsterJwtApp.class)
public class TeacherResourceIntTest {

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "xU@6c.lI";
    private static final String UPDATED_EMAIL = "X@2A.vy";

    private static final Integer DEFAULT_HOURLY_RATE = 1;
    private static final Integer UPDATED_HOURLY_RATE = 2;

    private static final Integer DEFAULT_RATE = 1;
    private static final Integer UPDATED_RATE = 2;

    @Autowired
    private TeacherRepository teacherRepository;
    @Mock
    private TeacherRepository teacherRepositoryMock;

    @Autowired
    private TeacherMapper teacherMapper;

    @Mock
    private TeacherService teacherServiceMock;

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private TeacherQueryService teacherQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTeacherMockMvc;

    private Teacher teacher;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TeacherResource teacherResource = new TeacherResource(teacherService, teacherQueryService);
        this.restTeacherMockMvc = MockMvcBuilders.standaloneSetup(teacherResource)
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
    public static Teacher createEntity(EntityManager em) {
        Teacher teacher = new Teacher()
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .phoneNumber(DEFAULT_PHONE_NUMBER)
            .email(DEFAULT_EMAIL)
            .hourlyRate(DEFAULT_HOURLY_RATE)
            .rate(DEFAULT_RATE);
        // Add required entity
        Subject subject = SubjectResourceIntTest.createEntity(em);
        em.persist(subject);
        em.flush();
        teacher.getSubjects().add(subject);
        return teacher;
    }

    @Before
    public void initTest() {
        teacher = createEntity(em);
    }

    @Test
    @Transactional
    public void createTeacher() throws Exception {
        int databaseSizeBeforeCreate = teacherRepository.findAll().size();

        // Create the Teacher
        TeacherDTO teacherDTO = teacherMapper.toDto(teacher);
        restTeacherMockMvc.perform(post("/api/teachers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teacherDTO)))
            .andExpect(status().isCreated());

        // Validate the Teacher in the database
        List<Teacher> teacherList = teacherRepository.findAll();
        assertThat(teacherList).hasSize(databaseSizeBeforeCreate + 1);
        Teacher testTeacher = teacherList.get(teacherList.size() - 1);
        assertThat(testTeacher.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testTeacher.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testTeacher.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
        assertThat(testTeacher.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testTeacher.getHourlyRate()).isEqualTo(DEFAULT_HOURLY_RATE);
        assertThat(testTeacher.getRate()).isEqualTo(DEFAULT_RATE);
    }

    @Test
    @Transactional
    public void createTeacherWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = teacherRepository.findAll().size();

        // Create the Teacher with an existing ID
        teacher.setId(1L);
        TeacherDTO teacherDTO = teacherMapper.toDto(teacher);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTeacherMockMvc.perform(post("/api/teachers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teacherDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Teacher in the database
        List<Teacher> teacherList = teacherRepository.findAll();
        assertThat(teacherList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkPhoneNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = teacherRepository.findAll().size();
        // set the field null
        teacher.setPhoneNumber(null);

        // Create the Teacher, which fails.
        TeacherDTO teacherDTO = teacherMapper.toDto(teacher);

        restTeacherMockMvc.perform(post("/api/teachers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teacherDTO)))
            .andExpect(status().isBadRequest());

        List<Teacher> teacherList = teacherRepository.findAll();
        assertThat(teacherList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = teacherRepository.findAll().size();
        // set the field null
        teacher.setEmail(null);

        // Create the Teacher, which fails.
        TeacherDTO teacherDTO = teacherMapper.toDto(teacher);

        restTeacherMockMvc.perform(post("/api/teachers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teacherDTO)))
            .andExpect(status().isBadRequest());

        List<Teacher> teacherList = teacherRepository.findAll();
        assertThat(teacherList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTeachers() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);

        // Get all the teacherList
        restTeacherMockMvc.perform(get("/api/teachers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(teacher.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME.toString())))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME.toString())))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].hourlyRate").value(hasItem(DEFAULT_HOURLY_RATE)))
            .andExpect(jsonPath("$.[*].rate").value(hasItem(DEFAULT_RATE)));
    }

    public void getAllTeachersWithEagerRelationshipsIsEnabled() throws Exception {
        TeacherResource teacherResource = new TeacherResource(teacherServiceMock, teacherQueryService);
        when(teacherServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restTeacherMockMvc = MockMvcBuilders.standaloneSetup(teacherResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTeacherMockMvc.perform(get("/api/teachers?eagerload=true"))
        .andExpect(status().isOk());

        verify(teacherServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    public void getAllTeachersWithEagerRelationshipsIsNotEnabled() throws Exception {
        TeacherResource teacherResource = new TeacherResource(teacherServiceMock, teacherQueryService);
            when(teacherServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restTeacherMockMvc = MockMvcBuilders.standaloneSetup(teacherResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTeacherMockMvc.perform(get("/api/teachers?eagerload=true"))
        .andExpect(status().isOk());

            verify(teacherServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getTeacher() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);

        // Get the teacher
        restTeacherMockMvc.perform(get("/api/teachers/{id}", teacher.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(teacher.getId().intValue()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME.toString()))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME.toString()))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.hourlyRate").value(DEFAULT_HOURLY_RATE))
            .andExpect(jsonPath("$.rate").value(DEFAULT_RATE));
    }

    @Test
    @Transactional
    public void getAllTeachersByFirstNameIsEqualToSomething() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);

        // Get all the teacherList where firstName equals to DEFAULT_FIRST_NAME
        defaultTeacherShouldBeFound("firstName.equals=" + DEFAULT_FIRST_NAME);

        // Get all the teacherList where firstName equals to UPDATED_FIRST_NAME
        defaultTeacherShouldNotBeFound("firstName.equals=" + UPDATED_FIRST_NAME);
    }

    @Test
    @Transactional
    public void getAllTeachersByFirstNameIsInShouldWork() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);

        // Get all the teacherList where firstName in DEFAULT_FIRST_NAME or UPDATED_FIRST_NAME
        defaultTeacherShouldBeFound("firstName.in=" + DEFAULT_FIRST_NAME + "," + UPDATED_FIRST_NAME);

        // Get all the teacherList where firstName equals to UPDATED_FIRST_NAME
        defaultTeacherShouldNotBeFound("firstName.in=" + UPDATED_FIRST_NAME);
    }

    @Test
    @Transactional
    public void getAllTeachersByFirstNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);

        // Get all the teacherList where firstName is not null
        defaultTeacherShouldBeFound("firstName.specified=true");

        // Get all the teacherList where firstName is null
        defaultTeacherShouldNotBeFound("firstName.specified=false");
    }

    @Test
    @Transactional
    public void getAllTeachersByLastNameIsEqualToSomething() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);

        // Get all the teacherList where lastName equals to DEFAULT_LAST_NAME
        defaultTeacherShouldBeFound("lastName.equals=" + DEFAULT_LAST_NAME);

        // Get all the teacherList where lastName equals to UPDATED_LAST_NAME
        defaultTeacherShouldNotBeFound("lastName.equals=" + UPDATED_LAST_NAME);
    }

    @Test
    @Transactional
    public void getAllTeachersByLastNameIsInShouldWork() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);

        // Get all the teacherList where lastName in DEFAULT_LAST_NAME or UPDATED_LAST_NAME
        defaultTeacherShouldBeFound("lastName.in=" + DEFAULT_LAST_NAME + "," + UPDATED_LAST_NAME);

        // Get all the teacherList where lastName equals to UPDATED_LAST_NAME
        defaultTeacherShouldNotBeFound("lastName.in=" + UPDATED_LAST_NAME);
    }

    @Test
    @Transactional
    public void getAllTeachersByLastNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);

        // Get all the teacherList where lastName is not null
        defaultTeacherShouldBeFound("lastName.specified=true");

        // Get all the teacherList where lastName is null
        defaultTeacherShouldNotBeFound("lastName.specified=false");
    }

    @Test
    @Transactional
    public void getAllTeachersByPhoneNumberIsEqualToSomething() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);

        // Get all the teacherList where phoneNumber equals to DEFAULT_PHONE_NUMBER
        defaultTeacherShouldBeFound("phoneNumber.equals=" + DEFAULT_PHONE_NUMBER);

        // Get all the teacherList where phoneNumber equals to UPDATED_PHONE_NUMBER
        defaultTeacherShouldNotBeFound("phoneNumber.equals=" + UPDATED_PHONE_NUMBER);
    }

    @Test
    @Transactional
    public void getAllTeachersByPhoneNumberIsInShouldWork() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);

        // Get all the teacherList where phoneNumber in DEFAULT_PHONE_NUMBER or UPDATED_PHONE_NUMBER
        defaultTeacherShouldBeFound("phoneNumber.in=" + DEFAULT_PHONE_NUMBER + "," + UPDATED_PHONE_NUMBER);

        // Get all the teacherList where phoneNumber equals to UPDATED_PHONE_NUMBER
        defaultTeacherShouldNotBeFound("phoneNumber.in=" + UPDATED_PHONE_NUMBER);
    }

    @Test
    @Transactional
    public void getAllTeachersByPhoneNumberIsNullOrNotNull() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);

        // Get all the teacherList where phoneNumber is not null
        defaultTeacherShouldBeFound("phoneNumber.specified=true");

        // Get all the teacherList where phoneNumber is null
        defaultTeacherShouldNotBeFound("phoneNumber.specified=false");
    }

    @Test
    @Transactional
    public void getAllTeachersByEmailIsEqualToSomething() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);

        // Get all the teacherList where email equals to DEFAULT_EMAIL
        defaultTeacherShouldBeFound("email.equals=" + DEFAULT_EMAIL);

        // Get all the teacherList where email equals to UPDATED_EMAIL
        defaultTeacherShouldNotBeFound("email.equals=" + UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void getAllTeachersByEmailIsInShouldWork() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);

        // Get all the teacherList where email in DEFAULT_EMAIL or UPDATED_EMAIL
        defaultTeacherShouldBeFound("email.in=" + DEFAULT_EMAIL + "," + UPDATED_EMAIL);

        // Get all the teacherList where email equals to UPDATED_EMAIL
        defaultTeacherShouldNotBeFound("email.in=" + UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void getAllTeachersByEmailIsNullOrNotNull() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);

        // Get all the teacherList where email is not null
        defaultTeacherShouldBeFound("email.specified=true");

        // Get all the teacherList where email is null
        defaultTeacherShouldNotBeFound("email.specified=false");
    }

    @Test
    @Transactional
    public void getAllTeachersByHourlyRateIsEqualToSomething() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);

        // Get all the teacherList where hourlyRate equals to DEFAULT_HOURLY_RATE
        defaultTeacherShouldBeFound("hourlyRate.equals=" + DEFAULT_HOURLY_RATE);

        // Get all the teacherList where hourlyRate equals to UPDATED_HOURLY_RATE
        defaultTeacherShouldNotBeFound("hourlyRate.equals=" + UPDATED_HOURLY_RATE);
    }

    @Test
    @Transactional
    public void getAllTeachersByHourlyRateIsInShouldWork() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);

        // Get all the teacherList where hourlyRate in DEFAULT_HOURLY_RATE or UPDATED_HOURLY_RATE
        defaultTeacherShouldBeFound("hourlyRate.in=" + DEFAULT_HOURLY_RATE + "," + UPDATED_HOURLY_RATE);

        // Get all the teacherList where hourlyRate equals to UPDATED_HOURLY_RATE
        defaultTeacherShouldNotBeFound("hourlyRate.in=" + UPDATED_HOURLY_RATE);
    }

    @Test
    @Transactional
    public void getAllTeachersByHourlyRateIsNullOrNotNull() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);

        // Get all the teacherList where hourlyRate is not null
        defaultTeacherShouldBeFound("hourlyRate.specified=true");

        // Get all the teacherList where hourlyRate is null
        defaultTeacherShouldNotBeFound("hourlyRate.specified=false");
    }

    @Test
    @Transactional
    public void getAllTeachersByHourlyRateIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);

        // Get all the teacherList where hourlyRate greater than or equals to DEFAULT_HOURLY_RATE
        defaultTeacherShouldBeFound("hourlyRate.greaterOrEqualThan=" + DEFAULT_HOURLY_RATE);

        // Get all the teacherList where hourlyRate greater than or equals to UPDATED_HOURLY_RATE
        defaultTeacherShouldNotBeFound("hourlyRate.greaterOrEqualThan=" + UPDATED_HOURLY_RATE);
    }

    @Test
    @Transactional
    public void getAllTeachersByHourlyRateIsLessThanSomething() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);

        // Get all the teacherList where hourlyRate less than or equals to DEFAULT_HOURLY_RATE
        defaultTeacherShouldNotBeFound("hourlyRate.lessThan=" + DEFAULT_HOURLY_RATE);

        // Get all the teacherList where hourlyRate less than or equals to UPDATED_HOURLY_RATE
        defaultTeacherShouldBeFound("hourlyRate.lessThan=" + UPDATED_HOURLY_RATE);
    }


    @Test
    @Transactional
    public void getAllTeachersByRateIsEqualToSomething() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);

        // Get all the teacherList where rate equals to DEFAULT_RATE
        defaultTeacherShouldBeFound("rate.equals=" + DEFAULT_RATE);

        // Get all the teacherList where rate equals to UPDATED_RATE
        defaultTeacherShouldNotBeFound("rate.equals=" + UPDATED_RATE);
    }

    @Test
    @Transactional
    public void getAllTeachersByRateIsInShouldWork() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);

        // Get all the teacherList where rate in DEFAULT_RATE or UPDATED_RATE
        defaultTeacherShouldBeFound("rate.in=" + DEFAULT_RATE + "," + UPDATED_RATE);

        // Get all the teacherList where rate equals to UPDATED_RATE
        defaultTeacherShouldNotBeFound("rate.in=" + UPDATED_RATE);
    }

    @Test
    @Transactional
    public void getAllTeachersByRateIsNullOrNotNull() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);

        // Get all the teacherList where rate is not null
        defaultTeacherShouldBeFound("rate.specified=true");

        // Get all the teacherList where rate is null
        defaultTeacherShouldNotBeFound("rate.specified=false");
    }

    @Test
    @Transactional
    public void getAllTeachersByRateIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);

        // Get all the teacherList where rate greater than or equals to DEFAULT_RATE
        defaultTeacherShouldBeFound("rate.greaterOrEqualThan=" + DEFAULT_RATE);

        // Get all the teacherList where rate greater than or equals to UPDATED_RATE
        defaultTeacherShouldNotBeFound("rate.greaterOrEqualThan=" + UPDATED_RATE);
    }

    @Test
    @Transactional
    public void getAllTeachersByRateIsLessThanSomething() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);

        // Get all the teacherList where rate less than or equals to DEFAULT_RATE
        defaultTeacherShouldNotBeFound("rate.lessThan=" + DEFAULT_RATE);

        // Get all the teacherList where rate less than or equals to UPDATED_RATE
        defaultTeacherShouldBeFound("rate.lessThan=" + UPDATED_RATE);
    }


    @Test
    @Transactional
    public void getAllTeachersBySubjectsIsEqualToSomething() throws Exception {
        // Initialize the database
        Subject subjects = SubjectResourceIntTest.createEntity(em);
        em.persist(subjects);
        em.flush();
        teacher.addSubjects(subjects);
        teacherRepository.saveAndFlush(teacher);
        Long subjectsId = subjects.getId();

        // Get all the teacherList where subjects equals to subjectsId
        defaultTeacherShouldBeFound("subjectsId.equals=" + subjectsId);

        // Get all the teacherList where subjects equals to subjectsId + 1
        defaultTeacherShouldNotBeFound("subjectsId.equals=" + (subjectsId + 1));
    }


    @Test
    @Transactional
    public void getAllTeachersByLessonsIsEqualToSomething() throws Exception {
        // Initialize the database
        Lesson lessons = LessonResourceIntTest.createEntity(em);
        em.persist(lessons);
        em.flush();
        teacher.addLessons(lessons);
        teacherRepository.saveAndFlush(teacher);
        Long lessonsId = lessons.getId();

        // Get all the teacherList where lessons equals to lessonsId
        defaultTeacherShouldBeFound("lessonsId.equals=" + lessonsId);

        // Get all the teacherList where lessons equals to lessonsId + 1
        defaultTeacherShouldNotBeFound("lessonsId.equals=" + (lessonsId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned
     */
    private void defaultTeacherShouldBeFound(String filter) throws Exception {
        restTeacherMockMvc.perform(get("/api/teachers?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(teacher.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME.toString())))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME.toString())))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].hourlyRate").value(hasItem(DEFAULT_HOURLY_RATE)))
            .andExpect(jsonPath("$.[*].rate").value(hasItem(DEFAULT_RATE)));
    }

    /**
     * Executes the search, and checks that the default entity is not returned
     */
    private void defaultTeacherShouldNotBeFound(String filter) throws Exception {
        restTeacherMockMvc.perform(get("/api/teachers?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());
    }

    @Test
    @Transactional
    public void getNonExistingTeacher() throws Exception {
        // Get the teacher
        restTeacherMockMvc.perform(get("/api/teachers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTeacher() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);

        int databaseSizeBeforeUpdate = teacherRepository.findAll().size();

        // Update the teacher
        Teacher updatedTeacher = teacherRepository.findById(teacher.getId()).get();
        // Disconnect from session so that the updates on updatedTeacher are not directly saved in db
        em.detach(updatedTeacher);
        updatedTeacher
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .email(UPDATED_EMAIL)
            .hourlyRate(UPDATED_HOURLY_RATE)
            .rate(UPDATED_RATE);
        TeacherDTO teacherDTO = teacherMapper.toDto(updatedTeacher);

        restTeacherMockMvc.perform(put("/api/teachers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teacherDTO)))
            .andExpect(status().isOk());

        // Validate the Teacher in the database
        List<Teacher> teacherList = teacherRepository.findAll();
        assertThat(teacherList).hasSize(databaseSizeBeforeUpdate);
        Teacher testTeacher = teacherList.get(teacherList.size() - 1);
        assertThat(testTeacher.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testTeacher.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testTeacher.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testTeacher.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testTeacher.getHourlyRate()).isEqualTo(UPDATED_HOURLY_RATE);
        assertThat(testTeacher.getRate()).isEqualTo(UPDATED_RATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTeacher() throws Exception {
        int databaseSizeBeforeUpdate = teacherRepository.findAll().size();

        // Create the Teacher
        TeacherDTO teacherDTO = teacherMapper.toDto(teacher);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTeacherMockMvc.perform(put("/api/teachers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teacherDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Teacher in the database
        List<Teacher> teacherList = teacherRepository.findAll();
        assertThat(teacherList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTeacher() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);

        int databaseSizeBeforeDelete = teacherRepository.findAll().size();

        // Get the teacher
        restTeacherMockMvc.perform(delete("/api/teachers/{id}", teacher.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Teacher> teacherList = teacherRepository.findAll();
        assertThat(teacherList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Teacher.class);
        Teacher teacher1 = new Teacher();
        teacher1.setId(1L);
        Teacher teacher2 = new Teacher();
        teacher2.setId(teacher1.getId());
        assertThat(teacher1).isEqualTo(teacher2);
        teacher2.setId(2L);
        assertThat(teacher1).isNotEqualTo(teacher2);
        teacher1.setId(null);
        assertThat(teacher1).isNotEqualTo(teacher2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TeacherDTO.class);
        TeacherDTO teacherDTO1 = new TeacherDTO();
        teacherDTO1.setId(1L);
        TeacherDTO teacherDTO2 = new TeacherDTO();
        assertThat(teacherDTO1).isNotEqualTo(teacherDTO2);
        teacherDTO2.setId(teacherDTO1.getId());
        assertThat(teacherDTO1).isEqualTo(teacherDTO2);
        teacherDTO2.setId(2L);
        assertThat(teacherDTO1).isNotEqualTo(teacherDTO2);
        teacherDTO1.setId(null);
        assertThat(teacherDTO1).isNotEqualTo(teacherDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(teacherMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(teacherMapper.fromId(null)).isNull();
    }
}
