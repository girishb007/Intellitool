import React, { useState } from 'react';
import { Box, Button, Input, Select, Textarea, Checkbox, CheckboxGroup, Stack, useToast, FormControl, FormLabel, Flex } from '@chakra-ui/react';

const CourseManagement = ({ professorId }) => {
    const [course, setCourse] = useState({
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

    const addCourse = async () => {
        const formData = new FormData();
        formData.append('name', course.name);
        formData.append('description', course.description);
        formData.append('term', course.term);
        formData.append('zoom', course.zoom);
        course.lectureNotes.forEach(file => formData.append('lectureNotes', file));
        course.assignmentFiles.forEach(file => formData.append('assignmentFiles', file));
        course.previousPapers.forEach(file => formData.append('previousPapers', file));

        const response = await fetch(`http://localhost:8000/intellitool/addCourse?professor=${professorId}`, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            toast({
                title: 'Course added successfully',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Error adding course',
                description: response.statusText,
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    };

    return (
        <Box p={5}>
            <Input placeholder="Course Name" value={course.name} onChange={handleInputChange} name="name" />
            <Textarea placeholder="Course Description" value={course.description} onChange={handleInputChange} name="description" mt={2} />
            <Select placeholder="Select term" value={course.term} onChange={handleInputChange} name="term" mt={2} />
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
