package az.khazariasha.Khazariasha.services.jwt;

import az.khazariasha.Khazariasha.services.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService tokenProvider;
    private  final UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);

            if (tokenProvider.isTokenValid(token)) {
                System.out.println("Token is valid");
                String username = tokenProvider.extractUsername(token);
                UserDetails userDetails = userService.loadUserByUsername(username);

                System.out.println("Username : " + username);

                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                System.out.println(auth.getPrincipal());

                SecurityContextHolder.getContext().setAuthentication(auth);
                System.out.println("Authorities after setting context: " + auth.getAuthorities());
            }
        }

        filterChain.doFilter(request, response);
    }
}
