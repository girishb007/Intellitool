import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box, Button, Text, Flex, useToast
} from '@chakra-ui/react';

const EnrollPage = () => {
    const [courses, setCourses] = useState([]);
    const toast = useToast();
    const router = useRouter();

    useEffect(() => {
        fetch('http://localhost:8000/intellitool/courses')
            .then(response => response.json())
            .then(data => {
                setCourses(data);
            })
            .catch(error => {
                toast({
                    title: "Error fetching courses",
                    description: error.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            });
    }, []);

    const handleEnrollment = (course) => {
        const student_id = 1;  // "student_id_here"; // Replace with actual student ID logic
        fetch(`http://localhost:8000/intellitool/students/courseEnrollment?student_id=${student_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ course_ids: [course.name] }) // Send the course name
        })
        .then(response => {
            if (response.ok) {
                toast({
                    title: "Enrollment Successful",
                    description: `You have been enrolled in course: ${course.name}`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                response.json().then(data => {
                    toast({
                        title: "Enrollment Failed",
                        description: data.message,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                });
            }
        })
        .catch(error => {
            toast({
                title: "Enrollment Error",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        });
    };
    

    return (
        <Box p={5}>
            <Text fontSize="2xl" mb={4}>Enroll in Courses</Text>
            {courses.map((course) => (
                <Flex key={course.id} p={3} mb={3} borderWidth="1px" borderRadius="lg" alignItems="center" justifyContent="space-between">
                    <Box>
                        <Text fontWeight="bold">{course.name}</Text>
                        <Text>Description: {course.description}</Text>
                        <Text>Term: {course.term}</Text>
                        <Text>Professor ID: {course.professor_id}</Text>
                    </Box>
                    <Button colorScheme="blue" onClick={() => handleEnrollment(course)}>Enroll Course</Button>
                </Flex>
            ))}
        </Box>
    );
    
};

export default EnrollPage;
