import React, {FC} from 'react';
import {Calendar} from "antd";
import {IEvent} from "../models/IEvent";
import {Moment} from "moment";
import {formData} from "../utils/date";

interface EventCalendarProps{
    events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = (props) => {
    const dateCellRender = (value: Moment) => {
        const formedData = formData(value.toDate())
        const currentDayEvent = props.events.filter(ev => ev.date === formedData )
        return (
            <div>
                {currentDayEvent.map((ev, index) =>
                    <div key={index}>{ev.guest}: {ev.description}</div>
                )}
            </div>
        );
    };
    return (
        <div>
              <Calendar
                  dateCellRender={dateCellRender}
              />
        </div>
    );
};

export default EventCalendar;
