package com.shaswatt.Service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.shaswatt.entity.Customer;
import com.shaswatt.entity.InstallationDetails;
import com.shaswatt.repository.CustomerRepository;
import com.shaswatt.repository.InstallationDetailsRepository;
import jakarta.transaction.Transactional;

@Service
public class InstallationDetailsService {

	@Autowired
	InstallationDetailsRepository installationDetailsRepository;
	
	@Autowired
    private  CustomerRepository customerRepository;
	
	public Long getCountOfInstallationsByVendorId(Long vendorId) {
        return installationDetailsRepository.countInstallationsByVendorId(vendorId);
    }
	
	public List<InstallationDetails> getInstallationsByVendorId(Long vendorId) {
	        return installationDetailsRepository.findByVendorId(vendorId);
	    }
	 
	public List<InstallationDetails> getAllInstallationDetails() {
	        return installationDetailsRepository.findAll();
	    }
	 
	public List<InstallationDetails> getInstallationsWithCustomerByVendorId(Long vendorId) {
        List<InstallationDetails> installations = installationDetailsRepository.findByVendorId(vendorId);

        for (InstallationDetails installation : installations) {
            Customer customer = installation.getCustomer();
            if (customer != null) {
            	
                Long customerId = customer.getId();
                Customer fetchedCustomer = customerRepository.findById(customerId).orElse(null);
                installation.setCustomer(fetchedCustomer);
            }
        }
        return installations;
    }
	 
	public InstallationDetails getInstallationDetailsByCustomerEmail(String email) {
	        return installationDetailsRepository.findByCustomerEmail(email);
	    }
	 
	public InstallationDetails findById(Long id) {
	        return installationDetailsRepository.findById(id).orElse(null);
	    }
	 
	@Transactional
	public boolean updateConfirmationStatus(Long id) {
        InstallationDetails installationDetails = installationDetailsRepository.findById(id).orElse(null);
        
        if (installationDetails != null) {
            installationDetails.setConfirmationStatus(true);
            installationDetailsRepository.save(installationDetails);
            return true;
        }       
        return false;
    }
	 
	public Long getCountOfInstallationsByVendorIdAndConfirmationStatusFalse(Long vendorId, boolean confirmationStatus) {
	        return installationDetailsRepository.countByVendorIdAndConfirmationStatusFalse(vendorId, confirmationStatus);
	    }
	public Long getCountOfInstallationsByVendorIdAndConfirmationStatusTrue(Long vendorId, boolean confirmationStatus) {
	        return installationDetailsRepository.countByVendorIdAndConfirmationStatusTrue(vendorId, confirmationStatus);
	    }
	public List<InstallationDetails> getRecievedInstallationsWithCustomerByVendorIdAndConfirmationStatus(Long vendorId, boolean confirmationStatus) {
	        return installationDetailsRepository.findByVendorIdAndConfirmationStatus(vendorId, confirmationStatus);
	    }
	 
	public Long getCountOfAllInstallations() {        
        return installationDetailsRepository.countTotalInstallations();
    }
	 
	@Transactional
	public boolean updateCompletionStatus(Long id) {
        InstallationDetails installationDetails = installationDetailsRepository.findById(id).orElse(null);
        
        if (installationDetails != null) {
            installationDetails.setCompletionStatus(true);
            installationDetailsRepository.save(installationDetails);
            return true;
        }   
        return false;
    }
	 
	public Long getCountOfCompletedInstallationsByVendorId(Long vendorId) {
        return installationDetailsRepository.countByVendorIdAndCompletionStatus(vendorId, true);
    }
	 
	public Long getCountOfAcceptedInstallationsByVendorIdAndStatus(Long vendorId, boolean confirmationStatus, boolean completionStatus) {
        return installationDetailsRepository.countByVendorIdAndConfirmationStatusAndCompletionStatus(vendorId, confirmationStatus, completionStatus);
    }
	 
	public List<InstallationDetails> getAcceptedInstallationsWithCustomerByVendorIdAndStatus(Long vendorId, boolean confirmationStatus, boolean completionStatus) {
        return installationDetailsRepository.findByVendorIdAndConfirmationStatusAndCompletionStatus(vendorId, confirmationStatus, completionStatus);
    }
	 
	public List<InstallationDetails> getCompletedInstallationsWithCustomerByVendorId(Long vendorId, boolean completionStatus) {
        return installationDetailsRepository.findByVendorIdAndCompletionStatus(vendorId, completionStatus);
    }
	
	public Long getInstallationIdByCustomerId(Long customerId) {
        InstallationDetails installationDetails = installationDetailsRepository.findByCustomerId(customerId);
        if (installationDetails != null) {
            return installationDetails.getId();
        }
        return null;
    }
	 
	public InstallationDetails getInstallationDetails(Long id) {
        return installationDetailsRepository.findById(id).orElse(null);
    }
	 
	public boolean deleteInstallation(Long id) {
        if (installationDetailsRepository.existsById(id)) {
            installationDetailsRepository.deleteById(id);
            return true;
        }
        return false;
    }
		 
}
