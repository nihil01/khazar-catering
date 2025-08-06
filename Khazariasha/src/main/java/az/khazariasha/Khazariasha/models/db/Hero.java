package az.khazariasha.Khazariasha.models.db;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "hero_section")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Hero {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Hero(String subtext, String details, String images, String lang) {
        this.subtext = subtext;
        this.details = details;
        this.images = images;
        this.lang = lang;
    }

    private String images;
    private String subtext;
    private String details;
    private String lang;

}
