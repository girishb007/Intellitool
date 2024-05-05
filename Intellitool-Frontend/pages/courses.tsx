import React, { useState, useEffect } from 'react';
import { Box, Grid, Text, Badge, Button, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const CoursesDisplay = () => {
    const [courses, setCourses] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch('http://localhost:8000/intellitool/courses');
            if (response.ok) {
                const data = await response.json();
                setCourses(data); // Update state with fetched courses
            } else {
                console.error('Failed to fetch courses:', response.statusText);
            }
        };

        fetchCourses();
    }, []);

    /*const handleCourseClick = (courseId) => {
        // Push to the router without changing the visible URL
        router.push({
            pathname: '/viewcourse',
            query: { id: courseId },
        }, '/viewcourse', { shallow: true });
    };*/
    const handleCourseClick = (courseId) => {
        router.push(`/viewcourse?course_id=${courseId}`, undefined, { shallow: true });
    };
    

    return (
        <>
            <Box p={5}>
                <Link href="/addCourses" passHref>
                    <Button as="a" style={{ backgroundColor: '#FF8BA7' }}>Add New Course</Button>
                </Link>
            </Box>
            <Grid templateColumns="repeat(auto-fit, minmax(240px, 1fr))" gap={6} p={5}>
                {courses.map(course => (
                    <Box as="a" onClick={() => handleCourseClick(course.id)} key={course.id} p={5} shadow="md" borderWidth="1px" borderRadius="lg" overflow="hidden" cursor="pointer" style={{ borderColor: '#FF8BA7' }}>
                        <Box>
                            <Text fontSize="xl" fontWeight="bold" isTruncated>{course.name}</Text>
                            <Text mt={2} isTruncated noOfLines={2}>{course.description}</Text>
                            <Badge borderRadius="full" px={2} mt={2} style={{ backgroundColor: '#FF8BA7', color: 'white' }}>
                                {course.term}
                            </Badge>
                        </Box>
                        <ChakraLink href={`https://${course.zoom}`} isExternal mt={2} display="block">
                            Zoom Link
                        </ChakraLink>
                    </Box>
                ))}
            </Grid>
        </>
    );
};

export default CoursesDisplay;
