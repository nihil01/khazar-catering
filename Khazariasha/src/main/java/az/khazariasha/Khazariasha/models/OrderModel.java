package az.khazariasha.Khazariasha.models;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Data

public class OrderModel {
    @NotBlank
    private String name;
    @NotBlank
    private String email;
    @NotBlank
    private String phoneNumber;
    @NotBlank
    private String city;
    @NotBlank
    private String eventType;
    @NotBlank
    private String persons;
    @NotBlank
    private String cuisineType;
    @NotBlank
    private String eventDate;
}
