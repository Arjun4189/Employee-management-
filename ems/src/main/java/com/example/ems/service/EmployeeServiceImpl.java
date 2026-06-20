package com.example.ems.service;

import com.example.ems.dto.EmployeeDto;
import com.example.ems.entity.Employee;
import com.example.ems.exception.ResourceNotFoundException;
import com.example.ems.mapper.EmployeeMapper;
import com.example.ems.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor

public class EmployeeServiceImpl implements EmployeeService {
    private EmployeeRepository employeeRepository;
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee= EmployeeMapper.mapToEmployee(employeeDto);
        Employee createEmployee= employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(createEmployee);

    }
    @Override
    public EmployeeDto getEmployeeById(Long employeeId){
        Employee employee=employeeRepository.findById(employeeId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee is not exist with given id:"));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployee() {
        List<Employee>employees = employeeRepository.findAll();
        return employees.stream().map((employee)->EmployeeMapper.mapToEmployeeDto(employee)).collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updateEmployee) {
        Employee employee=employeeRepository.findById(employeeId).orElseThrow(()
                -> new ResourceNotFoundException("employee in not exist with given Id "+employeeId));

        employee.setFirstname(updateEmployee.getFirstname());
        employee.setLastname(updateEmployee.getLastname());
        employee.setEmail(updateEmployee.getEmail());

        Employee updatedEmployee= employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(updatedEmployee);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee=employeeRepository.findById(employeeId).orElseThrow(()
                -> new ResourceNotFoundException("employee in not exist with given Id "+employeeId));
        employeeRepository.deleteById(employeeId);


    }

}
