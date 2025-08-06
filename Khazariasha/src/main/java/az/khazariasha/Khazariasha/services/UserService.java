package az.khazariasha.Khazariasha.services;

import az.khazariasha.Khazariasha.models.db.User;
import az.khazariasha.Khazariasha.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        System.out.println("Email = " + email);
        User user = userRepository.findByEmail(email);

        System.out.println(user);

        if (user == null) {
            throw new UsernameNotFoundException(email);
        }

        System.out.println("User authenticated!");
        System.out.println("User role from DB: " + user.getRole());

        return new org.springframework.security.core.userdetails.User(
            email, user.getPassword(), List.of(new SimpleGrantedAuthority(user.getRole()))
        );

    }
}
