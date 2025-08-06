package az.khazariasha.Khazariasha.models.db;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@Entity
@Table(name="certificates")

public class Certificates {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String images;

    public Certificates(String images) {
        this.images = images;
    }


}
