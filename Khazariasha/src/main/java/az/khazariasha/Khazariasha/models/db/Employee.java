package az.khazariasha.Khazariasha.models.db;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@Entity
@Table(name="employees")

public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String position;
    private String image;

    public Employee(String image,  String name, String position) {
        this.image = image;
        this.name = name;
        this.position = position;
    }


}
