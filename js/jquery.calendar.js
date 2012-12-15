// remember to change every instance of "pluginName"
// to the name of your plugin!
;
(function($) {
    // This variable contains the html output
    var html = "";
    var days = new Array("Sun", "Mon", "Tu", "Wed", "Th", "Fri", "Sat")

//    today = new Date("January 1, "+year);
//    start_day = today.getDay() + 1;
    // here it goes!
    $.fn.calendar = function(method) {
 
        // plugin's default options

        //years can be an array or a number
        // if years is +1 prints actual year.
        
        var defaults = {            
            container: "#calendar",
            years: new Array(2012,2013,2014),
            show_year: 2012,
            debug: true,
            start_day: 0
        }
 
        // this will hold the merged default and user-provided properties
        // you will have to access the plugin's properties through this object!
        // settings.propertyName
        var settings = {}
 
        // public methods
        // to keep the $.fn namespace uncluttered, collect all
        // of the plugin's methods in an object literal and call
        // them by passing the string name of the method to the plugin
        //
        // public methods can be called as
        // $(selector).pluginName('methodName', arg1, arg2, ... argn)
        // where "pluginName" is the name of your plugin and "methodName"
        //is the name of a function available in
        // the "methods" object below;
        // arg1 ... argn are arguments to be passed to the method
        //
        // or, from within the plugin itself, as
        // methods.methodName(arg1, arg2, ... argn)
        // where "methodName" is the name of a function available
        // in the "methods" object below
        var methods = {
 
            // this the constructor method that gets called when
            // the object is created
            init : function(options) {
 
                // iterate through all the DOM elements we are
                // attaching the plugin to
                return this.each(function() {
 
                    // the plugin's final properties are the merged default
                    // and user-provided properties (if any)
                    // this has the advantage of not polluting the defaults,
                    // making the same instace re-usable with
                    // new options; thanks to Steven Black for suggesting this
                    settings = $.extend({}, defaults, options)
 
                    // "element" holds the jQuery object of the current DOM element
                    var element = $(this);
                    helpers.loadCalendar(element);
                }); 
            },
 
            // a public method. for demonstration purposes only - remove it!
            showCalendar: function() {
                
            }
 
        }
 
        // private methods
        
        var helpers = { 
            /**
             * 
             */
            loadCalendar: function(element) {
                for(year in settings.years) {
                    helpers.loadYear(settings.years[year]);
                }           
                
                $(element).html(html);                
            },
            /**
             * Carga el header del div month
             * Loads header of div Month
             */
            loadHeader: function(month, year) {
                helpers.append("<div class='month' data-year='" + year + "' data-month='" + month + "'><div class='eventsCalendar-slider'>" + 
                    "<div class='eventsCalendar-monthWrap currentMonth' style='width: 295px;'><div class='eventsCalendar-currentTitle'>" +
                    "<a href='#' class='monthTitle'>" + month + " " + year + " </a>" +
                    "</div><ul class='eventsCalendar-daysList showAsWeek showDayNames' data-month='" + month +"'>");
            },
            /**
             *
             *  Carga el footer del elemento calendario
             * Loads footer of calendar element
             */
            loadFooter: function() {
                helpers.append("</ul></div></div></div>")
            },
            /**             
             * Print the day title
             * @param day_name String
             */
            printDayTitle: function(day_name) {
                helpers.append(" <li class='eventsCalendar-day-header'>" + day_name + "</li>");
            },
            /**
             * Append content to html variable
             * @param content String
             */
            append: function(content) {
                html+=content;
            },
            /**
             * Loads a year
             * @param year Integer
             */
            loadYear: function(year) {
                for(month in months) {
                    if(months[month].number == 2) {
                        if(helpers.isLeapYear(year)) {
                            months[month].days = 29;
                        }
                    }
                    helpers.loadMonth(months[month].name, year, months[month].days);
                }
            },
            /**
             * Loads a month
             * @param month String
             * @param year Integer
             * @param month_length Integer
             */
            loadMonth: function(month, year, month_length) {
                
                helpers.loadHeader(month, year);
                for(day in days) {
                    
                    helpers.printDayTitle(days[day]);
                }
                var day = 1;
                // pad cells before first day of month
                if(!(settings.start_day - 1 >= 7)) {
                    for (var i=1; i < settings.start_day;i++) {
                        helpers.append("<li class='eventsCalendar-day empty'></li>");
                    }
                }
                
                // fill the first week of days
                for (i = settings.start_day;i<8;i++){
                    if(day < 10) {
                        day = "0" + day;
                    }        
                    helpers.append("<li id='" + year + month + day + "' rel='" + day +"' class='eventsCalendar-day' data-date='" + year +"/" + month + "/" + day + "'><a href='#'>"+day+"</a>" +
                        '</li>');
                    day++
                }
                
                // fill the remaining weeks  
                while (day <= month_length) {      
                    for (i=1; i<=7 && day<=month_length;i++){
                        if(day < 10) {
                            day = "0" + day;
                        }
                        helpers.append("<li id='" + year + month + day + "' rel='" + day +"' class='eventsCalendar-day' data-date='" + year +"/" + month + "/" + day + "'><a href='#'>"+day+"</a>" +
                            '</li>');
                        day++
                    }
     
                    // the first day of the next month
                    settings.start_day = i     
                }
                helpers.loadFooter();
            },
            isLeapYear: function(year) {
                if ((year % 4 == 0) && ((year % 100 != 0) || (year % 400 == 0))) {
                    return true;
                } else {
                    return false;
                }
            }
        }
 
        // if a method as the given argument exists
        if (methods[method]) { 
            // call the respective method
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
 
        // if an object is given as method OR nothing is given as argument
        } else if (typeof method === 'object' || !method) {
 
            // call the initialization method
            return methods.init.apply(this, arguments);
 
        // otherwise
        } else { 
            // trigger an error
            $.error( 'Method "' +  method + '" does not exist in jQuery calendar plugin!');
 
        }
 
    }
    
    var months = [        
    {
        days : 31,
        number : 1,
        name : "January"
    },
    {
        days : 28,
        number : 2,
        name : 'February'
    },
    {
        days : 31,
        number : 3,
        name : 'March'
    },
    {
        days : 30,
        number : 4,
        name : 'April'
    },
    {
        days : 31,
        number : 5,
        name : 'May'
    },
    {
        days : 30,
        number : 6,
        name : 'June'
    },
    {
        days : 31,
        number : 7,
        name : 'July'
    },
    {
        days : 31,
        number : 8,
        name : 'August'
    },
    {
        days : 30,
        number : 9,
        name : 'September'
    },
    {
        days : 31,
        number : 10,
        name : 'October'
    },
    {
        days : 30,
        number : 11,
        name : 'November'
    },
    {
        days : 31,
        number : 12,
        name : 'December'
    }
    ];
})(jQuery);