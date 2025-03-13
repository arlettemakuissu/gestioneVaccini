package com.example.demo.userService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.userEntity.UserEntity;
import com.example.demo.userRepository.UserRepository;

import Dto.UserDto;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	public UserEntity saveUser(UserDto userDto) {
		
		UserEntity user = new UserEntity();
		
		  user.setNome(userDto.getNome());
		  user.setEmail(userDto.getEmail());
		  user.setPassword(userDto.getPassword());
		  user.setRole(userDto.getRole());
		
		return  userRepository.save(user);
		
	}
	public UserDto login(String email, String password) {
        Optional<UserEntity> user = userRepository.findUserByEmail(email);

        if (user.isPresent() && user.get().getPassword().equals(password)) {
            UserEntity foundUser = user.get();
            System.out.println(foundUser);
            return new UserDto(foundUser.getId(), foundUser.getNome(), foundUser.getEmail(),foundUser.getPassword() ,foundUser.getRole());
        }

        throw new IllegalArgumentException("Invalid email or password");
    }
}
	


