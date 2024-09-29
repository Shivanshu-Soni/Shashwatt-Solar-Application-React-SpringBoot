package com.shaswatt.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.shaswatt.Service.QueryService;
import com.shaswatt.entity.Query;

@RestController
@CrossOrigin
public class QueryController {

	@Autowired 
	private QueryService queryService;
	
	@Autowired
    private JavaMailSender javaMailSender;
	
	@PostMapping("/query/add")
    public ResponseEntity<Query> addNewQuery(@RequestBody Query query) {
        Query addedQuery = queryService.addQuery(query);
        return ResponseEntity.ok(addedQuery);
    }
		
	@GetMapping("/query/list/null")
    public ResponseEntity<List<Query>> getQueriesWithNullReply() {
        List<Query> queries = queryService.getQueriesWithNullReply();
        return ResponseEntity.ok(queries);
    }
	
	@GetMapping("/query/list/notnull")
    public ResponseEntity<List<Query>> getQueriesWithNonNullReply() {
        List<Query> queries = queryService.getQueriesWithNonNullReply();
        return ResponseEntity.ok(queries);
    }

    @GetMapping("/query/count/null")
    public ResponseEntity<Long> getQueryCount() {
        Long queryCount = queryService.getQueryCountWithNullReply();
        return ResponseEntity.ok(queryCount);
    }
    
    @GetMapping("/query/count/notnull")
    public ResponseEntity<Long> getQueryCountWithNonNullReply() {
        Long queryCount = queryService.getQueryCountWithNonNullReply();
        return ResponseEntity.ok(queryCount);
    }
    
    @GetMapping("/query/{id}")
    public ResponseEntity<Query> getQueryById(@PathVariable Long id) {
        Query query = queryService.getQueryById(id);
        if (query != null) {
            return ResponseEntity.ok(query);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/query/reply")
    public ResponseEntity<String> addQuery(@RequestBody Query queryForm) {
    	Query existingQuery = queryService.getQueryById(queryForm.getId());

        // Update the query with the reply
        existingQuery.setQueryReply(queryForm.getQueryReply());

        // Save the updated query in the database
        Query updatedQuery = queryService.updateQueryWithReply(existingQuery);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(queryForm.getEmail());
        message.setSubject("Your Query Reply");
        message.setText(queryForm.getQueryReply());

        javaMailSender.send(message);

        return ResponseEntity.ok("Query submitted successfully");
    }
}
