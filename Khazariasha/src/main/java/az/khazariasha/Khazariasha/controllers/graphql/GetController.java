package az.khazariasha.Khazariasha.controllers.graphql;


import az.khazariasha.Khazariasha.models.db.*;
import az.khazariasha.Khazariasha.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("graphql")
@RequiredArgsConstructor
public class GetController {

    private final CertificatesRepository certificatesRepository;
    private final AboutShortRepository aboutShortRepository;
    private final HeroRepository heroRepository;
    private final PartnersRepository partnersRepository;
    private final AboutRepository aboutRepository;
    private final EmployeeRepository employeeRepository;
    private final GalleryRepository galleryRepository;

    @QueryMapping
    public AboutShort getAboutShorts(@Argument String lang) {
        return aboutShortRepository.findByLang(lang);
    }

    @QueryMapping
    public Hero getHeroes(@Argument String lang) {
        return heroRepository.findByLang(lang);
    }

    @QueryMapping
    public Iterable<Partners> getAllPartners() {
        return partnersRepository.findAll();
    }

    @QueryMapping
    public Iterable<Certificates> getAllCertificates() {
        return certificatesRepository.findAll();
    }

    @QueryMapping
    public Iterable<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @QueryMapping
    public Iterable<Gallery> getGallery() {return galleryRepository.findAll();}

    @QueryMapping
    public About getAbout(@Argument String lang) {
        return aboutRepository.findByLang(lang);
    }
}
