var html = "";
var start_day; // starts with 0
var selectedInit;
var selectedDate = null;

var selectedDateInit;
var selectedDateFinal;

var selected = false;
$(document).ready(function() {
    today = new Date("January 1, "+year);
    start_day = today.getDay() + 1;
    
    putYear(year);    
    year = year+1;
    putYear(year+1);
    
    showCalendar();
        
    $(".eventsCalendar-day a").click(function(e) {
        e.preventDefault();
        if($(this).parent().attr("data-date") == $(selectedInit).parent().attr("data-date")) {            
            selectedInit=null;
            selectedDate=null;
            unselectAll();
        } else {
            if(selectedDate) {
                selected = true;
                selectedFinal = $(this).parent().attr("data-date");
                
                $('#myModal').modal('show');
                $("#init").val(selectedDateInit);
                $("#final").val(selectedFinal);
            } else {
                selectedInit = $(this);
                select($(this));
            
                day = $(this).parent().attr("data-date"); 
                selectedDateInit = day;
                date = new Date(getYear(day), getMonth(day), getDay(day), 0, 0, 0, 0);  
                selectedDate = date;
                console.log(selectedDate);
            }
        }
    });
    
    $(".eventsCalendar-day a").mouseover(function() {
        if(selectedDate && !selected) {
            day = $(this).parent().attr("data-date");
            console.log("Selected over:" + day);
            date = new Date(getYear(day), getMonth(day), getDay(day), 0, 0, 0, 0);
            
            console.log(getYear(day) + "/" + getMonth(day) + "/" + getDay(day));
            if(isGreater(date, selectedDate)) {
            //                selectDates(selectedDate, date);
            } else {
                //                unselectAll();
                //                selectDates(selectedDate, date);
                day = $(selectedInit).parent().attr("data-date");  
                
            //                
            //                dateInit = new Date(getYear(day), getMonth(day), getDay(day), 0, 0, 0, 0); 
                
            }
        }
    });
    
    $("#next").click(function() {
        
        
    });
    
    $('#myModal').on('hidden', function () {
        unselectAll();
        reset();
    });
    }
);

function hideYear(year) {
    
}

function putYear(year) {
    fill_table("01",31)         
    if(isBisiesto(year)) {
        fill_table("02",29)
    } else {
        fill_table("02",28)
    }    
    fill_table("03",31)
    fill_table("04",30)
    fill_table("05",31)
    fill_table("06",30)
    fill_table("07",31)
    fill_table("08",31)
    fill_table("09",30)
    fill_table("10",31)
    fill_table("11",30)
    fill_table("12",31)  
    
}

function reset() {
    selectedInit = null;
    selectedDate = null;
    selectedDateInit = null;
    selectedDateFinal = null;
}
function unselectAll() {    
    $(".eventsCalendar-day a").removeClass("selected");
    
}
function selectDates(init, finalDate) {
    selectDate(init);
    ini = init;
    
    while(ini < finalDate) {
        ini.setDate(ini.getDate()+1);
        selectDate(ini);
    }
}

function selectDate(date) {
    day = normalize(date.getDate());
    month = normalize(date.getMonth()+1);
    
    year = date.getFullYear(); 
    
    console.log("#"+year+month+day+ " a");
    
    $("#"+year+month+day+ " a").addClass("selected");
}

function normalize(num) {
    if(num<10) {
        return "0" + num;
    } else {
        return num;
    }
}

function isGreater(date, dateFi) {    
    xAnio = date.getFullYear();
    xMes = date.getMonth();
    xDia = date.getDate();
    yAnio = dateFi.getFullYear();
    yMes = dateFi.getMonth();
    yDia = dateFi.getDate();
    
    if (xAnio > yAnio){
        return(true);
    } else {
        if (xAnio == yAnio){
            if (xMes > yMes){
                return(true);
            }
            if (xMes == yMes){
                if (xDia > yDia){
                    return(true);
                } else {
                    return(false);
                }
            } else {
                return(false);
            }
        } else { 
            return(false);
        }
    }
}

function splitDate(date) {
    split = date.split("/");
    return split;
}

function getYear(date) {
    return splitDate(date)[0];
}

function getMonth(date) {
    return (splitDate(date)[1]) - 1;
}

function getDay(date) {
    return splitDate(date)[2];
}

function loadHeader(month, year) {
    calAppend('calendar', "<div class='month' data-year='" + year + "' data-month='" + month + "'><div class='eventsCalendar-slider'>" + 
        "<div class='eventsCalendar-monthWrap currentMonth' style='width: 295px;'><div class='eventsCalendar-currentTitle'>" +
        "<a href='#' class='monthTitle'>" + month + " " + year + " </a>" +
        "</div><ul class='eventsCalendar-daysList showAsWeek showDayNames' data-month='" + month +"'>");
}
 
function loadFooter() {
    calAppend('calendar', "</ul></div></div></div>");   
}
 
function calAppend(elem, content) {
    html+=content;
}
function day_title(day_name) {
    calAppend("calendar", " <li class='eventsCalendar-day-header'>" + day_name + "</li>");     
}
// fills the month table with numbers
function fill_table(month,month_length) { 
    loadHeader(month, year);
    day=1
    // begin the new month table
  
    // column headings
    day_title("Sun", month)
    day_title("Mon", month)
    day_title("Tue", month)
    day_title("Wed", month)
    day_title("Thu", month)
    day_title("Fri", month)
    day_title("Sat", month)
  
  
    // pad cells before first day of month
 
    if(!(start_day - 1 >= 7)) {
        for (var i=1;i<start_day;i++){
            calAppend('calendar', "<li class='eventsCalendar-day empty'></li>");
        }
    }
  
  
    // fill the first week of days
    for (var i=start_day;i<8;i++){
        if(day < 10) {
            day = "0" + day;
        }
        
        calAppend('calendar', "<li id='" + year + month + day + "' rel='" + day +"' class='eventsCalendar-day' data-date='" + year +"/" + month + "/" + day + "'><a href='#'>"+day+"</a>" +
            '</li>');
        day++
    }
  
    // fill the remaining weeks
  
    while (day <= month_length) {
      
        for (var i=1;i<=7 && day<=month_length;i++){
            if(day < 10) {
                day = "0" + day;
            }
            calAppend('calendar', "<li id='" + year + month + day + "' rel='" + day +"' class='eventsCalendar-day' data-date='" + year +"/" + month + "/" + day + "'><a href='#'>"+day+"</a>" +
                '</li>');
            day++
        }
     
        // the first day of the next month
        start_day=i
     
    }
    loadFooter();
}



function showCalendar() {
    $("#calendar").html(html);
}

function select(elem) {
    $(elem).addClass("selected");
}

function unselect(elem) {
    $(elem).removeClass("selected");
}

function isBisiesto(year) {    
    if ((year % 4 == 0) && ((year % 100 != 0) || (year % 400 == 0))) {
        return true;
    } else {
        return false;
    }
}


