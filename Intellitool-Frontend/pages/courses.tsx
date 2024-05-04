import React, { useState } from 'react';
import { Box, Grid, Text, Badge, Button, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';

const CoursesDisplay = () => {
    const [courses] = useState([
        {
            id: 114,
            name: "Cloud Computing",
            description: "Cloud Computing and Virtulization",
            term: "Fall 2023",
            zoom: "sjsu.zoom.in/datastruc"
        },
        {
            id: 112,
            name: "Web Development",
            description: "Introduction to HTML, CSS, and JavaScript",
            term: "Fall 2023",
            zoom: "sjsu.zoom.in/webdev"
        },
        {
            id: 110,
            name: "Enterprise Applications",
            description: "E10 Labs",
            term: "Spring 2024",
            zoom: "sjsu.zoom.in/yken"
        },
        {
            id: 111,
            name: "Python Introductions",
            description: "Python for beginners",
            term: "Spring 2024",
            zoom: "sjsu.zoom.in/yken"
        },
        {
            id: 113,
            name: "Data Structures",
            description: "Advanced data structures in C++",
            term: "Fall 2022",
            zoom: "sjsu.zoom.in/datastruc"
        },
        {
            id: 115,
            name: "Business Analytics",
            description: "Introduction of Data Mining",
            term: "Fall 2023",
            zoom: "sjsu.zoom.in/datastruc"
        },
        {
            id: 116,
            name: "Blockchain and IOT",
            description: "Introduction to Applications of Cryptocurrency",
            term: "Fall 2023",
            zoom: "sjsu.zoom.in/datastruc"
        }
    ]);

    return (
        <>
            <Box p={5}>
                <Link href="/addCourses" passHref>
                    <Button as="a" style={{ backgroundColor: '#FF8BA7' }}>Add New Course</Button>
                </Link>
            </Box>
            <Grid templateColumns="repeat(auto-fit, minmax(240px, 1fr))" gap={6} p={5}>
                {courses.map(course => (
                    <Link key={course.id} href={`/viewcourse`} passHref>
                        <Box as="a" p={5} shadow="md" borderWidth="1px" borderRadius="lg" overflow="hidden" cursor="pointer"
                             height="200px" display="flex" flexDirection="column" justifyContent="space-between" style={{ borderColor: '#FF8BA7' }}>
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
                    </Link>
                ))}
            </Grid>
        </>
    );
};

export default CoursesDisplay;
