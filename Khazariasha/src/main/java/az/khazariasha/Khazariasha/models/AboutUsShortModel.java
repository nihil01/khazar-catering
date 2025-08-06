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

public class AboutUsShortModel {
    @NotBlank
    private String lang;
    @NotBlank
    private String subtext;
    @NotBlank
    private String description;
    @NotBlank
    private String services;
}
