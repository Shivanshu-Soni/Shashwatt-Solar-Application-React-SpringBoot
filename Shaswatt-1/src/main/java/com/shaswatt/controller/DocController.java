package com.shaswatt.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import com.shaswatt.Service.CustomerService;
import com.shaswatt.Service.DocStorageService;
import com.shaswatt.entity.Customer;
import com.shaswatt.entity.Doc;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Controller
@CrossOrigin
public class DocController {

	@Autowired 
	private DocStorageService docStorageService;
	
	@Autowired
    private JavaMailSender javaMailSender;

	@Autowired
	private CustomerService customerService;

	@GetMapping("/")
	public String get(Model model) {
		List<Doc> docs = docStorageService.getFiles();
		model.addAttribute("docs", docs);
		return "doc";
	}
	
	@GetMapping("/downloadFile/{fileId}")
	public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable Integer fileId){
		Doc doc = docStorageService.getFile(fileId).get();
		return ResponseEntity.ok()
				.contentType(MediaType.parseMediaType(doc.getDocType()))
				.header(HttpHeaders.CONTENT_DISPOSITION,"attachment:filename=\""+doc.getDocName()+"\"")
				.body(new ByteArrayResource(doc.getData()));
	}
	
	@GetMapping("/downloadFileByCustomerId/{customerId}")
	public ResponseEntity<ByteArrayResource> downloadFileByCustomerId(@PathVariable Integer customerId){
			Doc doc = docStorageService.getFileByCustomerId(customerId).get();
			return ResponseEntity.ok()
					.contentType(MediaType.parseMediaType(doc.getDocType()))
					.header(HttpHeaders.CONTENT_DISPOSITION,"attachment:filename=\""+doc.getDocName()+"\"")
					.body(new ByteArrayResource(doc.getData()));
	}
	
	@GetMapping("/downloadAndSendEmail/{customerId}")
	public ResponseEntity<String> downloadAndSendEmail(@PathVariable Integer customerId) {
	    try {
	        Doc doc = docStorageService.getFileByCustomerId(customerId).orElse(null);

	        if (doc == null) {
	            return ResponseEntity.notFound().build();
	        }
	        // Retrieve customer's email address based on customerId
	        String customerEmail =customerService.getCustomerEmailById(customerId); // Replace with your actual method to fetch customer email

	        // Attach the file to an email
	        MimeMessage message = javaMailSender.createMimeMessage();
	        MimeMessageHelper helper = new MimeMessageHelper(message, true);
	        helper.setTo(customerEmail); // Set the customer's email address
	        helper.setSubject("File Attachment");
	        helper.setText("Please find the attached file.");

	        ByteArrayResource byteArrayResource = new ByteArrayResource(doc.getData());

	        String renamedFileName = "Receipt.pdf";
	        helper.addAttachment(renamedFileName, byteArrayResource, doc.getDocType());

	        // Send the email
	        javaMailSender.send(message);

	        return ResponseEntity.ok("Email sent successfully!");
	    } catch (MessagingException e) {
	        e.printStackTrace(); 
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	            .body("An error occurred while sending the email.");
	    }
	}

	@PostMapping("/uploadAndSendEmail/{recipientEmail}")
	public ResponseEntity<String> uploadAndSendEmail(
	    @RequestParam("files") MultipartFile[] files,
	    @PathVariable String recipientEmail
	) {
	    try {
	        // Find the customer based on the provided email
	        Customer customer = customerService.findByEmail(recipientEmail);

	        if (customer == null) {
	            return ResponseEntity.notFound().build();
	        }

	        List<Doc> uploadedDocs = new ArrayList<>();

	        // Save uploaded files and collect relevant information
	        for (MultipartFile file : files) {
	            Doc uploadedDoc = docStorageService.saveFile(file,customer);

	            uploadedDocs.add(uploadedDoc);
	        }
	        
	        MimeMessage message = javaMailSender.createMimeMessage();
	        MimeMessageHelper helper = new MimeMessageHelper(message, true);
	        helper.setTo(customer.getEmail()); // Set the recipient's email address from customer
	        helper.setSubject("File Attachments");
	        helper.setText("Please find the attached files.");

	        for (Doc uploadedDoc : uploadedDocs) {
	            ByteArrayResource byteArrayResource = new ByteArrayResource(uploadedDoc.getData());
	            String renamedFileName = "Attachment_" + uploadedDoc.getDocName();
	            helper.addAttachment(renamedFileName, byteArrayResource, uploadedDoc.getDocType());
	        }
	        // Send the email
	        javaMailSender.send(message);

	        return ResponseEntity.ok("Email sent successfully!");
	    } catch (MessagingException e) {
	        e.printStackTrace(); 
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	            .body("An error occurred while sending the email.");
	    }
	}	
}
