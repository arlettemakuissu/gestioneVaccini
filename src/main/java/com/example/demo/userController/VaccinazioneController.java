package com.example.demo.userController;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.userEntity.VaccinazioneEntity;
import com.example.demo.userService.VaccinazioneService;

import Dto.VaccinazioneDto;

@RestController
public class VaccinazioneController {
	
	
	@Autowired
	private VaccinazioneService vaccinazioneService;
	
	
	@PostMapping("/api/statovaccinazione/{id}")
	public List< VaccinazioneEntity> createStatisticheNuovoBambino(@PathVariable Long id ) {
		System.out.println(id);
		  return  vaccinazioneService.createStatisticheNuovoBambino(id);
		
	 
	}
	
	@GetMapping("/api/statovaccinazione/{id}")
	public List<VaccinazioneDto> getStatoByBambino(@PathVariable Long id){
		
		
		
		return vaccinazioneService.statoVaccinazioneById(id);
	}
	
	@GetMapping(("/api/statovaccinazioni"))
	public List<VaccinazioneDto> getAllStatoVaccinazione(){
		
		
		return vaccinazioneService.getAllStatoVaccinazioni();
	}
	
	@PutMapping("/api/updateStato")
   public VaccinazioneEntity aggionaStatoVaccinazione(@RequestBody Map<String ,Object> payload ) {
	   
	   System.out.println(payload);
	   
	   Long bambinoId = Long.valueOf(payload.get("bambinoId").toString());
       Long vaccinoId = Long.valueOf(payload.get("vaccinoId").toString());
       String stato = payload.get("stato").toString();
	   System.out.println(stato);
	   System.out.println("aaaa");
	   
	   return  vaccinazioneService.aggiornaStatoVaccinazione( bambinoId, vaccinoId, stato);
   }
}
