package com.shaswatt.Service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.shaswatt.entity.Vendor;
import com.shaswatt.repository.VendorRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class VendorService {

	@Autowired
    private VendorRepository vendorRepository;

    public Vendor addVendor(Vendor vendor) {
        return vendorRepository.save(vendor);
    }

	public List<Vendor> getAllVendors() {
        return vendorRepository.findAll();
    }

	public List<Vendor> getVendorsByCity(String city) {
		return vendorRepository.findByCity(city);
	}

	public Vendor getVendor(String email) {
		return vendorRepository.findByEmail(email);
	}

	public List<Vendor> getVendorsByPostalCode(String postalCode) {
		return vendorRepository.findByPostalCode(postalCode);
	}
	
	public List<Vendor> getUnauthenticatedVendors() {
        return vendorRepository.findByIsAuthenticated(false);
    }
	
	public long getUnauthenticatedVendorCount() {
        return vendorRepository.countByIsAuthenticated(false);
    }
	
	public Vendor markVendorAsAuthenticated(Long vendorId) {
        Vendor vendor = vendorRepository.findByIdAndIsAuthenticated(vendorId, false);
        
        if (vendor != null) {
            vendor.setAuthenticated(true);
            vendorRepository.save(vendor);
        }      
        return vendor;
    }
		
	public Vendor getVendorById(Long id) {
        return vendorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Vendor not found"));
    }
	 
	public long getVendorCount() {
        return vendorRepository.count();
    }
	 
	public Long getVendorIdByEmail(String email) {
        Vendor vendor = vendorRepository.findByEmail(email);
        return (vendor != null) ? vendor.getId() : null;
    }

	public void deleteVendor(Long vendorId) {
		Vendor vendor = vendorRepository.findById(vendorId).orElse(null);

        if (vendor != null) {
            vendorRepository.delete(vendor);
        } else {
            throw new EntityNotFoundException("Vendor not found");
        }
	}

	public List<Vendor> getVendorsByPostalCodeAuthenticated(String postalCode) {
		List<Vendor> vendorsByPostalCode = vendorRepository.findByPostalCode(postalCode);
	    List<Vendor> authenticatedVendors = new ArrayList<>();

	    for (Vendor vendor : vendorsByPostalCode) {
	        if (vendor.isAuthenticated() == true) {
	            authenticatedVendors.add(vendor);
	        }
	    }
		return authenticatedVendors;
	}

	public long getAuthenticVendorCount() {
	    return vendorRepository.countByIsAuthenticated(true);
	}

	public List<Vendor> getAllAuthenticVendors() {
		 List<Vendor> allVendors = vendorRepository.findAll();
		    List<Vendor> authenticatedVendors = new ArrayList<>();

		    for (Vendor vendor : allVendors) {
		        if (vendor.isAuthenticated()) {
		            authenticatedVendors.add(vendor);
		        }
		    }
		    return authenticatedVendors;
	}
	
	public boolean doesVendorExistByEmail(String email) {
	    return vendorRepository.existsByEmail(email);
	}

}