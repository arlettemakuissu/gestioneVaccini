package com.example.demo.userService;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.userEntity.BambinoEntity;
import com.example.demo.userEntity.UserEntity;
import com.example.demo.userEntity.VacciniEntity;
import com.example.demo.userRepository.BambinoRepository;
import com.example.demo.userRepository.UserRepository;
import com.example.demo.userRepository.VacciniRepository;

import Dto.BambiniDto;
import Dto.VacciniDto;
import jakarta.persistence.EntityNotFoundException;

@Service
public class BambinoService {
	
	@Autowired
	private BambinoRepository  bambinoRepository;
	@Autowired
	private UserRepository users;
	
	@Autowired
	private VacciniRepository vacciniRepository ;
	
	
	public BambiniDto saveBambino(BambiniDto bambino,Long id) {
		Optional<UserEntity> optionalUser = users.findById(id);

		UserEntity newUser = optionalUser.orElseThrow(() -> 
		    new RuntimeException("Utente non trovato con ID: " + id)
		);

		BambinoEntity user = new BambinoEntity();

		
		user.setUser(newUser);
		user.setNome(bambino.getNome());
		user.setDataNascita(bambino.getDataNascita());

		LocalDate dataNascita = bambino.getDataNascita();
		LocalDate currentDate = LocalDate.now();

		
		int etaInMesi = Period.between(dataNascita, currentDate).getYears() * 12 + 
		                Period.between(dataNascita, currentDate).getMonths();
		user.setEta(etaInMesi);

		BambinoEntity savedUser = bambinoRepository.save(user);

		
		BambiniDto bambinoDto = new BambiniDto();
		bambinoDto.setNome(savedUser.getNome());
		bambinoDto.setDataNascita(savedUser.getDataNascita());
		bambinoDto.setEta(savedUser.getEta()); 

		return bambinoDto;
	    
	    
		}
	
	public List<BambiniDto> getAllBambini(){
		
		 List<BambinoEntity> bambini = bambinoRepository.findAll();
		 
		 List<BambiniDto> bambiniDto = new ArrayList<BambiniDto>();
		 
		 
		 
		 for(BambinoEntity bambino: bambini) {
			 
		    bambiniDto.add(new BambiniDto(bambino.getId(),bambino.getNome(),bambino.getDataNascita() ,bambino.getEta()));
		 }
		
		
		return bambiniDto;
		
	}
	
	
	public BambinoEntity updateBambino(Long id, BambiniDto bambinoDto) {
    	BambinoEntity existingBambino =bambinoRepository.findById(id)
    	        .orElseThrow(() -> new EntityNotFoundException("bambino non trovato con id: " + id));
    	LocalDate dataNascita = bambinoDto.getDataNascita();
		LocalDate currentDate = LocalDate.now();
    	   
    	existingBambino.setNome(bambinoDto.getNome());
    	existingBambino.setDataNascita(bambinoDto.getDataNascita());
    	int etaInMesi = Period.between(dataNascita, currentDate).getYears() * 12 + 
                Period.between(dataNascita, currentDate).getMonths();
    	existingBambino.setEta(etaInMesi);
   
 
    	   
    	   
        return bambinoRepository.save(existingBambino);
    }
	
      public void  deleteBambinoById( Long id) {
		
    	Optional<BambinoEntity> vaccino = bambinoRepository.findById(id);
        if (vaccino.isPresent()) {
        	bambinoRepository.deleteById(id);
        } else {
            throw new RuntimeException("Bambino con ID " + id + " non trovato");
        }
    }	

}
