package io.schoolhipster.application.service.impl;

import io.schoolhipster.application.service.PersonService;
import io.schoolhipster.application.domain.Person;
import io.schoolhipster.application.repository.PersonRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Person.
 */
@Service
@Transactional
public class PersonServiceImpl implements PersonService {

    private final Logger log = LoggerFactory.getLogger(PersonServiceImpl.class);

    private final PersonRepository personRepository;

    public PersonServiceImpl(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    /**
     * Save a person.
     *
     * @param person the entity to save
     * @return the persisted entity
     */
    @Override
    public Person save(Person person) {
        log.debug("Request to save Person : {}", person);
        return personRepository.save(person);
    }

    /**
     * Get all the people.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Person> findAll() {
        log.debug("Request to get all People");
        return personRepository.findAll();
    }

    /**
     * Get one person by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Person findOne(Long id) {
        log.debug("Request to get Person : {}", id);
        return personRepository.findOne(id);
    }

    /**
     * Delete the person by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Person : {}", id);
        personRepository.delete(id);
    }
}
