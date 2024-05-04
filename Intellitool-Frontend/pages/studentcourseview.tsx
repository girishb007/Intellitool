import React, { useState } from 'react';
import {
  Box,
  Button,
  Link as ChakraLink,
  VStack,
  Text,
  Badge,
  Progress,
  Heading,
  useColorModeValue
} from '@chakra-ui/react';
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
    const getRandomGrade = () => Math.floor(60 + Math.random() * 40); // Random grade between 60% and 100%
    const getRandomProgress = () => Math.floor(50 + Math.random() * 50); // Random progress between 50% and 100%
  
    const bg = useColorModeValue("white", "gray.800"); // Responsive background color for tiles
  
    return (
      <>
        <Box p={5}>
          <Link href="/addCourses" passHref>
            <Button as="a" backgroundColor="#FF8BA7">Enrolled Courses</Button>
          </Link>
        </Box>
        <Box px={5} className="masonry-grid">
          <style>
            {`
              .masonry-grid {
                column-count: 3;
                column-gap: 16px;
              }
              .masonry-grid-item {
                break-inside: avoid;
                margin-bottom: 16px;
              }
            `}
          </style>
          {courses.map(course => (
             <Link key={course.id} href="/studentviewcourse" passHref>
            <Box key={course.id} className="masonry-grid-item" bg={bg} p={3} borderRadius="lg" boxShadow="lg">
              <VStack align="stretch" spacing={4}>
                <Heading size="md">{course.name} - {course.code}</Heading>
                <Text fontSize="sm">{course.description}</Text>
                <Badge colorScheme="pink">{course.term}</Badge>
                <ChakraLink href={`https://${course.zoom}`} isExternal fontWeight="bold">
                  Zoom Link
                </ChakraLink>
                <Text fontWeight="bold">Grade: {getRandomGrade()}%</Text>
                <Progress value={getRandomProgress()} size="sm" colorScheme="green" />
                <Text>Assignment Completion: {getRandomProgress()}%</Text>
              </VStack>
            </Box>
            </Link>
          ))}
        </Box>
      </>
    );
  };
  
  export default CoursesDisplay;