package az.khazariasha.Khazariasha.models;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Data
public class GalleryModel {

    @NotBlank
    private MultipartFile image;
    @NotBlank
    private String name;

}
