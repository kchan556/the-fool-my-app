'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

export const AuthContext = createContext<any>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, isLoading: false }}>
      {children}
    </AuthContext.Provider>
  );
};