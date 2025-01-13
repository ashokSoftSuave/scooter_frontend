"use client"

import React, { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"


import clsx from "clsx"
import { Popover, PopoverContent, PopoverTrigger } from "./Popover"
import { Button } from "./Button"
import { DayPicker } from "react-day-picker"
import "react-day-picker/style.css";


export function DatePicker() {
  const [date, setDate] = useState()

  return (
    <Popover side="bottom">
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={clsx(
            "w-[280px] justify-start text-left font-normal ",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white">
      <DayPicker
      mode="single"
      selected={date}
      onSelect={setDate}
   
    />
      </PopoverContent>
    </Popover>
  )
}
export default DatePicker;