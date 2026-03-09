import { Component, OnInit } from '@angular/core';
import { CompanyEventsService } from '../../company-events/company-events.service';
interface CalendarItem{
  date:string
  type:string
  title:string
}
@Component({
  selector: 'app-my-calendar',
  standalone: false,
  templateUrl: './my-calendar.component.html',
  styleUrl: './my-calendar.component.css'
})
export class MyCalendarComponent {
today=new Date()
currentMonth=this.today.getMonth()
currentYear=this.today.getFullYear()

weekDays=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

monthNames=[
'January','February','March','April','May','June',
'July','August','September','October','November','December'
]

selectedEvent:any=null

items:CalendarItem[]=[]

/* Legend toggles */

showAssets=true
showExpenses=true
showCompanyNews=true
showPolicies=true
showHelpdesk=true
showPerformance=true
showLeaves=true
showTimesheet=true
showProfile=true
showBirthdays=true
showAnniversary=true

constructor(private calendarService:CompanyEventsService){}

ngOnInit(){

const userId=Number(sessionStorage.getItem("UserId"))

this.loadCalendar(userId)

}

loadCalendar(userId:number){

this.calendarService.getMyCalendar(userId).subscribe((res:any)=>{

this.items=res.map((x:any)=>({

date:new Date(x.date).toISOString().split('T')[0],
type:x.type,
title:x.title

}))

})

}

/* Month Navigation */

previousMonth(){

if(this.currentMonth===0){
this.currentMonth=11
this.currentYear--
}else{
this.currentMonth--
}

}

nextMonth(){

if(this.currentMonth===11){
this.currentMonth=0
this.currentYear++
}else{
this.currentMonth++
}

}

/* Calendar Days */

getCalendarDays(){

const firstDay=new Date(this.currentYear,this.currentMonth,1)
const lastDay=new Date(this.currentYear,this.currentMonth+1,0)

const days:any=[]

const startDay=firstDay.getDay()

for(let i=0;i<startDay;i++){
days.push(null)
}

for(let i=1;i<=lastDay.getDate();i++){
days.push(new Date(this.currentYear,this.currentMonth,i))
}

return days

}

/* Event Filter */

getItemsForDate(date:any){

if(!date) return []

const formatted=date.toISOString().split('T')[0]

return this.items.filter(item=>{

const matchDate=item.date===formatted

const matchType=

(item.type==='asset' && this.showAssets) ||
(item.type==='expense' && this.showExpenses) ||
(item.type==='companyNews' && this.showCompanyNews) ||
(item.type==='policy' && this.showPolicies) ||
(item.type==='helpdesk' && this.showHelpdesk) ||
(item.type==='performance' && this.showPerformance) ||
(item.type==='leave' && this.showLeaves) ||
(item.type==='timesheet' && this.showTimesheet) ||
(item.type==='profile' && this.showProfile) ||
(item.type==='birthday' && this.showBirthdays) ||
(item.type==='workAnniversary' && this.showAnniversary)

return matchDate && matchType

})

}

/* Weekend Check */

isWeekend(date:any){

if(!date) return false

const day = date.getDay()

return day === 0 || day === 6

}

/* Today Highlight */

isToday(date:any){

if(!date) return false

return date.toDateString()===new Date().toDateString()

}

/* Popup */

openEvent(item:any){
this.selectedEvent=item
}

closePopup(){
this.selectedEvent=null
}
}
