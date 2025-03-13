package com.example.demo.userService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.userEntity.BambinoEntity;
import com.example.demo.userEntity.VaccinazioneEntity;
import com.example.demo.userEntity.VacciniEntity;
import com.example.demo.userRepository.BambinoRepository;
import com.example.demo.userRepository.VaccinazioneRepository;
import com.example.demo.userRepository.VacciniRepository;

import Dto.VaccinazioneDto;

@Service
public class VaccinazioneService {
	
	
	@Autowired
	private VaccinazioneRepository vaccinazioneRepository;
	
	@Autowired
	private BambinoRepository bambinoRepository;
	
	@Autowired
	private VacciniRepository vacciniRepository;

	public List<VaccinazioneEntity> createStatisticheNuovoBambino(Long bambinoId) {
		
		BambinoEntity bambino = bambinoRepository.findById(bambinoId)
	            .orElseThrow(() -> new RuntimeException("Bambino non trovato"));

	    System.out.println("ID Bambino: " + bambino.getId());

	    List<VacciniEntity> vaccini = vacciniRepository.findAll();

	    for (VacciniEntity vaccino : vaccini) {
	        boolean esisteStatistica = vaccinazioneRepository.existsByBambinoAndVaccini(bambino, vaccino);

	        if (!esisteStatistica) {
	            VaccinazioneEntity vaccinazione = new VaccinazioneEntity();

	          
	            vaccinazione.setBambino(bambino);
	            vaccinazione.setStatoVaccinazione("INCOMPLETO");
	            vaccinazione.setVaccini(vaccino);
	            vaccinazione.setEtaSomministrazione(vaccino.getEtaSomministrazione());

	          
	            String etaSomministrazioneInMesi = vaccino.getEtaSomministrazione();
	            int etaInMesi = Integer.parseInt(etaSomministrazioneInMesi);
	            LocalDate dataSomministrazioneStimata = bambino.getDataNascita().plusMonths(etaInMesi);

	           
	            int intervalloCalcolazione = vaccino.getIntervalloCalcolazione();
	            LocalDate inizioIntervallo = dataSomministrazioneStimata.minusDays(intervalloCalcolazione);
	            LocalDate fineIntervallo = dataSomministrazioneStimata.plusDays(intervalloCalcolazione);

	           
	            vaccinazione.setInizioIntervalloSomministrazione(inizioIntervallo);
	            vaccinazione.setFineIntervalloSomministrazione(fineIntervallo);

	            
	            vaccinazioneRepository.save(vaccinazione);
	        } else {
	            System.out.println("Statistica già esistente per bambino " + bambino.getId() + " e vaccino " + vaccino.getId());
	        }
	    }

	    return vaccinazioneRepository.findByBambino(bambino);
		    
		
	    
	   
	}

	  public List<VaccinazioneDto> statoVaccinazioneById(Long id) {
	    
		  createStatisticheNuovoBambino(id);

		    List<VaccinazioneEntity> vaccinazioni = vaccinazioneRepository.findBybambinoId(id);

		    List<VaccinazioneDto> vaccinazioniDto = new ArrayList<>();
		    for (VaccinazioneEntity vaccinazione : vaccinazioni) {
		        VaccinazioneDto dto = new VaccinazioneDto();

		        dto.setVaccinoId(vaccinazione.getVaccini().getId());
		        dto.setNomeVaccino(vaccinazione.getVaccini().getNome());
		        dto.setBambinoId(vaccinazione.getBambino().getId());
		        dto.setEtaSomministrazione(vaccinazione.getEtaSomministrazione());
		        dto.setStatoSomministrazione(vaccinazione.getStatoVaccinazione());
		        dto.setSetInizioIntervalloSomministrazione(vaccinazione.getInizioIntervalloSomministrazione());
		        dto.setSetFineIntervalloSomministrazione(vaccinazione.getFineIntervalloSomministrazione());

		       
		        String intervallo = "Da " + vaccinazione.getInizioIntervalloSomministrazione() + 
		                            " a " + vaccinazione.getFineIntervalloSomministrazione();
		        dto.setIntervalloSomministrazione(intervallo);

		        System.out.println(dto);
		        vaccinazioniDto.add(dto);
		    }

		    return vaccinazioniDto;
	}	
	public List<VaccinazioneDto> getAllStatoVaccinazioni(){
		
		 List<VaccinazioneEntity> vaccinazioni = vaccinazioneRepository.findAll();
		 
		 List<VaccinazioneDto> vaccinazioneDto = new ArrayList<>();
		 for(VaccinazioneEntity vaccinazione:vaccinazioni) {
			 
			 VaccinazioneDto dto = new VaccinazioneDto();
			 
			 
			 dto.setBambinoId(vaccinazione.getBambino().getId());
			 dto.setEtaSomministrazione(vaccinazione.getEtaSomministrazione());
			 dto.setStatoSomministrazione(vaccinazione.getStatoVaccinazione());
			 dto.setVaccinoId(vaccinazione.getVaccini().getId());
			 dto.setNomeVaccino(vaccinazione.getVaccini().getNome());		
			 vaccinazioneDto.add(dto);
		 }
		 
		 return vaccinazioneDto;
	}
	
  public VaccinazioneEntity aggiornaStatoVaccinazione(Long bambinoId,Long vaccinoId,String stato) {
	  
	  Optional<VaccinazioneEntity> statOptional = vaccinazioneRepository
              .findAll()
              .stream()
              .filter(stat -> stat.getBambino().getId().equals(bambinoId) && stat.getVaccini().getId().equals(vaccinoId))
              .findFirst();

      if (statOptional.isPresent()) {
          VaccinazioneEntity stat = statOptional.get();
          stat.setStatoVaccinazione(stato);
          return vaccinazioneRepository.save(stat);
      }
	  
	  return null;
  }

}
