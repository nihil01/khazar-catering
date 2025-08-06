package az.khazariasha.Khazariasha.repository;

import az.khazariasha.Khazariasha.models.db.AboutShort;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AboutShortRepository extends CrudRepository<AboutShort,Long> {
    AboutShort findByLang(String lang);
}
