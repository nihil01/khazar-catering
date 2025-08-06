package az.khazariasha.Khazariasha.controllers.rest;

import az.khazariasha.Khazariasha.models.OrderModel;
import io.github.bucket4j.local.LocalBucket;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor

public class OrderController {

    private final MailSender mailSender;
    private final LocalBucket emailLimiter;

    @PostMapping("/order")
    public void createOrder(@RequestBody OrderModel order, HttpServletRequest request, HttpServletResponse response) throws Exception {

        boolean allowed = emailLimiter.tryConsume(10);
        if (!allowed) {
            response.setStatus(429);
            response.getWriter().println("Email limit exceeded");
            return;
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("office@khazariasha.az");
        message.setFrom("site@khazariasha.az");
        message.setSubject("Yeni Sifariş");

        String text = String.format("""         
            Bu IP unvandan %s sifaris sorgusu gonderilib
            Brauzer: %s
            
            Musterin melumatlari:
               
            Ad: %s
            E-poçt: %s
            Telefon nömrəsi: %s
            Şəhər: %s
            Tədbirin növü: %s
            Qonaq sayı: %s
            Mətbəx növü: %s
            Tədbirin tarixi: %s
        
            """,
                request.getRemoteAddr(),
                request.getHeader("User-Agent"),

                order.getName(),
                order.getEmail(),
                order.getPhoneNumber(),
                order.getCity(),
                order.getEventType(),
                order.getPersons(),
                order.getCuisineType(),
                order.getEventDate()
            );

            message.setText(text);
            mailSender.send(message);
    }


}
