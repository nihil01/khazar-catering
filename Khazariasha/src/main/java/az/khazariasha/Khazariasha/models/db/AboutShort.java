package az.khazariasha.Khazariasha.models.db;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@Entity
@Table(name="about_us_short")

public class AboutShort {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String subtext;
    private String description;
    private String services;
    private String lang;

    public AboutShort(String subtext, String description, String services, String lang) {
        this.subtext = subtext;
        this.description = description;
        this.services = services;
        this.lang = lang;
    }


}
