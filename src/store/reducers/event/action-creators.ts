import {IUser} from "../../../models/IUser";
import {EventActionEnum, SetEventAction, SetGuestAction} from "./types";
import {IEvent} from "../../../models/IEvent";
import {Dispatch} from "redux";
import axios from "axios";

export const EventActionCreators = {
    setGuests: (payload: IUser[]): SetGuestAction=>({type: EventActionEnum.SET_GUESTS, payload}),
    setEvents: (payload: IEvent[]): SetEventAction=>({type: EventActionEnum.SET_EVENTS, payload}),
    fetchGuests: () => async (dispatch: Dispatch)=> {
        try {
            const response = await axios.get<IUser[]>('./user.json')
            dispatch(EventActionCreators.setGuests(response.data))

        }catch (e) {
            console.log(e)
        }
    },
    createEvent: (event: IEvent) => async (dispatch: Dispatch)=> {
        try{
            const events = localStorage.getItem('events') || '[]'
            const json = JSON.parse(events) as IEvent[]
            json.push(event)
            dispatch(EventActionCreators.setEvents(json))
            localStorage.setItem('events', JSON.stringify(json))
        }catch (e) {
            console.log(e)
        }
    },
    fetchEvents: (userName: string) => async (dispatch: Dispatch)=> {
        try {
            const events = localStorage.getItem('events') || '[]'
            const json = JSON.parse(events) as IEvent[]
            const currentUserEvent = json.filter(ev => ev.author === userName || ev.guest === userName)
            dispatch(EventActionCreators.setEvents(currentUserEvent))
        }catch (e) {
            console.log(e)
        }
    },
}