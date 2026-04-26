import React, { createContext, useContext, useEffect, useState } from 'react';
import {type User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Center, Spinner } from '@chakra-ui/react';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ currentUser: null, loading: true });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <Center h="100vh" bg="gray.50">
        <Spinner size="xl" color="brand.500" borderWidth="4px" />
      </Center>
    );
  }

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};