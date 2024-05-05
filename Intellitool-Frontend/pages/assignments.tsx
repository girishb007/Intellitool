import React, { useState, useEffect } from 'react';
import { Box, Heading, Divider, Select, FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react';

const AddAssignment = () => {
    const [selectedCourse, setSelectedCourse] = useState(''); // State to keep track of the selected course ID
    const [assignmentName, setAssignmentName] = useState('');
    const [assignmentName2, setAssignmentName2] = useState('');
    const [assignmentDescription, setAssignmentDescription] = useState('');
    const [postedDate, setPostedDate] = useState('');
    const [deadline, setDeadline] = useState('');
    const [courses, setCourses] = useState([]);
    const toast = useToast();

    useEffect(() => {
        // Fetching course IDs
        fetch('http://localhost:8000/intellitool/professors')
            .then(response => response.json())
            .then(data => {
                // Assuming the response data is an array of professors and extracting courses
                if (data.length > 0) {
                    const allCourses = data.flatMap(professor => professor.courses);
                    setCourses(allCourses);
                }
            })
            .catch(error => {
                console.error('Failed to fetch courses:', error);
                toast({
                    title: "Error",
                    description: `Failed to fetch courses: ${error.message}`,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            });
    }, []);

    const handleSubmit = () => {
        const assignmentData = {
            id: selectedCourse,  // Use the selected course ID
            courseName: assignmentName2, // This might be a mistake; should it be a separate courseName?
            name: assignmentName,
            description: assignmentDescription,
            courseId: parseInt(selectedCourse, 10),  // Convert selectedCourse to an integer
            posted: postedDate,
            deadline: deadline
        };

        fetch('http://localhost:8000/intellitool/course/addAssignments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([assignmentData])  // Ensure the data is sent as an array
        })
        .then(response => {
            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Assignment added successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                response.json().then(data => {
                    console.error('Failed to add assignment:', data);
                    toast({
                        title: "Error",
                        description: `Failed to add assignment: ${data.detail[0].msg}`,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                });
            }
        })
        .catch(error => {
            console.error('Failed to add assignment:', error);
            toast({
                title: "Error",
                description: `Failed to add assignment: ${error.message}`,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        });
    };

    return (
        <Box p={5} bg="#FBDFE9" borderRadius="lg">
            <Heading as="h2" size="xl" mb={4}>Add Assignment</Heading>
            <Divider my={4} borderColor="#4a2020" />
            <FormControl mb={4}>
                <FormLabel htmlFor="courseId">Course ID</FormLabel>
                <Select id="courseId" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                    {courses.map(course => (
                        <option key={course} value={course}>{course}</option>
                    ))}
                </Select>
            </FormControl>
            <FormControl mb={4}>
                <FormLabel htmlFor="assignmentName">Course Name</FormLabel>
                <Input id="assignmentName2" value={assignmentName2} onChange={(e) => setAssignmentName2(e.target.value)} />
            </FormControl>
            <FormControl mb={4}>
                <FormLabel htmlFor="assignmentName">Assignment Name</FormLabel>
                <Input id="assignmentName" value={assignmentName} onChange={(e) => setAssignmentName(e.target.value)} />
            </FormControl>
            <FormControl mb={4}>
                <FormLabel htmlFor="assignmentDescription">Assignment Description</FormLabel>
                <Input id="assignmentDescription" value={assignmentDescription} onChange={(e) => setAssignmentDescription(e.target.value)} />
            </FormControl>
            <FormControl mb={4}>
                <FormLabel htmlFor="postedDate">Posted Date</FormLabel>
                <Input id="postedDate" type="date" value={postedDate} onChange={(e) => setPostedDate(e.target.value)} />
            </FormControl>
            <FormControl mb={4}>
                <FormLabel htmlFor="deadline">Deadline</FormLabel>
                <Input id="deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </FormControl>
            <Button colorScheme="teal" onClick={handleSubmit}>Submit</Button>
        </Box>
    );
};

export default AddAssignment;
