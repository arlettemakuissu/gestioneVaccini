package com.example.demo.userController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.example.demo.userService.BambinoService;

import Dto.BambiniDto;
import Dto.VacciniDto;

@RestController
public class BambiniController {
	
	@Autowired
	private BambinoService bambinoService;
	
	
	@PostMapping("/api/bambino/{id}")
	public BambiniDto saveBambino(@RequestBody BambiniDto bambinoDto, @PathVariable Long id) {
		
		BambiniDto bambino = bambinoService.saveBambino(bambinoDto, id);
		
		return bambino;
	}
	@GetMapping("/api/bambini")
   public List<BambiniDto> getAllBambini(){
	   
	   
	   return bambinoService.getAllBambini(); 
	   
   }

	@PutMapping("/api/bambino/{id}")
    public ResponseEntity<BambinoEntity> updateVaccini(@PathVariable Long id,@RequestBody BambiniDto bambinoDto) {
		
		System.out.println(id);
		System.out.println("hhhhhhhh");
       
        	BambinoEntity updatedBambino=  bambinoService.updateBambino(id, bambinoDto);
            return ResponseEntity.ok(updatedBambino);
        
    }
	@DeleteMapping("/api/deleteBambino/{id}")
	public ResponseEntity<?>  deleteBambinoById(@PathVariable Long id) {
		
		
		try {
			bambinoService.deleteBambinoById(id);
            return ResponseEntity.ok("Vaccino eliminato con successo!");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
	
}
