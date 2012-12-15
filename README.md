jquerycalendar
==============

JQuery Calendar is a jQuery plugin for developers. You can handle day selects, print years, show and hide years and month events, etc. Please read Documentation files for more details. *Actually, css files are of jQuery Events Calendar.

Css Files from jQuery Events Calendar: http://www.vissit.com/jquery-event-calendar-plugin
You can change the template editing css files.

<h2>Initial example</h2>:
<code>

    //Import CSS files        
    <link rel="stylesheet" href="css/eventCalendar.css" >
    <link rel="stylesheet" href="css/eventCalendar_theme_responsive.css" >    
    

        <div id="calendar"></div>
        
        //Import jQuery and jQuery Calendar Plugin
        <script src="js/jquery.min.js"></script>
        <script src="js/jquery.calendar.js"></script>
        <script>
            $(document).ready(function() {
                $("#calendar").calendar();
            });
        </script>
</code>

<h2>Default Options</h2>:
<code>
                
        container: "#calendar",
        month_class: "month",
        years: new Array(2012,2013,2014,2015,2016,2017),
        show_year: 2012,
        debug: true,
        start_day: 0,
        autoShow: false,             
        onSelectDay: function(month, year, day, date){
            alert("Select day event has been handled: " + date + ". Year: " + year + 
            " Month: " + month + " Day: " + day);
        },
        onSelectRange: function(date_from, date_to){

        }
    
</code>
<h2>Events:</h2>
Comming soon...
