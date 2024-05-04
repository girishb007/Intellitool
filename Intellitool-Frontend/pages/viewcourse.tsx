import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Text, Tab, TabList, Tabs, SimpleGrid, TabPanels, Avatar, TabPanel, Link, Heading, Divider, Flex, Button, IconButton, Input, InputGroup, InputRightElement, Collapse, useToast } from '@chakra-ui/react';
import { CloseIcon, SearchIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
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
    const [uploadedNotes, setUploadedNotes] = useState([]);
    const [uploadedVideos, setUploadedVideos] = useState([]);
    const [uploadedAssignments, setUploadedAssignments] = useState([]);
    const [uploadedPapers, setUploadedPapers] = useState([]);

    const handleFileUpload = (files, category) => {
        const reader = new FileReader();
        reader.onload = (function(theFile) {
            return function(e) {
                const binaryData = e.target.result;
                // Assuming that you want to store the uploaded file data in state
                switch(category) {
                    case 'notes':
                        setUploadedNotes([...uploadedNotes, binaryData]);
                        break;
                    case 'videos':
                        setUploadedVideos([...uploadedVideos, binaryData]);
                        break;
                    case 'assignments':
                        setUploadedAssignments([...uploadedAssignments, binaryData]);
                        break;
                    case 'papers':
                        setUploadedPapers([...uploadedPapers, binaryData]);
                        break;
                    default:
                        break;
                }
            };
        })(files[0]);

        reader.readAsDataURL(files[0]);
    };
    const handleLectureClick = (lectureUrl) => {
        setCurrentLectureUrl(lectureUrl);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <Box p={5} bg="#FBDFE9" borderRadius="lg">
        <Heading as="h2" size="xl" mb={4} style={{ color: '#3a1c1c' }}>{course.name} - {course.code}</Heading>
        <Text fontSize="lg" mb={2} style={{ color: '#3a1c1c' }}>{course.description}</Text>
        <Text fontWeight="bold" style={{ color: '#4a2020' }}>Term: {course.term}</Text>
        <Link href={course.zoom} isExternal fontWeight="bold" textDecoration="underline" mb={2} style={{ color: '#4a2020' }}>Join Class</Link>
        <Divider my={4} borderColor="#4a2020" />
        <Tabs variant="enclosed" colorScheme="purple">
                <TabList>
                    <Tab>Lecture Notes / PDF</Tab>
                    <Tab>Lecture Videos</Tab>
                    <Tab>Students Enrolled</Tab>
                    <Tab>Assignments</Tab>
                    <Tab>Previous Year Papers</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Input type="file" onChange={(e) => handleFileUpload(e.target.files, 'notes')} accept="application/pdf" />
                        <SimpleGrid columns={3} spacing={4}>
                            {uploadedNotes.map((note, index) => (
                                <Box key={index} p={3} shadow="md" borderWidth="1px" borderRadius="md" bg="white">
                                    <Text>PDF {index + 1}</Text>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </TabPanel>
                    <TabPanel>
                        <InputGroup mb={4}>
                            <Input placeholder="Search lectures..." value={searchTerm} onChange={handleSearchChange} />
                            <InputRightElement children={<IconButton aria-label="Search" icon={<SearchIcon />} />} />
                        </InputGroup>
                        <SimpleGrid columns={3} spacing={4}>
                            {course.lectures.filter(lecture => lecture.title.toLowerCase().includes(searchTerm.toLowerCase())).map((lecture) => (
                                <Box key={lecture.id} p={5} shadow="md" borderWidth="1px" borderRadius="md" overflow="hidden" bg="white" onClick={() => handleLectureClick(lecture.url)} height="100%" width="100%">
                                    <Text fontSize="md" fontWeight="bold" textAlign="center">{lecture.title}</Text>
                                </Box>
                            ))}
                        </SimpleGrid>
                        {currentLectureUrl && (
                            <ReactPlayer url={currentLectureUrl} playing controls width="100%" />
                        )}
                    </TabPanel>
                    <TabPanel>
    <SimpleGrid columns={2} spacing={4}>
       

        {/* If you want to generate a static list of placeholder entries */}
        {Array.from({ length: 10 }, (_, i) => (
            <Flex alignItems="center" key={i} mb={4}>
                <Avatar name={`Student ${i + 1}`} src={`/previews/avatar1.png`} />
                <Text ml={2}>{`Student ${i + 1}`}</Text>
            </Flex>
        ))}
    </SimpleGrid>
</TabPanel>

                    <TabPanel>
                        <Input type="file" onChange={(e) => handleFileUpload(e.target.files, 'assignments')} accept="application/pdf" />
                        <SimpleGrid columns={3} spacing={4}>
                            {uploadedAssignments.map((assignment, index) => (
                                <Box key={index} p={3} shadow="md" borderWidth="1px" borderRadius="md" bg="white">
                                    <Text>Assignment {index + 1}</Text>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </TabPanel>
                    <TabPanel>
                        <Input type="file" onChange={(e) => handleFileUpload(e.target.files, 'papers')} accept="application/pdf" />
                        <SimpleGrid columns={3} spacing={4}>
                            {uploadedPapers.map((paper, index) => (
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
