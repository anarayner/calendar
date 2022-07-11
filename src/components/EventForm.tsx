import React, {FC, useState} from 'react';
import {Button, DatePicker, Form, Input, Select} from "antd";
import {rules} from "../utils/rules";
import {IUser} from "../models/IUser";
import {IEvent} from "../models/IEvent";
import moment, {Moment} from "moment";
import {formData} from "../utils/date";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {RangePickerProps} from "antd/es/date-picker";

interface EventFormProps{
   guests: IUser[],
   submit: (event: IEvent)=>void
}
const EventForm: FC<EventFormProps>= (props) => {
    const {user} = useTypedSelector(state => state.AuthReducer)


    const [event, setEvent] = useState({
        author: '',
        date: '',
        description: '',
        guest: ''
    } as IEvent)

    const selectDate = (date: Moment | null) =>{
        if(date){
            setEvent({...event, date: formData(date.toDate())})
        }
    }

    const submit =()=>{
       props.submit({...event, author: user.username})
    }

    const disabledDate: RangePickerProps['disabledDate']  = (current) =>{
        return current && current < moment().endOf('day');

    }

    return (

        <Form
            onFinish={submit}
        >

            <Form.Item
                label="Event Description"
                name="description"
                rules={[rules.required('Please add description!')]}
            >
                <Input value={event.description}
                       onChange={e => setEvent({...event, description: e.target.value})}
                />
            </Form.Item>

            <Form.Item
                label="Date"
                name="date"
                rules={[rules.required('Please add date!')]}
            >
                <DatePicker
                    onChange={selectDate}
                    disabledDate={disabledDate}
                />
            </Form.Item>
            <Form.Item
                label="Choose guest"
                name="guest"
                rules={[rules.required('Please add date!')]}
            >
                <Select onChange={(guest: string) => setEvent({...event, guest})}>
                    {props.guests.map(guest =>
                        <Select.Option key={guest.username} value={guest.username}>{guest.username}</Select.Option>
                    )}


                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EventForm;
