package az.khazariasha.Khazariasha.models;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Data

public class HeroModel {

    @NotBlank
    private String subtitle;
    @NotBlank
    private String details;
    @NotNull
    @Size(min = 1, max = 30)
    private MultipartFile[] files;
    @NotBlank
    private String lang;

}
