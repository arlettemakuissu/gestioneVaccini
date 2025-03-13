package com.example.demo.userService;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.demo.userEntity.BambinoEntity;
import com.example.demo.userEntity.VacciniEntity;
import com.example.demo.userRepository.VacciniRepository;

import Dto.VacciniDto;
import jakarta.persistence.EntityNotFoundException;

@Service
public class VacciniService {
	
	@Autowired
	private VacciniRepository vacciniRepository;
	
	
	
	public VacciniEntity saveVaccino(VacciniDto vacciniDto) {
		
		System.out.println(vacciniDto.getIntervalloCalcolazione());
		VacciniEntity vaccino  = new VacciniEntity();
		
		vaccino.setNome(vacciniDto.getNome());
		vaccino.setDescrizione(vacciniDto.getDescrizione());
		vaccino.setEtaSomministrazione(vacciniDto.getEtaSomministrazione());
		vaccino.setIntervalloCalcolazione(vacciniDto.getIntervalloCalcolazione());
		
		System.out.println(vaccino);
		
		
		
		
		vacciniRepository.save(vaccino);
		return vaccino;
	}
   public List<VacciniEntity> getAllVacini(){
	   
	   
	   List<VacciniEntity> vaccini = vacciniRepository.findAll();
	   
	     return vaccini;
	   
	   
   }
   
   public List<VacciniDto> getAllVaccini() {
       
       List<VacciniEntity> vaccini = vacciniRepository.findAll();

      
       return vaccini.stream().map(vaccino -> {
           VacciniDto dto = new VacciniDto();
           dto.setId(vaccino.getId());
           dto.setNome(vaccino.getNome());
           dto.setDescrizione(vaccino.getDescrizione());
           dto.setEtaSomministrazione(vaccino.getEtaSomministrazione());
           dto.setIntervalloCalcolazione(vaccino.getIntervalloCalcolazione());

         

           return dto;
       }).collect(Collectors.toList());
   }
   
    public void  deleteVaccinoById( Long id) {
		
    	Optional<VacciniEntity> vaccino = vacciniRepository.findById(id);
        if (vaccino.isPresent()) {
            vacciniRepository.deleteById(id);
        } else {
            throw new RuntimeException("Vaccino con ID " + id + " non trovato");
        }
    }
		
		
    public VacciniEntity updateVaccino(Long id, VacciniDto vacciniDto) {
    	VacciniEntity existingVaccino = vacciniRepository.findById(id)
    	        .orElseThrow(() -> new EntityNotFoundException("Vaccino non trovato con id: " + id));

    	   
    	    existingVaccino.setNome(vacciniDto.getNome());
    	    existingVaccino.setDescrizione(vacciniDto.getDescrizione());
    	    existingVaccino.setEtaSomministrazione(vacciniDto.getEtaSomministrazione());
            existingVaccino.setIntervalloCalcolazione(vacciniDto.getIntervalloCalcolazione());

    	   
    	   
        return vacciniRepository.save(existingVaccino);
    }
   
} 
   

