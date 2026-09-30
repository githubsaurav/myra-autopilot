import { test } from 'node:test';
import assert from 'node:assert/strict';
import { answerTravelQuestion, chooseLocalExperience } from '../src/lib/travelAssistant.ts';
import type { DemoTrip, TravellerProfile, ContextualOption } from '../src/types/demo.ts';

const trip: DemoTrip = {
  id: 'demo', destination: 'Majuli', startDate: '8 Nov', endDate: '12 Nov', totalDays: 5, dayNumber: 3,
  travellers: 1, bookingId: 'DEMO', flightPnr: 'DEMO', hotelConfirmation: 'DEMO',
  bookings: [{id:'b1', type:'hotel', title:'Village homestay', meta:'',date:'8 Nov',status:'confirmed', amount:3000,refundable:true}, {id:'b2',type:'activity',title:'Old tour',meta:'',date:'8 Nov',status:'cancelled',amount:9000,refundable:true}],
  itinerary: [{id:'free',day:3,time:'10:00',title:'Free morning',status:'planned',category:'free'},{id:'tomorrow',day:4,time:'09:00',title:'Village walk',status:'planned'}],
  liveContext:{city:'Majuli',currentTime:'09:40',weather:'24°C, hazy',fatigueLevel:'low',freeTimeMinutes:360,locationPermission:true},
};
const traveller: TravellerProfile = {id:'u',displayName:'Aarav',travelPace:'relaxed',foodPreferences:['Vegetarian'],companionNeeds:[],interests:[],budgetPreference:'Mid-range',autonomyMode:'approval',spendLimit:5000,refundableOnly:true,memoryEnabled:true};
const activity: ContextualOption = {id:'craft',title:'Craft workshop',distanceMin:10,durationHrs:2,walking:'low',cost:500,availableNow:true,why:'Local culture'};

test('adds an experience to today’s free slot, preserving other days', () => {
 const updated = chooseLocalExperience(trip, activity);
 assert.equal(updated.itinerary.length, 2);
 assert.equal(updated.itinerary[0].title, 'Craft workshop');
 assert.equal(updated.itinerary[0].time, '10:00');
 assert.equal(updated.itinerary[0].status, 'new');
 assert.deepEqual(updated.itinerary[1], trip.itinerary[1]);
 assert.equal(trip.itinerary[0].title, 'Free morning');
});
test('repeat selection is idempotent and a replacement does not duplicate the slot', () => {
 const first = chooseLocalExperience(trip, activity);
 assert.equal(chooseLocalExperience(first, activity), first);
 const second = chooseLocalExperience(first, {...activity, id:'food', title:'Home-style lunch'});
 assert.equal(second.itinerary.filter(i=>i.category==='myra-local').length, 1);
 assert.equal(second.itinerary[0].title, 'Home-style lunch');
});
test('unavailable experiences or missing free slots do not mutate itinerary', () => {
 assert.equal(chooseLocalExperience(trip, {...activity,availableNow:false}),trip);
 const busy = {...trip,itinerary:trip.itinerary.slice(1)};
 assert.equal(chooseLocalExperience(busy,activity),busy);
});
test('today answer reflects chosen experience and excludes tomorrow', () => {
 const answer=answerTravelQuestion('What is my itinerary today?',chooseLocalExperience(trip,activity),traveller)!;
 assert.match(answer,/Craft workshop/); assert.doesNotMatch(answer,/Village walk/);
});
test('budget answer excludes cancelled bookings and uses actual user limit', () => {
 const answer=answerTravelQuestion('What is my budget?',trip,traveller)!;
 assert.match(answer,/₹3,000/); assert.match(answer,/₹5,000/); assert.doesNotMatch(answer,/₹12,000/);
});
test('handles no trip, Hindi, live-data limits, and unsupported input honestly', () => {
 assert.match(answerTravelQuestion('Show my bookings',null,traveller)!,/No bookings/);
 assert.match(answerTravelQuestion('आज का प्लान',trip,traveller)!,/आज का प्लान/);
 assert.match(answerTravelQuestion('weather',trip,traveller)!,/not a live forecast/);
 assert.equal(answerTravelQuestion('tell me a joke',trip,traveller),null);
});
