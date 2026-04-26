import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Box, Button, Container, Heading, Text, VStack, Input, Textarea, Grid, GridItem, Center, Spinner, HStack, SimpleGrid, Badge, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { hrApi } from '../api/client';
import type { SaveCandidatePayload } from '../types';

const MotionGridItem = motion.create(GridItem);
const MotionBox = motion.create(Box);

3
const getLanguageColor = (lang: string) => {
  const map: { [key: string]: string } = {
    JavaScript: 'yellow',
    TypeScript: 'blue',
    Python: 'green',
    React: 'cyan',
    HTML: 'orange',
    CSS: 'purple',
  };
  return map[lang] || 'gray';
};

export default function CandidateDetails() {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState<number | ''>('');
  const [interviewNote, setInterviewNote] = useState('');

  const { data: profile, isLoading, isError, error } = useQuery({
    queryKey: ['githubProfile', username],
    queryFn: () => hrApi.getGithubProfile(username!),
    enabled: !!username,
  });

  useEffect(() => {
    if (profile) {
      setFullName(profile.fullName || profile.username || '');
    }
  }, [profile]);

  const saveMutation = useMutation({
    mutationFn: (payload: SaveCandidatePayload) => hrApi.saveCandidate(payload),
    onSuccess: () => navigate('/'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || yearsOfExperience === '') return;
    saveMutation.mutate({
      githubUsername: profile.username,
      fullName: fullName.trim(),
      yearsOfExperience: Number(yearsOfExperience),
      interviewNote,
    });
  };

  if (isLoading) {
    return (
      <Center h="100vh">
        <VStack gap="6">
          <Spinner size="xl" color="brand.500" borderWidth="5px" />
          <Text color="gray.600" fontSize="lg" fontWeight="semibold">HR.io מנתח את הפרופיל...</Text>
        </VStack>
      </Center>
    );
  }

  if (isError || !profile) {
    return (
      <Center h="100vh" pt="20">
        <Box bg="white" p="10" borderRadius="3xl" shadow="xl" textAlign="center">
          <VStack gap="6">
            <Heading color="red.500" size="xl">שגיאה בשליפה</Heading>
            <Text color="gray.600">{error instanceof Error ? error.message : 'לא נמצא מועמד'}</Text>
            <Button variant="outline" onClick={() => navigate('/')}>חזור לחיפוש</Button>
          </VStack>
        </Box>
      </Center>
    );
  }

  return (
    <Container maxW="7xl" pt="32" pb="20">
      <Grid templateColumns={{ base: '1fr', lg: '1.4fr 1fr' }} gap="10" alignItems="start">

        <MotionGridItem
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <VStack align="stretch" gap="10">

            <Box
              bg="white"
              backdropBlur="xl"
              borderRadius="3xl"
              borderWidth="1px"
              borderColor="glassBorder"
              p="10"
              shadow="0 8px 32px 0 rgba(31, 38, 135, 0.08)"
            >
              <Flex gap="6" align="center" borderBottomWidth="2px" borderColor="gray.50" pb="8" mb="8">
                <Center w="20" h="20" bg="brand.500" borderRadius="24px" color="white" fontSize="4xl" fontWeight="black" shadow="0 10px 20px {colors.brand.200}">
                  {profile.fullName?.charAt(0) || profile.username.charAt(0).toUpperCase()}
                </Center>
                <Box>
                  <Heading size="3xl" color="brand.900" dir="ltr" textAlign="left" letterSpacing="-0.05em">
                    {fullName || profile.username}
                  </Heading>
                  <Text color="neon.cyan" fontSize="xl" fontWeight="bold" dir="ltr" textAlign="left">
                    @{profile.username}
                  </Text>
                </Box>
              </Flex>

              <Box mb="10">
                <Heading size="xs" color="gray.400" textTransform="uppercase" letterSpacing="widest" mb="4">תקציר פרופיל</Heading>
                <Text fontSize="lg" color="gray.700" dir="ltr" textAlign="left" lineHeight="1.8">
                  {profile.summary}
                </Text>
              </Box>

              <HStack gap="3" flexWrap="wrap" dir="ltr">
                <Badge bg="brand.500" color="white" px="5" py="2" borderRadius="full" fontSize="md" fontWeight="black">
                  Repos: {profile.totalPublicRepos}
                </Badge>
                {profile.topLanguages.map((lang) => (
                  <Badge key={lang} colorScheme={getLanguageColor(lang)} variant="subtle" px="5" py="2" borderRadius="full" fontSize="sm" fontWeight="bold">
                    {lang}
                  </Badge>
                ))}
              </HStack>
            </Box>

            <Box>
              <Heading size="lg" color="brand.900" mb="8" letterSpacing="-0.03em">פרויקטים אחרונים</Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap="6" dir="ltr">
                {profile.recentProjects.map((repo, index) => (
                  <MotionBox
                    key={repo.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                    bg="white"
                    p="8"
                    borderRadius="24px"
                    borderWidth="1px"
                    borderColor="gray.50"
                    shadow="sm"
                  >
                    <Heading size="md" color="brand.500" mb="3" fontWeight="bold">{repo.name}</Heading>
                    <Text fontSize="sm" color="gray.600" mb="6" minH="40px">{repo.description || 'No description provided.'}</Text>
                    <Badge colorScheme={getLanguageColor(repo.language)} variant="outline" borderRadius="md" px="3">{repo.language}</Badge>
                  </MotionBox>
                ))}
              </SimpleGrid>
            </Box>
          </VStack>
        </MotionGridItem>


        <MotionGridItem
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
          position="sticky"
          top="120px"
        >
          <Box
            as="form"
            onSubmit={handleSubmit}
            bg="white"
            borderRadius="3xl"
            borderWidth="2px"
            borderColor="brand.500"
            p="10"
            shadow="2xl"
          >
            <VStack gap="8" align="stretch">
              <Heading size="xl" color="brand.900" letterSpacing="-0.04em">חוות דעת HR</Heading>

              <Box>
                <Text mb="3" fontWeight="bold" color="gray.700" fontSize="sm">שם מלא של המועמד</Text>
                <Input
                  placeholder="לדוגמה: חנה ארוני"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  size="lg"
                  borderRadius="xl"
                  bg="gray.50"
                  border="none"
                  _focus={{ bg: "white", shadow: "outline" }}
                />
              </Box>

              <Box>
                <Text mb="3" fontWeight="bold" color="gray.700" fontSize="sm">שנות ניסיון רלוונטי</Text>
                <Input
                  type="number"
                  min="0"
                  placeholder="מספר"
                  value={yearsOfExperience}
                  onChange={(e) => setYearsOfExperience(e.target.value === '' ? '' : Number(e.target.value))}
                  required
                  size="lg"
                  borderRadius="xl"
                  bg="gray.50"
                  border="none"
                  _focus={{ bg: "white", shadow: "outline" }}
                />
              </Box>

              <Box>
                <Text mb="3" fontWeight="bold" color="gray.700" fontSize="sm">סיכום ראיון ונקודות מפתח</Text>
                <Textarea
                  placeholder="תאר את ההתרשמות שלך מהמועמד..."
                  value={interviewNote}
                  onChange={(e) => setInterviewNote(e.target.value)}
                  required
                  rows={6}
                  borderRadius="xl"
                  bg="gray.50"
                  border="none"
                  _focus={{ bg: "white", shadow: "outline" }}
                />
              </Box>

              <Button
                type="submit"
                variant="glow"
                h="16"
                fontSize="lg"
                fontWeight="bold"
                loading={saveMutation.isPending}
                loadingText="שומר נתונים..."
              >
                שמור מועמד למאגר
              </Button>
            </VStack>
          </Box>
        </MotionGridItem>
      </Grid>
    </Container>
  );
}