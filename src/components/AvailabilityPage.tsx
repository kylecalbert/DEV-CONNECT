import React, { useState } from 'react';
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
import { saveUserAvailability } from './FirebaseUtils';
import { useNavigate } from 'react-router-dom';
import { useAvailability } from './context/AvailabilityContext';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const hours = [9, 10, 11, 12, 13, 14, 15, 16]; // 9 AM to 4 PM
const minutes = ['00', '15', '30', '45'];
const durations = [5, 10, 15, 20, 25, 30]; // Available durations in minutes

const AvailabilityPage = () => {
  const [selectedDay, setSelectedDay] = useState<string>(daysOfWeek[0]);
  const [selectedHour, setSelectedHour] = useState<number>(hours[0]);
  const [selectedMinute, setSelectedMinute] = useState<string>(minutes[0]);
  const [selectedDuration, setSelectedDuration] = useState<number>(
    durations[0]
  );

  const { selectedTimeSlots, setSelectedTimeSlots } = useAvailability();

  const { user } = useAuthentication();
  const navigate = useNavigate();

  //handle add
  const handleAddTimeSlot = () => {
    console.log('i am here');
    const timeSlot = `${selectedDay} ${selectedHour}:${selectedMinute} (${selectedDuration} min)`;
    console.log(timeSlot);

    // Check if the time slot already exists in selectedTimeSlots
    const isExistingSlot = selectedTimeSlots.some((slot) => slot === timeSlot);

    if (isExistingSlot) {
      // Handle the case where the time slot already exists
      alert('This time slot already exists. Please choose a different one.');
      return;
    }

    setSelectedTimeSlots((prevSelected) => [...prevSelected, timeSlot]);
    console.log(selectedTimeSlots);
  };

  const handleRemoveTimeSlot = (timeSlot: string) => {
    setSelectedTimeSlots((prevSelected) =>
      prevSelected.filter((slot) => slot !== timeSlot)
    );
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
            value={selectedHour}
            onChange={(e) => setSelectedHour(Number(e.target.value))}
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
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(Number(e.target.value))}
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
          onClick={handleAddTimeSlot}
          fullWidth
          style={{ marginTop: '20px' }}
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
        >
          Save Availability
        </Button>
      </Container>
    </div>
  );
};

export default AvailabilityPage;
