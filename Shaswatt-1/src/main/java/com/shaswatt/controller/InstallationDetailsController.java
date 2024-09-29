package com.shaswatt.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import com.shaswatt.Service.InstallationDetailsService;
import com.shaswatt.entity.Customer;
import com.shaswatt.entity.InstallationDetails;

@RestController
@CrossOrigin
public class InstallationDetailsController {
	
	@Autowired
    private InstallationDetailsService installationDetailsService;
	
	@Autowired
    private JavaMailSender javaMailSender;
    
	@GetMapping("/{vendorId}/installation-count")
    public ResponseEntity<Long> getInstallationCountByVendorIdRecieved(@PathVariable Long vendorId) {
        Long installationCount = installationDetailsService.getCountOfInstallationsByVendorIdAndConfirmationStatusFalse(vendorId, false);       
        return ResponseEntity.ok(installationCount);
    }

	@GetMapping("/{vendorId}/installation-count/accepted")
    public ResponseEntity<Long> getAcceptedInstallationCountByVendorId(@PathVariable Long vendorId) {
        Long acceptedInstallationCount = installationDetailsService.getCountOfAcceptedInstallationsByVendorIdAndStatus(vendorId, true, false);       
        return ResponseEntity.ok(acceptedInstallationCount);
    }
	 
	@GetMapping("/installation-count/all")
	public ResponseEntity<Long> getAllInstallationsCount() {
	    Long allInstallationsCount = installationDetailsService.getCountOfAllInstallations();
	    return ResponseEntity.ok(allInstallationsCount);
	}

	 
	@GetMapping("/{vendorId}/installation-count/completed")
    public ResponseEntity<Long> getCompletedInstallationCountByVendorId(@PathVariable Long vendorId) {
        Long acceptedInstallationCount = installationDetailsService.getCountOfCompletedInstallationsByVendorId(vendorId);	        
        return ResponseEntity.ok(acceptedInstallationCount);
    }
	 
	@GetMapping("/{vendorId}/installations")
    public ResponseEntity<List<InstallationDetails>> getInstallationsByVendorId(@PathVariable Long vendorId) {
        List<InstallationDetails> installations = installationDetailsService.getInstallationsWithCustomerByVendorId(vendorId);
        
        if (installations.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        
        return ResponseEntity.ok(installations);
    }
	
	@GetMapping("/{vendorId}/installations/received")
    public List<InstallationDetails> getReceivedInstallationsByVendorId(@PathVariable Long vendorId) {
        return installationDetailsService.getRecievedInstallationsWithCustomerByVendorIdAndConfirmationStatus(vendorId, false);
    }
		
	@GetMapping("/{vendorId}/installations/accepted")
    public List<InstallationDetails> getAcceptedInstallationsByVendorId(@PathVariable Long vendorId) {
        return installationDetailsService.getAcceptedInstallationsWithCustomerByVendorIdAndStatus(vendorId, true, false);
    }
	
	@GetMapping("/{vendorId}/installations/completed")
    public List<InstallationDetails> getCompletedInstallationsByVendorId(@PathVariable Long vendorId) {
        return installationDetailsService.getCompletedInstallationsWithCustomerByVendorId(vendorId, true);
    }

	@GetMapping("/installations")
    public List<InstallationDetails> getAllInstallationDetails() {
        return installationDetailsService.getAllInstallationDetails();
    }
	
	@GetMapping("/installation/by-customer-email/{email}")
    public ResponseEntity<InstallationDetails> getInstallationDetailsByCustomerEmail(@PathVariable String email) {
        InstallationDetails installationDetails = installationDetailsService.getInstallationDetailsByCustomerEmail(email);
        if (installationDetails != null) {
            return ResponseEntity.ok(installationDetails);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	
	@GetMapping("/installations/{id}")
    public ResponseEntity<InstallationDetails> getInstallationDetailsById(@PathVariable Long id) {
        InstallationDetails installationDetails = installationDetailsService.findById(id);
        
        if (installationDetails != null) {
            return ResponseEntity.ok(installationDetails);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	 
	@PatchMapping("/installation/{id}/confirm")
    public ResponseEntity<String> confirmInstallation(@PathVariable Long id) {
        boolean updated = installationDetailsService.updateConfirmationStatus(id);
        
        if (updated) {
            return ResponseEntity.ok("Confirmation status updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	 
	@PatchMapping("/installation/{id}/decline")
	public ResponseEntity<String> declineInstallation(@PathVariable Long id) {
			InstallationDetails installationDetails = installationDetailsService.getInstallationDetails(id);	
	     if (installationDetails!=null) {
	    	 Customer customer = installationDetails.getCustomer();
	         String recipientEmail = customer.getEmail();
	         SimpleMailMessage message = new SimpleMailMessage();
	         message.setTo(recipientEmail);
	         message.setSubject("Installation Request Declined by Vendor");
	         String emailBody = "Dear Customer,\n\n"
	                 + "We regret to inform you that your installation request has been declined\n"
	                 + "You can login and apply for another installation through our portal.\n\n"
	                 + "Best regards,\n"
	                 + "Shashwatt Solar";
	         message.setText(emailBody);
	         javaMailSender.send(message);
	         
	         // Delete installation information
	         boolean deleted = installationDetailsService.deleteInstallation(id);
	         
	         if (deleted) {
	             return ResponseEntity.ok("Request declined and installation information deleted successfully");
	         } else {
	             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete installation information");
	         }
	     } else {
	         return ResponseEntity.notFound().build();
	     }
	 }
	 
	@PatchMapping("installation/{id}/complete")
    public ResponseEntity<String> markInstallationAsComplete(@PathVariable Long id) {
        boolean updated = installationDetailsService.updateCompletionStatus(id);
        
        if (updated) {
            return ResponseEntity.ok("Completion status updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
