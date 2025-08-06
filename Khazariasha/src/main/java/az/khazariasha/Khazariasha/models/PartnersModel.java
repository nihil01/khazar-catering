package az.khazariasha.Khazariasha.models;

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

public class PartnersModel {

    @NotNull
    @Size(min = 1, max = 30)
    private MultipartFile[] images;

}
