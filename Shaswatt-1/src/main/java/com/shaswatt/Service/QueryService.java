package com.shaswatt.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.shaswatt.entity.Query;
import com.shaswatt.repository.QueryRepository;

@Service
public class QueryService {

	@Autowired
    private QueryRepository queryRepository;
	
	public Query addQuery(Query query) {
        return queryRepository.save(query);
    }
	
	public List<Query> getAllQueries() {
        return queryRepository.findAll();
    }

    public Long getQueryCount() {
        return queryRepository.count();
    }
    
    public Query getQueryById(Long id) {
        Optional<Query> queryOptional = queryRepository.findById(id);
        return queryOptional.orElse(null);
    }
    
    public Long getQueryCountWithNullReply() {
        return queryRepository.countByQueryReplyIsNull();
    }
    
    public Long getQueryCountWithNonNullReply() {
        return queryRepository.countByQueryReplyIsNotNull();
    }
    public List<Query> getQueriesWithNullReply() {
        return queryRepository.findByQueryReplyIsNull();
    }
    
    public List<Query> getQueriesWithNonNullReply() {
        return queryRepository.findByQueryReplyIsNotNull();
    }
    
    public Query updateQueryWithReply(Query query) {
        return queryRepository.save(query);
    }
}
