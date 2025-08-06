package az.khazariasha.Khazariasha.models;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthModel {
    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;
}
