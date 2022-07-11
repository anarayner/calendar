import React, {FC, useEffect, useState} from 'react';
import EventCalendar from "../components/EventCalendar";
import {Button, Layout, Modal, Row} from "antd";
import EventForm from "../components/EventForm";
import {useEventActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IEvent} from "../models/IEvent";


const Event: FC = () => {
    const { guests, events} = useTypedSelector(state => state.EventReducer)
    const { user} = useTypedSelector(state => state.AuthReducer)

    const [isModalVisible, setIsModalVisible] = useState(false)
    const { fetchGuests, createEvent, fetchEvents} = useEventActions()
    useEffect(() => {
        fetchGuests()
        fetchEvents(user.username)
    }, []);

    const addNewEvent = (event: IEvent)=>{
        createEvent(event)
        setIsModalVisible(false)

    }
    const showModal =()=>{
        setIsModalVisible(true)
    }
    return (
        <Layout>
            <Row justify='center' onClick={showModal}>
                <Button style={{margin: 20}}>Add event</Button>
            </Row>
            <Modal
                title='Add event'
                visible={isModalVisible} footer={null}
                onCancel={()=> setIsModalVisible(false)}
            >
                <EventForm guests={guests} submit={addNewEvent}/>

            </Modal>
            <EventCalendar events={events}/>
        </Layout>
    );
};

export default Event;