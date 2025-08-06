package az.khazariasha.Khazariasha.repository;

import az.khazariasha.Khazariasha.models.db.About;
import org.springframework.data.repository.CrudRepository;

public interface AboutRepository extends CrudRepository<About, Long> {
    About findByLang(String lang);
}
