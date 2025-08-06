package az.khazariasha.Khazariasha.repository;

import az.khazariasha.Khazariasha.models.db.Employee;
import jakarta.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;

public interface EmployeeRepository extends CrudRepository<Employee, Integer> {
    Employee findByName(String name);

    @Transactional
    void deleteByName(String name);
}
