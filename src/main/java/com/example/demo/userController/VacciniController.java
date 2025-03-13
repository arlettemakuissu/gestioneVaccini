package com.example.demo.userController;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.userEntity.BambinoEntity;
import com.example.demo.userEntity.VacciniEntity;
import com.example.demo.userService.VacciniService;

import Dto.BambiniDto;
import Dto.VacciniDto;
import jakarta.persistence.EntityNotFoundException;

@RestController
public class VacciniController {
	
	
	@Autowired
	private VacciniService vacciniService;
	
	
	
	
	@PostMapping("/api/vaccini")
	
	public VacciniEntity saveVaccino( @RequestBody VacciniDto vaccinoDto) {
		
		System.out.println(vaccinoDto);
		System.out.println("5555");
		
		VacciniEntity vaccino = vacciniService.saveVaccino(vaccinoDto);
		
		
		return vaccino;
	}
	
	{/*@GetMapping("/api/vaccini")
	public List<VacciniDto> getAllVaccini(){
		
	   List <VacciniEntity> vaccini= vacciniService.getAllVacini();
	   
	   List<VacciniDto> vacciniDto = new ArrayList<> ();
	   
	   for(VacciniEntity vaccino: vaccini) {
		   
		   vacciniDto.add(new VacciniDto (vaccino.getId(),vaccino.getNome(),vaccino.getEtaSomministrazione(),vaccino.getDescrizione()));
	   }
	   
	   return vacciniDto;
	   
	   
	   
		
	}*/}
	
	  @GetMapping("/api/vaccini")
    public ResponseEntity<List<VacciniDto>> getAllVaccini() {
        List<VacciniDto> vacciniDto =vacciniService.getAllVaccini();
        return ResponseEntity.ok(vacciniDto);
    }
	
	@PostMapping("/api/savevaccini")
    public ResponseEntity<VacciniEntity> creaVaccino(@RequestBody VacciniDto vaccinoDto) {
		
        VacciniEntity nuovoVaccino = vacciniService.saveVaccino(vaccinoDto);
        return ResponseEntity.ok(nuovoVaccino);
    }
	
	@DeleteMapping("/api/deleteVaccino/{id}")
	public ResponseEntity<?>  deleteVaccinoById(@PathVariable Long id) {
		
		
		try {
            vacciniService.deleteVaccinoById(id);
            return ResponseEntity.ok("Vaccino eliminato con successo!");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
	
	
	
	@PutMapping("/api/vaccino/{id}")
    public ResponseEntity<VacciniEntity> updateVaccini(@PathVariable Long id,@RequestBody VacciniDto vaccinoDto) {
		
		System.out.println(id);
		System.out.println("hhhhhhhh");
       
        	VacciniEntity updatedCliente = vacciniService.updateVaccino(id, vaccinoDto);
            return ResponseEntity.ok(updatedCliente);
        
    }
		
	
}


