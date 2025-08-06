package az.khazariasha.Khazariasha.models.db;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@Data
@Entity
@Table(name = "gallery")
public class Gallery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String image;
    private String name;

    public Gallery(String image, String name) {
        this.image = image;
        this.name = name;
    }


}
