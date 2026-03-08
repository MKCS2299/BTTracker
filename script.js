const calendar = document.getElementById("calendar")
const monthYear = document.getElementById("monthYear")
const emojiPicker = document.getElementById("emojiPicker")

let selectedDate=null
let currentDate=new Date()

function renderCalendar(){

calendar.innerHTML=""

const year=currentDate.getFullYear()
const month=currentDate.getMonth()

let firstDay=new Date(year,month,1).getDay()

firstDay = firstDay===0 ? 6 : firstDay-1

const daysInMonth=new Date(year,month+1,0).getDate()

monthYear.innerText=
currentDate.toLocaleString("default",{month:"long"})+" "+year

for(let i=0;i<firstDay;i++){

let empty=document.createElement("div")
calendar.appendChild(empty)

}

for(let day=1;day<=daysInMonth;day++){

let dayBox=document.createElement("div")
dayBox.className="day"

let key=`${year}-${month}-${day}`

let saved=localStorage.getItem(key)

let icon=""

if(saved==="happy"){
icon="<img src='fox-happy.png' class='dayIcon'>"
}

if(saved==="sad"){
icon="<img src='fox-cry.png' class='dayIcon'>"
}

if(saved==="major"){
icon="<img src='swing.png' class='dayIcon'>"
}

dayBox.innerHTML=`

<div class="date">${day}</div>
<div class="emoji">${icon}</div>

`

dayBox.onclick=()=>{

selectedDate=key
emojiPicker.style.display="block"

}

calendar.appendChild(dayBox)

}

}

document.querySelectorAll("#emojiPicker img, .clearBtn").forEach(icon=>{

icon.onclick=()=>{

let value=icon.dataset.emoji

if(value==="clear"){
localStorage.removeItem(selectedDate)
}else{
localStorage.setItem(selectedDate,value)
}

emojiPicker.style.display="none"

renderCalendar()

}

})

document.getElementById("prevMonth").onclick=()=>{

currentDate.setMonth(currentDate.getMonth()-1)
renderCalendar()

}

document.getElementById("nextMonth").onclick=()=>{

currentDate.setMonth(currentDate.getMonth()+1)
renderCalendar()

}

renderCalendar()
