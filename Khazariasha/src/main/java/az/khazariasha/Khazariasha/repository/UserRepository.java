package az.khazariasha.Khazariasha.repository;

import az.khazariasha.Khazariasha.models.db.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    User findByEmail(String email);
}
