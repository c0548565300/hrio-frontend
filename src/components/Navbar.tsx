import { Box, Flex, Button, Text, Container, HStack } from '@chakra-ui/react';
import { useNavigate, Link as RouterLink } from 'react-router-dom'; // נשנה את השם כדי למנוע בלבול
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

export default function Navbar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  if (!currentUser) return null;

  return (
    <Box position="fixed" top="6" left="0" right="0" zIndex="100" px="6">
      <MotionBox
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        bg="glassBg"
        backdropBlur="xl"
        borderRadius="24px"
        borderWidth="1px"
        borderColor="glassBorder"
        shadow="0 8px 32px 0 rgba(31, 38, 135, 0.08)"
        maxW="6xl"
        mx="auto"
      >
        <Container maxW="6xl">
          <Flex h="16" alignItems="center" justify="space-between">
            
            <RouterLink to="/" style={{ textDecoration: 'none' }}>
              <Text 
                fontSize="2xl" 
                fontWeight="black" 
                color="brand.900"
                letterSpacing="-0.04em"
              >
                HR<Box as="span" color="neon.cyan">.</Box>io
              </Text>
            </RouterLink>
            
            <HStack gap="6">
              <Text fontSize="sm" color="gray.600" fontWeight="semibold" hideBelow="sm">
                {currentUser.email}
              </Text>
              <Button 
                variant="glow" 
                size="sm" 
                onClick={handleLogout}
              >
                התנתק
              </Button>
            </HStack>
          </Flex>
        </Container>
      </MotionBox>
    </Box>
  );
}