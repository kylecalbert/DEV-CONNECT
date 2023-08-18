// AvailabilityPage.tsx

import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from '@mui/material';
import { useAuthentication } from './AuthUtils';
import { saveUserAvailability, fetchUserAvailability } from './FirebaseUtils';
import { useNavigate } from 'react-router-dom';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const hours = ['9', '10', '11', '12', '13', '14', '15', '16']; // 9 AM to 4 PM
const minutes = ['00', '15', '30', '45'];
const durations = ['5', '10', '15', '20', '25', '30']; // Available durations in minutes

const AvailabilityPage = () => {
  const [selectedDay, setSelectedDay] = useState<string>(daysOfWeek[0]);
  const [selectedHour, setSelectedHour] = useState<string>(hours[0]);
  const [selectedMinute, setSelectedMinute] = useState<string>(minutes[0]);
  const [selectedDuration, setSelectedDuration] = useState<string>(
    durations[0]
  );
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);

  const { user } = useAuthentication();
  const navigate = useNavigate();

  // if the user is logged in, then fetch their availability...
  useEffect(() => {
    const fetchAvailability = async () => {
      if (user && user.uid) {
        try {
          const availability = await fetchUserAvailability(user.uid); //
          setSelectedTimeSlots(availability);
        } catch (error) {
          console.error('Error fetching availability:', error);
        }
      }
    };

    fetchAvailability();
  }, [user]);

  const handleAddTimeSlot = () => {
    const timeSlot = `${selectedDay} ${selectedHour}:${selectedMinute} (${selectedDuration} min)`;
    const isExistingSlot = selectedTimeSlots.some((slot) => slot === timeSlot);

    if (isExistingSlot) {
      alert('This time slot already exists. Please choose a different one.');
      return;
    }

    setSelectedTimeSlots((prevSelected) => [...prevSelected, timeSlot]);
  };

  const handleRemoveTimeSlot = (timeSlot: string) => {
    setSelectedTimeSlots((prevSelected) =>
      prevSelected.filter((slot) => slot !== timeSlot)
    );
  };

  const handleSaveAvailability = async () => {
    if (user && user.uid) {
      try {
        await saveUserAvailability(user.uid, selectedTimeSlots);
        alert('Availability saved successfully!');
      } catch (error) {
        console.error('Error saving availability:', error);
        alert('An error occurred while saving availability.');
      }
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h4" align="center">
          Set Your Availability
        </Typography>
        <FormControl fullWidth style={{ marginTop: '10px', padding: '8px' }}>
          <InputLabel id="day-label">Select Day</InputLabel>
          <Select
            inputProps={{ 'data-testid': 'day-input' }}
            labelId="day-label"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            {daysOfWeek.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth style={{ marginTop: '10px', padding: '8px' }}>
          <InputLabel id="hour-label">Select Hour</InputLabel>
          <Select
            labelId="hour-label"
            inputProps={{ 'data-testid': 'hour-input' }}
            value={selectedHour}
            onChange={(e) => {
              setSelectedHour(e.target.value);
            }}
          >
            {hours.map((hour) => (
              <MenuItem key={hour} value={hour}>
                {hour}: 00
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth style={{ marginTop: '10px', padding: '8px' }}>
          <InputLabel id="minutes-label">Select Minutes</InputLabel>
          <Select
            labelId="minutes-label"
            inputProps={{ 'data-testid': 'minute-input' }}
            value={selectedMinute}
            onChange={(e) => setSelectedMinute(e.target.value)}
          >
            {minutes.map((minute) => (
              <MenuItem key={minute} value={minute}>
                {minute}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth style={{ marginTop: '10px', padding: '8px' }}>
          <InputLabel id="duration-label">Select Duration</InputLabel>
          <Select
            labelId="duration-label"
            inputProps={{ 'data-testid': 'duration-input' }}
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.target.value)}
          >
            {durations.map((duration) => (
              <MenuItem key={duration} value={duration}>
                {duration} min
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '20px' }}
          onClick={handleAddTimeSlot}
          data-testid="add-timeslot"
        >
          Add Time Slot
        </Button>

        <div style={{ marginTop: '20px' }}>
          {selectedTimeSlots.map((timeSlot) => (
            <div key={timeSlot} style={{ marginBottom: '10px' }}>
              {timeSlot}
              <Button
                color="secondary"
                size="small"
                onClick={() => handleRemoveTimeSlot(timeSlot)}
                data-testid="remove-timeslot"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '20px' }}
          onClick={handleSaveAvailability}
        >
          Save Availability
        </Button>
      </Container>
    </div>
  );
};

export default AvailabilityPage;
