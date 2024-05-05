import React, { useState, useRef } from 'react';
import { Box, Button, Input, Select, Textarea, Checkbox, CheckboxGroup, Stack, useToast, FormControl, FormLabel, Flex } from '@chakra-ui/react';

const CourseManagement = ({ professorId }) => {
    const [course, setCourse] = useState({
        id: '',
        name: '',
        description: '',
        term: '',
        zoom: '',
        assignments: [],
        lectureNotes: [],
        assignmentFiles: [],
        previousPapers: []
    });
    const toast = useToast();
    const courseIdRef = useRef(0); // Using useRef to keep track of the last ID used

    const handleInputChange = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value });
    };

    const handleAssignmentChange = (assignment) => {
        setCourse(prev => ({ ...prev, assignments: assignment }));
    };

    const handleFileChange = (e, category) => {
        setCourse(prev => ({ ...prev, [category]: Array.from(e.target.files) }));
    };
    const assignmentLabels = [
        "Assignment 1", "Assignment 2", "Assignment 3",
        "Midterm 1",
        "Assignment 5", "Assignment 6", "Assignment 7",
        "Midterm 2",
        "Project Demo"
    ];
    // Define term options
    const termOptions = [
        "Fall 2022", "Spring 2023", "Fall 2023", "Spring 2024"
    ];

    const addCourse = async () => {
        const data = [{
            id: course.id,  // Auto-incremented ID
            name: course.name,
            description: course.description,
            term: course.term,
            zoom: course.zoom
        }];
    
        courseIdRef.current += 1; // Increment the ID for next use
    
        // Construct the URL with the query parameter
        const url = new URL(`http://localhost:8000/intellitool/profAddCourse`);
        url.searchParams.append("professor", "Ken Youseffi"); // Append the 'professor' query parameter
    
        try {
            const response = await fetch(url, {  // Use the constructed URL with the query parameter
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            if (response.ok) {
                toast({
                    title: 'Course added successfully',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
            } else {
                const errorText = await response.text(); // Getting more details from the response body
                throw new Error(errorText);
            }
        } catch (error) {
            toast({
                title: 'Error adding course',
                description: error.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    };
    
    
    return (
        <Box p={5}>
            <Input placeholder="Course ID" value={course.id} onChange={handleInputChange} name="id" />
            <Input placeholder="Course Name" value={course.name} onChange={handleInputChange} name="name" />
            <Textarea placeholder="Course Description" value={course.description} onChange={handleInputChange} name="description" mt={2} />
            <Select placeholder="Select term" value={course.term} onChange={handleInputChange} name="term" mt={2}>
                {termOptions.map((term, index) => (
                    <option key={index} value={term}>{term}</option>
                ))}
            </Select>
            <Input placeholder="Zoom Link" value={course.zoom} onChange={handleInputChange} name="zoom" mt={2} />
            <CheckboxGroup colorScheme="blue" onChange={handleAssignmentChange} value={course.assignments}>
                <Stack mt={2}>
                    {assignmentLabels.map((label, index) => (
                        <Checkbox key={index} value={label}>{label}</Checkbox>
                    ))}
                </Stack>
            </CheckboxGroup>
            
            <Flex mt={4} direction="row" gap="20px">
                <Box boxShadow="md" p="2" borderRadius="md" width="250px">
                    <FormLabel>Lecture Notes/PDF</FormLabel>
                    <Input type="file" onChange={(e) => handleFileChange(e, 'lectureNotes')} multiple />
                </Box>
                <Box boxShadow="md" p="2" borderRadius="md" width="250px">
                    <FormLabel>Assignments</FormLabel>
                    <Input type="file" onChange={(e) => handleFileChange(e, 'assignmentFiles')} multiple />
                </Box>
                <Box boxShadow="md" p="2" borderRadius="md" width="250px">
                    <FormLabel>Previous Year Papers</FormLabel>
                    <Input type="file" onChange={(e) => handleFileChange(e, 'previousPapers')} multiple />
                </Box>
            </Flex>

           
            <Button onClick={addCourse} mt={4} style={{ backgroundColor: '#FF8BA7', color: 'white' }} >
    Add Course
</Button>
        </Box>
    );
};

export default CourseManagement;
