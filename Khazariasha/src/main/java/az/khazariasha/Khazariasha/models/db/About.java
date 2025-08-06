package az.khazariasha.Khazariasha.models.db;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@Entity
@Table(name="about")

public class About {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String heading;
    private String abilities;
    private String lang;

    public About(String subtext, String description, String lang) {
        this.heading = subtext;
        this.abilities = description;
        this.lang = lang;
    }


}
