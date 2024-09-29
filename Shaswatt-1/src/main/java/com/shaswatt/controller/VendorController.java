package com.shaswatt.controller;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.shaswatt.Service.VendorService;
import com.shaswatt.entity.Vendor;

@RestController
@CrossOrigin
public class VendorController {

	@Autowired
    private VendorService vendorService;
    
    @Autowired
    private JavaMailSender javaMailSender;
    
    @PostMapping("/vendors")
    public ResponseEntity<?> addVendor(@RequestBody Vendor vendor) {
        // Check if vendor with the provided email already exists
        if (vendorService.doesVendorExistByEmail(vendor.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Vendor with this email already exists.");
        }

        // If the email is unique, add the vendor
        Vendor addedVendor = vendorService.addVendor(vendor);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedVendor);
    }
  
    @GetMapping("/vendors-list")
    public List<Vendor> getAllVendors() {
        return vendorService.getAllVendors();
    }
    
    @GetMapping("/vendors-list-authentic")
    public List<Vendor> getAllAuthenticVendors() {
        return vendorService.getAllAuthenticVendors();
    }
    
    @GetMapping("/vendors-listByCity")
    public List<Vendor> getVendorsByCity(@RequestParam String city) {
        return vendorService.getVendorsByCity(city);
    }
    @GetMapping("/vendors-listByPostalCode")
    public List<Vendor> getVendorsByPostalCode(@RequestParam String postalCode) {
        return vendorService.getVendorsByPostalCode(postalCode);
    }
      
    @PostMapping("/vendor-login")
    public ResponseEntity<Boolean> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        Vendor vendor = vendorService.getVendor(email);

        if (vendor != null && vendor.getPassword().equals(password)) {
            boolean isAuthenticated = vendor.isAuthenticated();
            return ResponseEntity.ok(isAuthenticated);
        } else {
            return ResponseEntity.ok(false);
        }
    }

    @GetMapping("/vendors-authenticated-listByPostalCode")
	public List<Vendor> getAuthenticatedVendorsByPostalCode(@RequestParam String postalCode) {
        return vendorService.getVendorsByPostalCodeAuthenticated(postalCode);
	}
    
    @GetMapping("/unauthenticated")
    public List<Vendor> getUnauthenticatedVendors() {
        return vendorService.getUnauthenticatedVendors();
    }
    
    @GetMapping("/unauthenticated/count")
    public long getUnauthenticatedVendorCount() {
        return vendorService.getUnauthenticatedVendorCount();
    }
    
    @PutMapping("/{vendorId}/authenticate")
    public Vendor authenticateVendor(@PathVariable Long vendorId) {
        Vendor authenticatedVendor = vendorService.markVendorAsAuthenticated(vendorId);

        // Send email to the vendor
        sendAuthenticationEmail(authenticatedVendor.getEmail());

        return authenticatedVendor;
    }
    
    @GetMapping("/vendor/{id}")
    public ResponseEntity<Vendor> getVendorById(@PathVariable Long id) {
        Vendor vendor = vendorService.getVendorById(id);
        return ResponseEntity.ok(vendor);
    }
    
    private void sendAuthenticationEmail(String recipientEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("Congratulations, Your Authentication is Successful");
        String emailBody = "Dear Vendor,\n\n"
                + "Your authentication is successful.\n"
                + "You can now offer your services on our portal.\n\n"
                + "Best regards,\n"
                + "Shashwatt Solar";
        message.setText(emailBody);
        javaMailSender.send(message);
    }
    
    @PutMapping("/{vendorId}/unauthenticate")
    public void  unauthenticateVendor(@PathVariable Long vendorId) {
    	Vendor vendor = vendorService.getVendorById(vendorId);

        if (vendor != null) {
            String vendorEmail = vendor.getEmail();

            // Send unauthentication email
            sendUnauthenticationEmail(vendorEmail);

            // Delete the vendor
            vendorService.deleteVendor(vendorId);
        }
    }
    
    private void sendUnauthenticationEmail(String recipientEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("Application Rejected");
        message.setText("Dear Vendor,\n\n"
                + "We regret to inform you that your registration application has been rejected.\n"
                + "Thank you for your interest in our platform.\n\n"
                + "Best regards,\n"
                + "Shashwatt Solar");

        javaMailSender.send(message);
    }
    
    @GetMapping("/vendor/count")
    public long getVendorCount() {
        return vendorService.getVendorCount();
    }
    
    @GetMapping("/vendor/count/authenticated")
    public long getAuthenticVendorCount() {
        return vendorService.getAuthenticVendorCount();
    }
    
    @GetMapping("/vendor/id")
    public ResponseEntity<Long> getVendorIdByEmail(@RequestParam String email) {
        Long vendorId = vendorService.getVendorIdByEmail(email);

        if (vendorId == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(vendorId);
    }
   
}