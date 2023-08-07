import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import AvailabilityPage from './AvailabilityPage';

const renderAvailabilityPage = () => {
  return render(<AvailabilityPage />);
};
