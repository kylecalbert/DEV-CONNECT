import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const hours = Array.from({ length: 8 }, (_, index) => index + 9); // 9 AM to 4 PM
const minutes = ['00', '15', '30', '45'];

const durations = [5, 10, 15, 20, 25, 30]; // Available durations in minutes

const AvailabilityPage = () => {
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>(daysOfWeek[0]);
  const [selectedHour, setSelectedHour] = useState<number>(hours[0]);
  const [selectedMinute, setSelectedMinute] = useState<string>(minutes[0]);
  const [selectedDuration, setSelectedDuration] = useState<number>(durations[0]);

  const handleAddTimeSlot = () => {
    const timeSlot = `${selectedDay} ${selectedHour}:${selectedMinute} (${selectedDuration} min)`;

    // Check if there is an existing time slot with the same hour
    const existingTimeSlotIndex = selectedTimeSlots.findIndex(
      (slot) => slot.startsWith(`${selectedDay} ${selectedHour}:`)
    );

    if (existingTimeSlotIndex !== -1) {
      // Overwrite the existing time slot with the new one
      const updatedTimeSlots = [...selectedTimeSlots];
      updatedTimeSlots[existingTimeSlotIndex] = timeSlot;
      setSelectedTimeSlots(updatedTimeSlots);
    } else {
      // Add the new time slot to the list
      setSelectedTimeSlots((prevSelected) => [...prevSelected, timeSlot]);
    }
  };

  const handleRemoveTimeSlot = (timeSlot: string) => {
    setSelectedTimeSlots((prevSelected) => prevSelected.filter((slot) => slot !== timeSlot));
  };

  const handleSaveAvailability = () => {
    // Save availability to the database (Firebase or local storage)
    console.log('Selected Time Slots:', selectedTimeSlots);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Set Your Availability
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="day-label">Select Day</InputLabel>
        <Select
          labelId="day-label"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value as string)}
        >
          {daysOfWeek.map((day) => (
            <MenuItem key={day} value={day}>
              {day}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="hour-label">Select Hour</InputLabel>
        <Select
          labelId="hour-label"
          value={selectedHour}
          onChange={(e) => setSelectedHour(Number(e.target.value))}
        >
          {hours.map((hour) => (
            <MenuItem key={hour} value={hour}>
              {hour}:00
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="minute-label">Select Minute</InputLabel>
        <Select
          labelId="minute-label"
          value={selectedMinute}
          onChange={(e) => setSelectedMinute(e.target.value as string)}
        >
          {minutes.map((minute) => (
            <MenuItem key={minute} value={minute}>
              {minute}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
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
        onClick={handleSaveAvailability}
        fullWidth
        style={{ marginTop: '20px' }}
      >
        Save Availability
      </Button>
    </Container>
  );
};

export default AvailabilityPage;
