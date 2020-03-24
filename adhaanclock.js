function realtimeClock() {
    //get time
    var today = new Date();
    var hour   = today.getHours();
    var minute = today.getMinutes();
    var second = today.getSeconds();
    minute = checkTime(minute);
    second = checkTime(second);

    var hourPazar = hour + 1 ;
    //document.getElementById("time").innerHTML = hour + ":" + minute + ":" + second;
    //display hourPazar when displaying Pazar
    var location = document.getElementById("selection").value;
    if (location == "city=Pazar&country=Turkey") {
        document.getElementById("time").innerHTML = hourPazar + ":" + minute + ":" + second;
    }
    else {
        document.getElementById("time").innerHTML = hour + ":" + minute + ":" + second;
    }
}

function adhaanclock() {
    //different locations
    var location = document.getElementById("selection").value;
    var api = 'https://api.aladhan.com/v1/calendarByCity?method=13&annual=true&' + location;

    //get date
    var today = new Date();
    var month = today.getMonth();
    var day   = today.getDate()
    var year  = today.getFullYear();

    // +1 and -1 because of JSON
    var dayOK   = day - 1;
    var monthOK = month + 1;
    var strmonth = monthOK.toString();

    //get months in words
    var monthInWords = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var monthInWord  = monthInWords[month];
    document.getElementById("date").innerHTML = monthInWord + " " + day + ", " + year;

    // Activate Real time clock
    var t  = setInterval(realtimeClock, 500);

    //the hard part of the code
    const request = new XMLHttpRequest();
    request.open('GET', api);
    request.send();     
    request.onload = () => {
        if (request.status === 200) {
            console.log("Success");
        
            //get JSON data
            var su = JSON.parse(request.response).data[strmonth][dayOK]["timings"]["Sunrise"];
            var dh = JSON.parse(request.response).data[strmonth][dayOK]["timings"]["Dhuhr"];
            var as = JSON.parse(request.response).data[strmonth][dayOK]["timings"]["Asr"];
            var ma = JSON.parse(request.response).data[strmonth][dayOK]["timings"]["Maghrib"];
            var is = JSON.parse(request.response).data[strmonth][dayOK]["timings"]["Isha"];

            var sunrise  = su.substring(0, 5);
            var dhuhr    = dh.substring(0, 5);
            var asr      = as.substring(0, 5);
            var maghrib  = ma.substring(0, 5);
            var isha     = is.substring(0, 5);
        
            //place JSON data in table
            var table="<table id='table'>";
            table+=
            "<tr id='Uptr'>"+
                "<td>Sunrise</td>"+
                "<td>Dhuhr</td>"+
                "<td>Asr</td>"+
                "<td>Maghrib</td>"+
                "<td>Isha</td>"+
            "</tr>"; 
            
            table+="<tr id='Downtr'><td>"+sunrise+"</td><td>"+dhuhr+"</td><td>"+asr+"</td><td>"+maghrib+"</td><td>"+isha+"</td></tr>";
            table+="</table>";
            document.getElementById("times").innerHTML = table;   
        } 
    };   
    request.onerror = () => {
      console.log("error")
    };
}

//place zeros behind time
function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}

//playable audio
var aud = document.getElementById("audioAlarm");
function playAudioAlarm() {
    aud.play();
}

