package com.shaswatt.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.shaswatt.entity.Customer;
import com.shaswatt.entity.InstallationDetails;
import com.shaswatt.entity.Vendor;
import com.shaswatt.repository.CustomerRepository;
import com.shaswatt.repository.InstallationDetailsRepository;
import com.shaswatt.repository.VendorRepository;

@Service
public class CustomerService {
	@Autowired
    private  CustomerRepository customerRepository;

    @Autowired
    private InstallationDetailsRepository installationDetailsRepository;
    
    @Autowired
    private  VendorRepository vendorRepository;
      
    public Customer addCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

	public List<Customer> getAllCustomers() {
		return customerRepository.findAll();
	}

	public Customer getCustomer(String email) {	
		return customerRepository.findByEmail(email);
	}
	 
	public Customer createOrUpdateInstallationDetailsByEmail(String customerEmail, InstallationDetails request) {
	    Vendor vendor = request.getVendor();
	    if (vendor.getId() == null) {
	    	throw new RuntimeException("Vendor not found"); 
	    } else {
	        vendor = vendorRepository.findById(vendor.getId())
	                .orElseThrow(() -> new RuntimeException("Vendor not found"));
	    }  
	    Customer customer = customerRepository.findByEmail(customerEmail);
	    InstallationDetails installationDetails = customer.getInstallationDetails();

	    if (installationDetails == null) {
	        installationDetails = new InstallationDetails();
	        installationDetails.setCustomer(customer);
	    }

	    installationDetails.setInstallationCapacity(request.getInstallationCapacity());
	    installationDetails.setRequiredRoofArea(request.getRequiredRoofArea());
	    installationDetails.setMonthlyElectricityGenerated(request.getMonthlyElectricityGenerated());
	    installationDetails.setMonthlySavings(request.getMonthlySavings());
	    installationDetails.setBillAmount(request.getBillAmount());
	    installationDetails.setPanelCapacity(request.getPanelCapacity());
	    installationDetails.setCostOfBattery(request.getCostOfBattery());
	    installationDetails.setNewNumberOfPanels(request.getNewNumberOfPanels());
	    installationDetails.setPricePerPanel(request.getPricePerPanel());
	    installationDetails.setPriceOfPanels(request.getPriceOfPanels());
	    installationDetails.setCostOfAcdb(request.getCostOfAcdb());
	    installationDetails.setCostOfDcdb(request.getCostOfDcdb());
	    installationDetails.setCostOfLiaisoning(request.getCostOfLiaisoning());
	    installationDetails.setCostOfStructure(request.getCostOfStructure());
	    installationDetails.setCostOfInstallation(request.getCostOfInstallation());
	    installationDetails.setCostOfMisc(request.getCostOfMisc());
	    installationDetails.setCostWithoutGst(request.getCostWithoutGst());
	    installationDetails.setGstCost(request.getGstCost());
	    installationDetails.setCostWithGst(request.getCostWithGst());
	    installationDetails.setPerWattCost(request.getPerWattCost());
	    installationDetails.setVendor(request.getVendor());
	    installationDetailsRepository.save(installationDetails);

	    return customer;
	}

	public Customer getCustomerById(Long customerId) {
        return customerRepository.findById(customerId).orElse(null);
    }

	public Long getCustomerCount() {
		return customerRepository.count();
	    }
	 
	public List<Customer> getCustomersByVendorId(Long vendorId) {
	    return customerRepository.findByInstallationDetailsVendorId(vendorId);
	}

	public Customer findByEmail(String recipientEmail) {
		return customerRepository.findByEmail(recipientEmail);
	}

	public String getCustomerEmailById(long customerId) {
        Optional<Customer> customerOptional = customerRepository.findById(customerId);
        
        if (customerOptional.isPresent()) {
            Customer customer = customerOptional.get();
            return customer.getEmail();
        } else {
            return null;
        }
    }

	 public boolean doesCustomerExistByEmail(String email) {
        return customerRepository.existsByEmail(email);
    }
	
}
