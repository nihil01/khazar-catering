package az.khazariasha.Khazariasha.models.db;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@Entity
@Table(name="partners")

public class Partners {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String images;

    public Partners(String images) {
        this.images = images;
    }


}
