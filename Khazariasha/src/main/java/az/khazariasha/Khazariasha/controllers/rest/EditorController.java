package az.khazariasha.Khazariasha.controllers.rest;

import az.khazariasha.Khazariasha.models.*;
import az.khazariasha.Khazariasha.models.db.*;
import az.khazariasha.Khazariasha.repository.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api/v1/add")
@RequiredArgsConstructor
public class EditorController {

    //REPOSITORIES
    private final HeroRepository heroRepository;
    private final AboutShortRepository aboutShortRepository;
    private final PartnersRepository partnersRepository;
    private final CertificatesRepository certificatesRepository;
    private final AboutRepository aboutRepository;
    private final EmployeeRepository employeeRepository;
    private final GalleryRepository galleryRepository;

    @Value("${spring.file_dir}")
    private String fileDir;

    @PostMapping(value = "/hero", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void addHeroSection(
            @Valid @ModelAttribute HeroModel heroModel
        ){

        System.out.println("heroModel = " + heroModel);
        try{

            List<String> savedFiles = saveFiles(heroModel.getFiles());

            Hero hero = new Hero(heroModel.getSubtitle(),
                    heroModel.getDetails(), savedFiles.toString(), heroModel.getLang().toUpperCase());
            Hero existingHero = heroRepository.findByLang(heroModel.getLang().toUpperCase());

            if (existingHero != null){

                existingHero.setDetails(heroModel.getDetails());
                existingHero.setLang(heroModel.getLang().toUpperCase());
                existingHero.setImages(savedFiles.toString());
                existingHero.setSubtext(heroModel.getSubtitle());

                heroRepository.save(existingHero);

            }else{
                heroRepository.save(hero);
            }

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping(value = "/partners", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void addHeroSection(
            @Valid @ModelAttribute PartnersModel partnersModel
    ){
        try {
            List<String> savedFiles = saveFiles(partnersModel.getImages());
            List<Partners> newPartners = new ArrayList<>();

            Set<String> existingImages = new HashSet<>();
            partnersRepository.findAll().forEach(p -> existingImages.add(p.getImages()));

            for (String savedFile : savedFiles) {
                if (!existingImages.contains(savedFile)) {
                    newPartners.add(new Partners(savedFile));
                }
            }

            if (!newPartners.isEmpty()) {
                partnersRepository.saveAll(newPartners);
            }

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


    @PostMapping(value = "/certificates", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void addHeroSection(
            @Valid @ModelAttribute CertificatesModel partnersModel
    ){

        System.out.println("certs = " + partnersModel);
        try{

            List<String> savedFiles = saveFiles(partnersModel.getImages());
            List<Certificates> newPartners = new ArrayList<>();
            Iterable<Certificates> existingPartners = certificatesRepository.findAll();

            if (existingPartners.iterator().hasNext()){


                savedFiles.forEach(savedFile -> newPartners.add(new Certificates(savedFile)));
                existingPartners.forEach(newPartners::add);

                certificatesRepository.saveAll(newPartners);

            }else{
                savedFiles.forEach(savedFile -> newPartners.add(new Certificates(savedFile)));
                certificatesRepository.saveAll(newPartners);
            }

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }



    @PostMapping(value = "/aboutUsShort", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void addAboutUsShortSection(
            @Valid @ModelAttribute AboutUsShortModel aboutUsShortModel
    ){

        System.out.println("aboutUsShort = " + aboutUsShortModel);

        AboutShort aboutUsShort = new AboutShort(aboutUsShortModel.getSubtext(), aboutUsShortModel.getDescription(),
                aboutUsShortModel.getServices(),  aboutUsShortModel.getLang().toUpperCase());
        AboutShort existingAboutSHort = aboutShortRepository.findByLang(aboutUsShort.getLang().toUpperCase());

        if (existingAboutSHort != null){

            existingAboutSHort.setLang(aboutUsShortModel.getLang());
            existingAboutSHort.setSubtext(aboutUsShortModel.getSubtext());
            existingAboutSHort.setServices(aboutUsShortModel.getServices());
            existingAboutSHort.setDescription(aboutUsShortModel.getDescription());

            aboutShortRepository.save(existingAboutSHort);

        }else{
            aboutShortRepository.save(aboutUsShort);
        }

    }



  private List<String> saveFiles(MultipartFile[] files) throws IOException {
        List<String> fileNames = new ArrayList<>();

      for (MultipartFile file : files) {
          if (file != null && !file.isEmpty()
                  && file.getResource().isReadable()
                  && file.getOriginalFilename() != null){

              String originalName = file.getOriginalFilename();
              if (originalName == null || !originalName.contains(".")) {
                  throw new RuntimeException("Invalid filename: " + originalName);
              }

              String extension = originalName.substring(originalName.lastIndexOf(".") + 1);
              String newFileName = UUID.randomUUID() + "." + extension;

              file.transferTo(new File(fileDir + File.separator + newFileName));
              fileNames.add(newFileName);

          }
      }

      return fileNames;
    }


    private String saveFile(MultipartFile file) throws IOException {
        String fileName = "";

            if (file != null && !file.isEmpty()
                    && file.getResource().isReadable()
                    && file.getOriginalFilename() != null){

                var originalName = file.getOriginalFilename();
                if (originalName == null || !originalName.contains(".")) {
                    throw new RuntimeException("Invalid filename: " + originalName);
                }

                String extension = originalName.substring(originalName.lastIndexOf(".") + 1);
                String newFileName = UUID.randomUUID() + "." + extension;

                file.transferTo(new File(fileDir + File.separator + newFileName));
                fileName = newFileName;
            }


        return fileName;
    }


    //ABOUT US PAGE
    @PostMapping(value = "/aboutUs", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void addAboutUsShortSection(@Valid @ModelAttribute AboutModel aboutModel) {
        System.out.println("aboutUs = " + aboutModel);

        About about = new About(
            aboutModel.getHeading(), aboutModel.getAbilities(), aboutModel.getLang().toUpperCase()
        );

        About existing = aboutRepository.findByLang(aboutModel.getLang().toUpperCase());

        if (existing != null) {
            existing.setAbilities(aboutModel.getAbilities());
            existing.setHeading(aboutModel.getHeading());
            existing.setLang(aboutModel.getLang());
            aboutRepository.save(existing);
        } else {
            aboutRepository.save(about);
        }
    }

    @PostMapping(value = "/addEmployee", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void addEmployee(@Valid @ModelAttribute EmployeeModel employeeModel) {
        try {
            System.out.println("employeeModel = " + employeeModel);

            String savedImage = saveFile(employeeModel.getImage());
            System.out.println("savedImage = " + savedImage);

            Employee employee = new Employee(
                    savedImage, employeeModel.getName(), employeeModel.getPosition()
            );

            Employee existing = employeeRepository.findByName(employee.getName());

            if (existing != null) {

                existing.setName(employeeModel.getName());
                existing.setImage(savedImage);
                existing.setPosition(employeeModel.getPosition());
                employeeRepository.save(existing);

            } else {

                employeeRepository.save(employee);

            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/delUser/{user}")
    public void deleteUser(@PathVariable("user") String user) {

        try {
            employeeRepository.deleteByName(user);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }

    }

    @PostMapping(value = "/gallery", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void addGallery(@Valid @ModelAttribute GalleryModel galleryModel) {
        try {
            System.out.println("galleryModel = " + galleryModel);

            String savedImage = saveFile(galleryModel.getImage());
            System.out.println("savedImage = " + savedImage);

            Gallery gallery = new Gallery(
                savedImage, galleryModel.getName()
            );

            galleryRepository.save(gallery);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


}
