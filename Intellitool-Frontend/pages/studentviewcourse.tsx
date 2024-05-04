import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Text, Tab, TabList, Tabs, SimpleGrid, TabPanels, Avatar, TabPanel, Link, Heading, Divider, Flex, Button, Input, InputGroup, InputRightElement, useToast, Stack, Badge, Progress, Alert, AlertIcon } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import ReactPlayer from 'react-player';

const ViewCourse = () => {
    const router = useRouter();
    const { id } = router.query;
    const toast = useToast();
    const [course, setCourse] = useState({
        name: "Cloud Computing and Virtualization",
        code: "CMPE 280",
        description: "This course provides an in-depth exploration...",
        term: "Spring 2024",
        zoom: "https://zoom.us/j/9123456789?pwd=V0FKS2FJZ1JKZm12bG10YmJZQT09",
        lectures: [
            { id: '1a', title: "Lecture 1", url: "https://example.com/lecture1.mp4" },
            { id: '1b', title: "Lecture 2", url: "https://example.com/lecture2.mp4" },
            { id: '1c', title: "Lecture 3", url: "https://example.com/lecture3.mp4" },
            { id: '1d', title: "Lecture 4", url: "https://example.com/lecture4.mp4" },
            { id: '1e', title: "Lecture 5", url: "https://example.com/lecture5.mp4" },
            { id: '1f', title: "Lecture 6", url: "https://example.com/lecture6.mp4" },
            { id: '1g', title: "Lecture 7", url: "https://example.com/lecture7.mp4" },
            { id: '1h', title: "Lecture 8", url: "https://example.com/lecture8.mp4" },
            { id: '1i', title: "Lecture 9", url: "https://example.com/lecture9.mp4" },
            { id: '1j', title: "Lecture 10", url: "https://example.com/lecture10.mp4" },
            // Add more lectures as needed
        ],
        students: ["Student 1", "Student 2"],
        assignments: [],
        notes: [],
        videos: [],
        papers: []
    });

    const [currentLectureUrl, setCurrentLectureUrl] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <Box p={5}>
            <Flex justifyContent="space-between" alignItems="center">
                <Heading as="h2" size="lg">{course.name} - {course.code}</Heading>
                <Badge colorScheme="green">{course.term}</Badge>
            </Flex>
            <Text fontSize="md" my={2}>{course.description}</Text>
            <Link href={course.zoom} isExternal fontWeight="bold" textDecoration="underline">Join Live Class</Link>
            <Divider my={4} />
            
            <Tabs variant="soft-rounded" colorScheme="green">
                <TabList>
                    <Tab>Lectures</Tab>
                    <Tab>Assignments</Tab>
                    <Tab>Resources</Tab>
                    <Tab>Discussion</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <InputGroup mb={4}>
                            <Input placeholder="Search lectures..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            <InputRightElement children={<SearchIcon />} />
                        </InputGroup>
                        <SimpleGrid columns={1} spacing={4}>
                            {course.lectures.filter(lecture => lecture.title.toLowerCase().includes(searchTerm.toLowerCase())).map((lecture) => (
                                <Box key={lecture.id} p={4} shadow="sm" borderWidth="1px" borderRadius="md" bg="gray.50" onClick={() => setCurrentLectureUrl(lecture.url)}>
                                    <Text fontWeight="bold">{lecture.title}</Text>
                                    {currentLectureUrl === lecture.url && <ReactPlayer url={currentLectureUrl} playing controls />}
                                </Box>
                            ))}
                        </SimpleGrid>
                    </TabPanel>
                    <TabPanel>
                        <SimpleGrid columns={1} spacing={4}>
                            {course.assignments.map((assignment, index) => (
                                <Alert status="info" variant="left-accent" key={index}>
                                    <AlertIcon />
                                    <Box flex="1">
                                        <Text fontWeight="bold">Due: Tomorrow</Text>
                                        <Text>{assignment.title}</Text>
                                    </Box>
                                </Alert>
                            ))}
                        </SimpleGrid>
                    </TabPanel>
                    <TabPanel>
                        <Stack spacing={4}>
                            {course.notes.map((note, index) => (
                                <Box key={index} p={4} shadow="sm" borderWidth="1px" bg="gray.50">
                                    <Text fontWeight="bold">{note.title}</Text>
                                </Box>
                            ))}
                        </Stack>
                    </TabPanel>
                    <TabPanel>
                        {/* Discussion forum or interaction space could be implemented here */}
                        <Text>Forum posts and interactions go here.</Text>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default ViewCourse;
