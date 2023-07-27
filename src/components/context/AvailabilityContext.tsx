import { createContext, useContext, useState, ReactNode } from 'react';

interface AvailabilityContextType {
  selectedTimeSlots: string[];
  setSelectedTimeSlots: React.Dispatch<React.SetStateAction<string[]>>;
}

const AvailabilityContext = createContext<AvailabilityContextType>({
  selectedTimeSlots: [],
  setSelectedTimeSlots: () => {},
});

export function useAvailability() {
  const context = useContext(AvailabilityContext);
  if (!context) {
    throw new Error(
      'useAvailability must be used within an AvailabilityProvider'
    );
  }
  return context;
}

interface AvailabilityProviderProps {
  children: ReactNode;
}

export function AvailabilityProvider({ children }: AvailabilityProviderProps) {
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);

  return (
    <AvailabilityContext.Provider
      value={{
        selectedTimeSlots,
        setSelectedTimeSlots,
      }}
    >
      {children}
    </AvailabilityContext.Provider>
  );
}
