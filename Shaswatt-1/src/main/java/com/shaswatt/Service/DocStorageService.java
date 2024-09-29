package com.shaswatt.Service;


import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.shaswatt.entity.Customer;
import com.shaswatt.entity.Doc;
import com.shaswatt.repository.DocRepository;

@Service
public class DocStorageService {
  @Autowired
  private DocRepository docRepository; 
  
  public Doc saveFile(MultipartFile file,Customer customer) {
	  String docname = file.getOriginalFilename();
	  try {
		  Doc doc = new Doc(docname,file.getContentType(),file.getBytes());
		  doc.setCustomer(customer);
		  return docRepository.save(doc);
	  }
	  catch(Exception e) {
		  e.printStackTrace();
	  }
	  return null;
  }

  public Optional<Doc> getFile(Integer fileId) {
	  return docRepository.findById(fileId);
  }
  
  public List<Doc> getFiles(){
	  return docRepository.findAll();
  }
  
  public Optional<Doc> getFileByCustomerId(Integer customerId) {
	  return docRepository.findByCustomerId(customerId);
  }
}
