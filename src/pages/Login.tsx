import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Box, Button, Input, VStack, Heading, Text, Container, Center } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion.create(Box);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError('פרטי ההתחברות אינם נכונים');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box 
      minH="100vh" 
      display="flex"
      alignItems="center"
      background="radial-gradient(at 0% 0%, {colors.brand.100} 0px, transparent 50%), radial-gradient(at 100% 100%, {colors.neon.cyan} 0px, transparent 50%)"
    >
      <Container maxW="md">
        <Box
          p="1px"
          borderRadius="3xl"
          background="linear-gradient(135deg, {colors.brand.500} 0%, {colors.neon.cyan} 100%)"
        >
          <MotionBox
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            bg="white"
            backdropBlur="xl"
            borderRadius="3xl"
            p="10"
            shadow="2xl"
          >
            <VStack as="form" onSubmit={handleLogin} gap="8">
              <VStack gap="2" textAlign="center">
                <Heading 
                  size="3xl" 
                  fontWeight="black" 
                  letterSpacing="-0.06em"
                  color="brand.600"
                >
                  התחברות
                </Heading>
                <Text color="gray.500" fontWeight="medium">
                  מערכת ניהול מועמדים <Text as="span" color="brand.500" fontWeight="bold">HR.io</Text>
                </Text>
              </VStack>

              {error && (
                <Center p="3" bg="red.50" color="red.600" borderRadius="lg" w="full" fontSize="sm" fontWeight="bold">
                  {error}
                </Center>
              )}

              <VStack gap="4" w="full">
                <Input
                  placeholder="אימייל"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="lg"
                  borderRadius="xl"
                  bg="gray.50"
                  px="4"
                  dir="ltr"
                />
                <Input
                  placeholder="סיסמה"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  size="lg"
                  borderRadius="xl"
                  bg="gray.50"
                  px="4"
                  dir="ltr"
                />
              </VStack>

              <Button
                type="submit"
                variant="glow"
                w="full"
                h="14"
                loading={isLoading}
              >
                כניסה למערכת
              </Button>
            </VStack>
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
}