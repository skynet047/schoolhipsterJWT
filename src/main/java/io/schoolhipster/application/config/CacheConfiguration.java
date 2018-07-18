package io.schoolhipster.application.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(io.schoolhipster.application.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(io.schoolhipster.application.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(io.schoolhipster.application.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(io.schoolhipster.application.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(io.schoolhipster.application.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(io.schoolhipster.application.domain.Person.class.getName(), jcacheConfiguration);
            cm.createCache(io.schoolhipster.application.domain.Teacher.class.getName(), jcacheConfiguration);
            cm.createCache(io.schoolhipster.application.domain.Teacher.class.getName() + ".subjects", jcacheConfiguration);
            cm.createCache(io.schoolhipster.application.domain.Teacher.class.getName() + ".lessons", jcacheConfiguration);
            cm.createCache(io.schoolhipster.application.domain.Student.class.getName(), jcacheConfiguration);
            cm.createCache(io.schoolhipster.application.domain.Student.class.getName() + ".lessons", jcacheConfiguration);
            cm.createCache(io.schoolhipster.application.domain.Subject.class.getName(), jcacheConfiguration);
            cm.createCache(io.schoolhipster.application.domain.Subject.class.getName() + ".lessons", jcacheConfiguration);
            cm.createCache(io.schoolhipster.application.domain.Subject.class.getName() + ".teachers", jcacheConfiguration);
            cm.createCache(io.schoolhipster.application.domain.Lesson.class.getName(), jcacheConfiguration);
            cm.createCache(io.schoolhipster.application.domain.Lesson.class.getName() + ".students", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
