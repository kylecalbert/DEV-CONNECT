import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import AvailabilityPage from './AvailabilityPage';
import { MemoryRouter } from 'react-router-dom';

const renderAvailabilityPage = () => {
  return render(
    <MemoryRouter>
      <AvailabilityPage />
    </MemoryRouter>
  );
};

describe('AvailabilityPage', () => {
  it('should render the Availabiltiy page correctly', () => {
    renderAvailabilityPage();
    expect(screen.getByText('Set Your Availability')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Day')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Hour')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Minutes')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Duration')).toBeInTheDocument();

    // Checking the initial values of the input fields
    expect(screen.getByLabelText('Select Day')).toHaveTextContent('Monday');
    expect(screen.getByLabelText('Select Hour')).toHaveTextContent('9');
    expect(screen.getByLabelText('Select Minutes')).toHaveTextContent('00');
    expect(screen.getByLabelText('Select Duration')).toHaveTextContent('5 min');
  });

  // Check if the selectedDay state has been updated correctly
  it('should update Selected Day when a day is selected', () => {
    renderAvailabilityPage();
    const selectDayDropdown = screen.getByTestId('day-input');
    fireEvent.change(selectDayDropdown, { target: { value: 'Wednesday' } });
    expect(screen.getByTestId('day-input')).toHaveValue('Wednesday');
  });

  // Check if the selected Minute state has been updated correctly

  it('should update Selected Minute when a miute is selected', () => {
    renderAvailabilityPage();
    const selectDayDropdown = screen.getByTestId('minute-input');
    fireEvent.change(selectDayDropdown, { target: { value: '15' } });
    expect(screen.getByTestId('minute-input')).toHaveValue('15');
  });

  // Check if the selectedHour state has been updated correctly
  it('should update Selected Hour when a Hour is selected', () => {
    renderAvailabilityPage();
    const selectDayDropdown = screen.getByTestId('hour-input');
    fireEvent.change(selectDayDropdown, { target: { value: '11' } });
    expect(screen.getByTestId('hour-input')).toHaveValue('11');
  });

  // Check if the selectedHour state has been updated correctly
  it('should update Selected Duration when a Duration is selected', () => {
    renderAvailabilityPage();
    const selectDayDropdown = screen.getByTestId('duration-input');
    fireEvent.change(selectDayDropdown, { target: { value: '25' } });
    expect(screen.getByTestId('duration-input')).toHaveValue('25');
  });

  //Testing the add  timeslot functionality

  it('should add the availability when the user clicks add timeslot button', () => {
    renderAvailabilityPage();
    const selectDayDropdown = screen.getByTestId('day-input');
    const selectHourDropdown = screen.getByTestId('hour-input');
    const selectMinuteDropdown = screen.getByTestId('minute-input');
    const selectDurationDropdown = screen.getByTestId('duration-input');

    fireEvent.change(selectDayDropdown, { target: { value: 'Monday' } });
    fireEvent.change(selectHourDropdown, { target: { value: '11' } });
    fireEvent.change(selectMinuteDropdown, { target: { value: '15' } });
    fireEvent.change(selectDurationDropdown, { target: { value: '25' } });

    const addButton = screen.getByTestId('add-timeslot');

    fireEvent.click(addButton);
    const newTimeSlot = 'Monday 11:15 (25 min)';
    expect(screen.getByText(newTimeSlot)).toBeInTheDocument();
  });
});

it('should remove the availability when the user clicks remove button', () => {
  renderAvailabilityPage();

  const selectDayDropdown = screen.getByTestId('day-input');
  const selectHourDropdown = screen.getByTestId('hour-input');
  const selectMinuteDropdown = screen.getByTestId('minute-input');
  const selectDurationDropdown = screen.getByTestId('duration-input');

  fireEvent.change(selectDayDropdown, { target: { value: 'Monday' } });
  fireEvent.change(selectHourDropdown, { target: { value: '11' } });
  fireEvent.change(selectMinuteDropdown, { target: { value: '15' } });
  fireEvent.change(selectDurationDropdown, { target: { value: '25' } });

  const addButton = screen.getByTestId('add-timeslot');

  fireEvent.click(addButton);
  const addedTimeSlot = 'Monday 11:15 (25 min)';
  expect(screen.getByText(addedTimeSlot)).toBeInTheDocument();

  const removeButton = screen.getByTestId('remove-timeslot');
  fireEvent.click(removeButton);

  expect(screen.queryByText(addedTimeSlot)).toBeNull();
});
