package az.khazariasha.Khazariasha.repository;

import az.khazariasha.Khazariasha.models.db.Hero;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HeroRepository extends CrudRepository<Hero, Long> {

    Hero findByLang(String lang);
}
