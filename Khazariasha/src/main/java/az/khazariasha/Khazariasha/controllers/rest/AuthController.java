package az.khazariasha.Khazariasha.controllers.rest;

import az.khazariasha.Khazariasha.models.AuthModel;
import az.khazariasha.Khazariasha.models.db.User;
import az.khazariasha.Khazariasha.repository.UserRepository;
import az.khazariasha.Khazariasha.services.jwt.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class AuthController {
    //    private final UserRepository userRepository;
//    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authManager;
    private final JwtService jwtService;

    @PostMapping("/auth")
    public ResponseEntity<Map<String, String>> auth(@Valid @RequestBody AuthModel authModel) {

        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(authModel.getEmail(), authModel.getPassword());

        System.out.println(authToken);

        Authentication auth = authManager.authenticate(authToken);

        System.out.println(auth);

        if (auth.isAuthenticated()) {
            SecurityContextHolder.getContext().setAuthentication(auth);
            String token = jwtService.generateToken(authModel.getEmail());

            return ResponseEntity.ok()
                .body(
                    Map.of(
                        "message", "Login successful",
                        "token", token
                    )
                );
//        userRepository.save(new User(authModel.getEmail(), passwordEncoder.encode(authModel.getPassword()), List.of("ADMIN")));
        }

        return ResponseEntity.ok(Map.of(
                "message", "Login unsuccessful"
        ));


    }
}
