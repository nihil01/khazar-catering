package az.khazariasha.Khazariasha.services.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
public class JwtService {
    private static final String SECRET = "your-very-secret-key";

    public String generateToken(String email) {
        return JWT.create()
            .withSubject(email)
            .withClaim("email", email)
            .withIssuer("khazariasha")
            .withIssuedAt(new Date())
            .withExpiresAt(Date.from(Instant.now().plus(1, ChronoUnit.DAYS)))
            .sign(Algorithm.HMAC256(SECRET));
    }

    public String extractUsername(String token) {
        return JWT.decode(token).getClaim("email").asString();
    }

    public boolean isTokenValid(String token) {
        try {
            JWT.require(Algorithm.HMAC256(SECRET)).withIssuer("khazariasha").build().verify(token);
            return true;
        } catch (JWTVerificationException | IllegalArgumentException e) {
            System.err.println(e.getMessage());
            return false;
        }
    }
}
