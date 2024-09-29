package com.shaswatt.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendEmailWithAttachment(String recipientEmail, String orderConfirmationMessage, byte[] pdfBytes, String pdfFileName) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(recipientEmail);
            helper.setSubject("Order Confirmation");
            helper.setText(orderConfirmationMessage, false);

            // Attach the PDF to the email
            helper.addAttachment(pdfFileName, new ByteArrayResource(pdfBytes));

            javaMailSender.send(message);
        } catch (MessagingException e) {
            Logger.getLogger(EmailService.class.getName()).log(Level.SEVERE, "Error sending email", e);
        }
    }
}

