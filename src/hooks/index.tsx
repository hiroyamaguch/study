import React, { ReactNode } from 'react';

import { AuthProvider } from './auth';

interface IAppProvider {
  children: ReactNode;
}

const AppProvider: React.FC<IAppProvider> = ({ children }) => (
  <AuthProvider>
    {children}
  </AuthProvider>
);

export default AppProvider;