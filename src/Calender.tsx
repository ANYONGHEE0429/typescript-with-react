import React, { useState } from 'react';
import { format, startOfMonth, startOfWeek, addDays, startOfDay, isSameMonth, isSameDay } from 'date-fns';

interface CalendarProps {
   currentDate: Date;
   onSelectDate: (date: Date) => void;
}

const Calendar = ({ currentDate, onSelectDate }: CalendarProps) => {
   const [selectedDate, setSelectedDate] = useState<Date | null>(null);

   const renderCalendar = () => {
      const monthStart = startOfMonth(currentDate);
      const monthEnd = addDays(startOfMonth(currentDate), 41); // 6 weeks
      const startDate = startOfWeek(monthStart);

      const calendar = [];

      let currentDay = startDate;

      while (currentDay <= monthEnd) {
         calendar.push(
            <div
               key={currentDay.toString()}
               className={`calendar-day ${!isSameMonth(currentDay, monthStart) ? 'outside-month' : ''} ${
                  selectedDate && isSameDay(currentDay, selectedDate) ? 'selected' : ''
               }`}
               onClick={() => handleDateClick(currentDay)}>
               {format(currentDay, 'd')}
            </div>,
         );

         currentDay = addDays(currentDay, 1);
      }

      return calendar;
   };

   const handleDateClick = (date: Date) => {
      setSelectedDate(date);
      onSelectDate(date);
   };

   return (
      <div className="calendar">
         <div className="calendar-header">{format(currentDate, 'MMMM yyyy')}</div>
         <div className="calendar-grid">{renderCalendar()}</div>
      </div>
   );
};

export default Calendar;
