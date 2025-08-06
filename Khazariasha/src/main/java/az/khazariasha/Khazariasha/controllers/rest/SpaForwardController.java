package az.khazariasha.Khazariasha.controllers.rest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaForwardController {

    @RequestMapping("/")
    public String forward() {
        return "forward:/index.html";
    }
}

