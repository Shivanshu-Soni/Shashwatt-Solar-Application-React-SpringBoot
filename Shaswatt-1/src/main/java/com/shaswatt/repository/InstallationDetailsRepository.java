package com.shaswatt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.shaswatt.entity.InstallationDetails;

public interface InstallationDetailsRepository extends JpaRepository<InstallationDetails, Long>{

	 @Query("SELECT COUNT(i) FROM InstallationDetails i WHERE i.vendor.id = :vendorId")
	 Long countInstallationsByVendorId(@Param("vendorId") Long vendorId);
	 
	 List<InstallationDetails> findByVendorId(Long vendorId);
	
	 @Query("SELECT i FROM InstallationDetails i JOIN FETCH i.customer c WHERE i.vendor.id = :vendorId")
	 List<InstallationDetails> findInstallationsWithCustomerByVendorId(@Param("vendorId") Long vendorId);
	 
	 InstallationDetails findByCustomerEmail(String email);
	    
	 @Query("SELECT COUNT(id) FROM InstallationDetails WHERE vendor.id = :vendorId AND confirmationStatus = :confirmationStatus")
	 Long countByVendorIdAndConfirmationStatusFalse(@Param("vendorId") Long vendorId, @Param("confirmationStatus") boolean confirmationStatus);
	 
	 @Query("SELECT COUNT(id) FROM InstallationDetails WHERE vendor.id = :vendorId AND confirmationStatus = :confirmationStatus")
	 Long countByVendorIdAndConfirmationStatusTrue(@Param("vendorId") Long vendorId, @Param("confirmationStatus") boolean confirmationStatus);
	
	 List<InstallationDetails> findByVendorIdAndConfirmationStatus(Long vendorId, boolean confirmationStatus);
	
	 Long countByVendorIdAndCompletionStatus(Long vendorId, boolean confirmationStatus);

     Long countByVendorIdAndConfirmationStatusAndCompletionStatus(Long vendorId, boolean confirmationStatus, boolean completionStatus);

     List<InstallationDetails> findByVendorIdAndConfirmationStatusAndCompletionStatus(Long vendorId, boolean confirmationStatus, boolean completionStatus);
     
     InstallationDetails findByCustomerId(Long customerId);

     @Query("SELECT COUNT(id) FROM InstallationDetails")
     Long countTotalInstallations();
        
     List<InstallationDetails> findByVendorIdAndCompletionStatus(Long vendorId, boolean completionStatus);

}
