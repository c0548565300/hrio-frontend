import React, { useState } from 'react';
import { Box, Button, Input, VStack, Heading, Text, Container } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion.create(Box);

export default function Home() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      navigate(`/candidate/${username.trim()}`);
    }
  };

  return (
    <Container maxW="2xl" py={{ base: 10, md: 20 }}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        textAlign="center"
      >
        <VStack gap={10}>
          <Box>
            <Heading size="2xl" color="brand.900" mb={4} fontWeight="black">
              איתור מועמדים
            </Heading>
            <Text color="gray.500" fontSize="lg">
              הזן שם משתמש מגיטהאב כדי לנתח את הפרופיל ולהוסיף חוות דעת מקצועית.
            </Text>
          </Box>

          <Box 
            as="form" 
            onSubmit={handleSearch} 
            w="full" 
            bg="white" 
            p={8} 
            borderRadius="2xl" 
            boxShadow="xl"
            border="1px solid"
            borderColor="gray.100"
          >
            <VStack gap={6}>
              <Input
                placeholder="לדוגמה: defunkt"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                bg="gray.50"
                borderRadius="lg"
                px={4}
                h={14}
                fontSize="lg"
                textAlign="left"
                dir="ltr"
                _focus={{ bg: 'white', borderColor: 'brand.500', boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)' }}
              />
              <Button
                type="submit"
                w="full"
                h={14}
                bg="brand.500"
                color="white"
                fontSize="lg"
                fontWeight="bold"
                borderRadius="lg"
                _hover={{ bg: 'brand.900', transform: 'translateY(-2px)', boxShadow: 'lg' }}
                _active={{ transform: 'translateY(0)' }}
                transition="all 0.2s"
              >
                חפש פרופיל
              </Button>
            </VStack>
          </Box>
        </VStack>
      </MotionBox>
    </Container>
  );
}