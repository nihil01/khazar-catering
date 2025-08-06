package az.khazariasha.Khazariasha.repository;

import az.khazariasha.Khazariasha.models.db.Gallery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GalleryRepository extends JpaRepository<Gallery,Long> {

}
