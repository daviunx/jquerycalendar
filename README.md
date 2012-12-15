jquerycalendar
==============

JQuery Calendar is a jQuery plugin for developers. You can handle day selects, print years, show and hide years and month events, etc. Please read Documentation files for more details. *Actually, css files are of jQuery Events Calendar.

Initial Example
==============

First import CSS files from great plugin jQuery Events Calendar Plugin. 
(http://www.vissit.com/jquery-event-calendar-plugin-english-version):     
    <p>
    <code>
    &lt;link rel="stylesheet" href="css/eventCalendar.css" /&gt; <br/>
    &lt;link rel="stylesheet" href="css/eventCalendar_theme_responsive.css" /&gt;
    </code>
    </p>
        
After create calendar container div. Example:
<p>
<code>
        &lt;div id='calendar'&gt;&lt;/div&gt;
</code>
</p>
Now only you have to import and call jQuery Calendar Plugin

        $(document).ready(function() {
            $("#calendar").calendar();
        });
        
<footer>

</footer>
