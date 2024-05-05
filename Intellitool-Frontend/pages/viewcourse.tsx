import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box, Text, Tab, TabList, Tabs, SimpleGrid, TabPanels, Avatar, TabPanel,
  Link, Heading, Divider, Flex, Button, useToast, Accordion,
  AccordionItem, AccordionButton, AccordionPanel, AccordionIcon
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';


const ViewCourse = () => {
    const router = useRouter();
    const toast = useToast();
    const [course, setCourse] = useState({
        id: "",
        name: "",
        description: "",
        term: "",
        zoom: "",
        lectures: [],
        notes: [],
        students: Array.from({ length: 20 }, (_, i) => `Student ${i + 1}`),
        assignments: [],
        papers: []
    });
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        const course_id = router.query.course_id;
        if (course_id) {
            fetch(`http://localhost:8000/intellitool/course?course_id=${course_id}`)
                .then(response => response.json())
                .then(data => {
                    if (data && data.length > 0) {
                        setCourse({
                            ...data[0],
                            lectures: data[0].lectures || [],
                            notes: data[0].notes || [],
                            assignments: data[0].assignments || [],
                            papers: data[0].papers || []
                        });
                    } else {
                        toast({
                            title: "No Data",
                            description: "No course details found.",
                            status: "warning",
                            duration: 5000,
                            isClosable: true,
                        });
                    }
                })
                .catch(error => {
                    console.error('Failed to fetch course:', error);
                    toast({
                        title: "Error",
                        description: `Failed to load course details: ${error.message}`,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                });
        }
    }, [router.query.course_id]);

    useEffect(() => {
        if (tabIndex === 3 && course.id) {
            fetchAssignments();
        }
    }, [tabIndex, course.id]);

    const fetchAssignments = () => {
        if (!course.id) return;
        fetch(`http://localhost:8000/intellitool/course/assignments?courseId=${course.id}`)
            .then(response => response.json())
            .then(data => {
                setCourse(prevState => ({
                    ...prevState,
                    assignments: data || []
                }));
            })
            .catch(error => {
                console.error('Failed to fetch assignments:', error);
                toast({
                    title: "Error",
                    description: `Failed to fetch assignments: ${error.message}`,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            });
    };
    const handleAddAssignmentClick = () => {
        router.push('/assignments'); // Redirects to the assignments page
    };


    return (
        <Box p={5} bg="#FBDFE9" borderRadius="lg">
            <Heading as="h2" size="xl" mb={4} style={{ color: '#3a1c1c' }}>{course.name} - {course.id}</Heading>
            <Text fontSize="lg" mb={2} style={{ color: '#3a1c1c' }}>{course.description}</Text>
            <Text fontWeight="bold" style={{ color: '#4a2020' }}>Term: {course.term}</Text>
            <Link href={course.zoom} isExternal fontWeight="bold" textDecoration="underline" mb={2} style={{ color: '#4a2020' }}>Join Class</Link>
            <Divider my={4} borderColor="#4a2020" />
            <Tabs variant="enclosed" colorScheme="purple" index={tabIndex} onChange={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>Lecture Notes / PDF</Tab>
                    <Tab>Lecture Videos</Tab>
                    <Tab>Students Enrolled</Tab>
                    <Tab>Assignments</Tab>
                    <Tab>Previous Year Papers</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Button leftIcon={<AddIcon />} colorScheme="teal">Upload Notes</Button>
                        <SimpleGrid columns={3} spacing={4} mt={3}>
                            {course.notes.map((note, index) => (
                                <Box key={index} p={3} shadow="md" borderWidth="1px" borderRadius="md" bg="white">
                                    <Text>PDF {index + 1}</Text>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </TabPanel>
                    <TabPanel>
                        <SimpleGrid columns={3} spacing={4}>
                            {course.lectures.map((lecture, index) => (
                                <Box key={index} p={5} shadow="md" borderWidth="1px" borderRadius="md" overflow="hidden" bg="white" onClick={() => console.log(`Playing video: ${lecture.url}`)}>
                                    <Text fontSize="md" fontWeight="bold" textAlign="center">{lecture.title}</Text>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </TabPanel>
                    <TabPanel>
                        <SimpleGrid columns={2} spacing={4}>
                            {course.students.map((student, index) => (
                                <Flex alignItems="center" key={index} mb={4}>
                                    <Avatar name={student} src={`/previews/avatar${index % 5 + 1}.png`} />
                                    <Text ml={2}>{student}</Text>
                                </Flex>
                            ))}
                        </SimpleGrid>
                    </TabPanel>
                    <TabPanel>
                    <Button 
                            leftIcon={<AddIcon />} 
                            colorScheme="teal" 
                            mb={4}
                            onClick={handleAddAssignmentClick} // Add this onClick handler
                        >
                            Add Assignments
                        </Button>    {/*<SimpleGrid columns={3} spacing={4}>
        {course.assignments.map((assignment, index) => (
            <Box key={index} p={3} shadow="md" borderWidth="1px" borderRadius="md" bg="white">
                <Text>Assignment {index + 1}</Text>
            </Box>
        ))}
        </SimpleGrid>*/}
    <Accordion allowToggle mt={4}>
        {course.assignments.map((assignment, index) => (
            <AccordionItem key={index}>
                <h2>
                    <AccordionButton>
                        <Box flex="1" textAlign="left">
                            {assignment.name}
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <Text><strong>Description:</strong> {assignment.description}</Text>
                    <Text><strong>Course Name:</strong> {assignment.courseName}</Text>
                    <Text><strong>Deadline:</strong> {assignment.deadline}</Text>
                    <Text><strong>Posted:</strong> {assignment.posted}</Text>
                </AccordionPanel>
            </AccordionItem>
        ))}
    </Accordion>
</TabPanel>

                    <TabPanel>
                        <Button leftIcon={<AddIcon />} colorScheme="teal">Upload Papers</Button>
                        <SimpleGrid columns={3} spacing={4} mt={3}>
                            {course.papers.map((paper, index) => (
                                <Box key={index} p={3} shadow="md" borderWidth="1px" borderRadius="md" bg="white">
                                    <Text>Paper {index + 1}</Text>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default ViewCourse;
