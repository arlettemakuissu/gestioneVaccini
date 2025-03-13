package com.example.demo.userController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.userEntity.UserEntity;
import com.example.demo.userService.UserService;

import Dto.LoginRequest;
import Dto.UserDto;

@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	
	@PostMapping("/api/user")
	public UserEntity saveUser(@RequestBody UserDto user) {
		
		
		UserEntity addUser = userService.saveUser(user);
		
		return addUser;
	}
	
	@PostMapping("/api/user/login")
    public ResponseEntity<UserDto> login(@RequestBody LoginRequest loginRequest) {
		
		System.out.println(loginRequest.getEmail());
        try {
            UserDto userDTO = userService.login(loginRequest.getEmail(), loginRequest.getPassword());
            return ResponseEntity.ok(userDTO);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }
}

