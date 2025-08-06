package az.khazariasha.Khazariasha.models;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


@AllArgsConstructor
@NoArgsConstructor
@ToString
@Data

public class AboutModel {

    @NotBlank
    private String heading;
    @NotBlank
    private String abilities;
    @NotBlank
    private String lang;

}
