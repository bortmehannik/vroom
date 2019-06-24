var test2Result;
var countPeople;
var leftPlayers = false;
var name;
var phone;
var mail;
var privacy = false;
var promo;
var notes;
var fullPay = true;
function selectGame(gameId) {
    $('#gameId').val(gameId);

    $('#poligonsgames button').removeClass('activepoint');
    $('#gameid_'+gameId).addClass('activepoint');
    $('#step1').removeAttr('disabled');
    /*   $('.oneWindow').slideUp('slow', function () {
           $('.twoWindow').slideDown('slow');
       });*/

    // getGameInfo();
}


$(document).ready(function() {

    // getRooms('Санкт-Петербург');
    $('.inputsCommands label').click(function() {
        if ($(this).attr('for') == 'own') {
            leftPlayers = false;
        } else {
            leftPlayers = true;
        }
    });

    $('.promo button').click(function() {
        promo = $(".formPay input[name='promo']").val();
        console.log('Create ajax');
    });

    $('.policy').children().click(function() {
       privacy = $(this).is(':checked');
    });

    $('.methods-pay button').click(function() {
        $(this).hasClass('full-pay') ? fullPay = true : fullPay = false;
        console.log(fullPay);
    });
});

function getRooms(city) {

    // $("#poligonsgames").html("");

        $.ajax({
            type: "GET",
            url: "http://var-vision.com/Api/Booking/GetGamePointsAndRoomsForCity?city="+city,
            // url: "/test1.php?city="+city,
            //data: "caturl=" + caturl + "&typeid=" + typeid + "&count=" + count,
            dataType: "json",
            success: function (data) {
                var datatext = '';

                var gamesBtns = $('#poligonsgames .poligons__btn');
                var gamesPrev = $('#poligonsgames .poligons__prev');
                var gamesNext = $('#poligonsgames .poligons__next');

                console.log(gamesBtns);

                $.each(data[0].Rooms, function (index, value) {
                   $.each(value.Games, function (index, secondValue) {
                       // test = secondValue.split(' ');
                       // namegame = '<span>'+test.join('</span><br><span>')+'</span>';
                       datatext +='<div class="poligons-list__item">\n' +
                           '<button class="poligons__btn" onclick="selectGame('+value.Id+')" id="gameid_'+value.Id+'"><p class="poligons__name games__name">'+secondValue+'</p></button>' + '</div>';
                   })
                });

      //           $.each(data[0].Rooms, function(index, value){
      //               test = value.Name.split(' ');
      //               namegame = '<span>'+test.join('</span><br><span>')+'</span>';
      //               datatext +='<td>\n' +
      // '<button onclick="selectGame('+value.Id+');" id="gameid_'+value.Id+'">'+namegame+'</button>\n' + '</td>';
      //           });

                var gamesList = $("#games__list");

                gamesList.html(datatext);
                gamesList.owlCarousel('destroy');

                if (gamesBtns.length > 3) {
                    gamesList.owlCarousel({
                        nav: true
                    });

                    gamesPrev.show();
                    gamesNext.show();
                } else {
                    gamesPrev.hide();
                    gamesNext.hide();
                }

                $('#poligonsgames').removeClass('games--hide');
            }
        });
}

function selectPoint(pointId) {
    //отправляем запрос на api

    $('#pointId').val(pointId);
    $('#poligons .poligons__btn').removeClass('activepoint');
    $('#poligon_'+pointId).addClass('activepoint');

    getRooms('Санкт-Петербург');
}

$(document).ready(function () {


    $('.btnNext button').click(function () {
        var gameId = $('#gameId').val();
        var gamePointId = $('#pointId').val();
        var gameName = '';
        var poligonName = '';
        $.each($('tr.games td'), function() {
            if ($(this).children('button').hasClass('activepoint')) {
                gameName = $(this).text();
            }
        });
        $.each($('tr.poligons td'), function() {
           if ($(this).children('button').hasClass('activepoint')) {
               poligonName = $(this).children('button').children().clone();
           }
        });
        $('.locationGame p').html(poligonName);
        $('.nameGame > p').text(gameName);
        if (gameId != 0 && gamePointId != 0) {
            $('.oneWindow').slideUp('slow', function () {
                $('.twoWindow').slideDown('slow');
            });
            // Data = new Date();
            // $('#day').val(Data.getDate());
            // $('#resultSelect').hide();
            // $('#gamemonth').val(Data.getMonth()+1);
            // createMonth(Data.getMonth(), Data.getFullYear());
            // createDateDay(Data.getDay(), Data.getMonth(),Data.getDate());
            // createCalendar(2019, 5);

            getGameInfo();
        }
    });


});


function createMonth(month,year) {


// Преобразуем месяца
    switch (month)
    {
        case 0: fMonth="январь"; break;
        case 1: fMonth="февраль"; break;
        case 2: fMonth="март"; break;
        case 3: fMonth="апрель"; break;
        case 4: fMonth="май"; break;
        case 5: fMonth="июнь"; break;
        case 6: fMonth="июль"; break;
        case 7: fMonth="август"; break;
        case 8: fMonth="сентябрь"; break;
        case 9: fMonth="октябрь"; break;
        case 10: fMonth="ноябрь"; break;
        case 11: fMonth="декабрь"; break;
    }

    $('#month').html("").append(fMonth+' '+year);
}

function createDateDay(wday,month,day) {

    var weekday=new Array(7);
    weekday[0]="Воскресенье";
    weekday[1]="Понедельник";
    weekday[2]="Вторник";
    weekday[3]="Среда";
    weekday[4]="Четверг";
    weekday[5]="Пятница";
    weekday[6]="Суббота";

// Преобразуем месяца
    switch (month)
    {
        case 0: fMonth="января"; break;
        case 1: fMonth="февраля"; break;
        case 2: fMonth="марта"; break;
        case 3: fMonth="апреля"; break;
        case 4: fMonth="мая"; break;
        case 5: fMonth="июня"; break;
        case 6: fMonth="июля"; break;
        case 7: fMonth="августа"; break;
        case 8: fMonth="сентября"; break;
        case 9: fMonth="октября"; break;
        case 10: fMonth="ноября"; break;
        case 11: fMonth="декабря"; break;
    }

    $('#selectDateDay').html("").append(weekday[wday]+" "+day+" "+fMonth);
}


function createDateDay2(month,day) {


// Преобразуем месяца
    switch (month)
    {
        case 0: fMonth="января"; break;
        case 1: fMonth="февраля"; break;
        case 2: fMonth="марта"; break;
        case 3: fMonth="апреля"; break;
        case 4: fMonth="мая"; break;
        case 5: fMonth="июня"; break;
        case 6: fMonth="июля"; break;
        case 7: fMonth="августа"; break;
        case 8: fMonth="сентября"; break;
        case 9: fMonth="октября"; break;
        case 10: fMonth="ноября"; break;
        case 11: fMonth="декабря"; break;
    }

    return day+" "+fMonth;
}


function selectDay(day) {
    $( ".myBorder a" ).removeClass( "active" );
    $('#day_'+day).addClass('active');
    $('#day').val(day);

    var date = new Date('2019-'+$('#gamemonth').val()+'-'+day);
    //var time = date.getTime() +  60 * 60 * 24 * 1000;


    $('#selectDateDay').html('').append(createDateDay(date.getDay(),$('#gamemonth').val(),day));

    getGameInfo();
}
function createCalendar(year, month) {
    //var elem = document.getElementById('.calendar');
    createMonth(month,year);
    var mon = month; // месяцы в JS идут от 0 до 11, а не от 1 до 12
    var d = new Date(year, mon);

    Data = new Date();
    Day =  $('#day').val();
    Month = Data.getMonth();
    NextMonth = month+1;
    PrevMonth = month-1;

    var table = '<div class="next" onclick="createCalendar1(2019, '+NextMonth+')"></div>\n' +
        '                                    <div class="prev" onclick="createCalendar1(2019, '+PrevMonth+')"></div><table><tr><td>пн</td><td>вт</td><td>ср</td><td>чт</td><td>пт</td><td>сб</td><td>вс</td></tr><tr>';

    // заполнить первый ряд от понедельника
    // и до дня, с которого начинается месяц
    // * * * | 1  2  3  4
    for (var i = 0; i < getDay(d); i++) {
        table += '<td></td>';
    }

    // ячейки календаря с датами
    while (d.getMonth() == mon) {
        var classactive = '';
        if (Day == d.getDate() && Month== mon) {
            classactive = 'active';
        }
if(i>= d.getDate() && Month== mon){
    table += '<td class="myBorder">' + d.getDate() + '</td>';
}
else{
    table += '<td class="myBorder"><a href="javascript:void(0);" onclick="selectDay('+d.getDate()+');" id="day_'+d.getDate()+'" class="' + classactive + '">' + d.getDate() + '</a></td>';


}


        if (getDay(d) % 7 == 6) { // вс, последний день - перевод строки
            table += '</tr><tr>';
        }

        d.setDate(d.getDate() + 1);
    }

    // добить таблицу пустыми ячейками, если нужно
    if (getDay(d) != 0) {
        for (var i = getDay(d); i < 7; i++) {
            table += '<td></td>';
        }
    }

    // закрыть таблицу
    table += '</tr></table>';

    // только одно присваивание innerHTML
    //elem.innerHTML = table;
/*    $('#calendarDots').html('').append('<li></li>\n' +
        '                            <li></li>\n' +
        '                            <li></li>\n' +
        '                            <li class="active"></li>\n' +
        '                            <li><a href="" onclick="createCalendar(2019, 6)"></a></li>\n' +
        '                            <li></li>\n' +
        '                            <li></li>');*/
    $('.calendar').html('').append(table);
    $('#reservationTime').empty();
    //
}

function createCalendar1(year, month) {
    $('#selectDateDay').empty();
    createCalendar(year, month);
}


/*
var logged_in = '<!--?php echo $logged_in; ?-->';
var poster = '<!--?php echo $_SESSION["poster"];?-->';
$.ajax({
    url: 'do_chat.php5',
    type: 'post',
    data: ({'poster': poster, 'logged_in': logged_in}),
    dataType: 'json',
    success: function (data) {
        $.each(data, function (messageIndex, message) {
            console.log(parseInt($('#chatWindow :last-child > span').html()) + ' ' + message['time']);
            if ((parseInt(message['time']) > parseInt($('#chatWindow :last-child > span').html()))) {
                $('#chatWindow').append('<div>' + message['poster'] + '</div><div><span>' + message['time'] + '</span>' + message['message'] + '</div>');
            }
        });
    }referentsQuantity
});*/

function bookApi(btn) {


    var arrayId = $(btn).attr("arrayId");
    var phoneNumber = $("#confirmBookingPhone").val();
    var clientEmail = $("#confirmBookingEmail").val();
    var clientName = $("#confirmBookingName").val();
    var obj = test2Result[arrayId];
    var bookingRoomModels = new Array();
    $.each(obj,
        function(index) {
            var bookingRoomModel = {
                PlayersNumber: $(this)[0].PlayersNumber,
                GameId: $(this)[0].BookingRoomOptionModel.PricingSlotModel.PricingRule.GameId,
                RoomId: $(this)[0].BookingRoomOptionModel.PricingSlotModel.PricingRule.RoomId,
                StartTime: moment($(this)[0].BookingRoomOptionModel.PricingSlotModel.StartTime).format(),
                OccupyAllRoom: ($('input[name=command]:checked').val())
            };
            bookingRoomModels.push(bookingRoomModel);
        });
    var data = {
        PhoneNumber: phoneNumber,
        ClientEmail: clientEmail,
        ClientName: clientName,
        BookingRoomModels: bookingRoomModels
    };
    $.ajax({
        type: 'POST',
        url: 'http://var-vision.com/Api/Booking/BookOrder',
        data: data,
        success: function(data) {
            console.log(data);
            $('#confirmBookingModal').modal('toggle');
            window.location.href = data.PaymentFormUrl;

        }
    }).fail(function(data) {
        console.log(data);

    });

    //

}



function timeButtonClick(btn) {


    var arrayId = $(btn).attr('arrayid');
    var obj = test2Result[arrayId];
    $('#resultSelect').show();
    $('#referentsQuantity span').html('').append($('#contentSlider1').val());
    $( ".myBorder a" ).removeClass( "active" );
    $('[arrayid="'+arrayId+'"]').addClass('active');
    $("#result-tickets").html(""); //clean
    $('#result-tickets').append("<p> Start time is <b>" +
        obj[0].BookingRoomOptionModel.PricingSlotModel.StartTimeFormatted +
        "</b></p>");
    var leftPlayers = $('input[name=command]:checked').val();
    /*var leftPlayersBool = (leftPlayers.toUpperCase() === "TRUE");
    $('#result-tickets').append("<p> Left players: <b>" +
        leftPlayers +
        "</b></p>");*/
    var allOrderPrice = 0;
    $.each(obj,
        function(element) {
            var totalCost = 0;
            var allRoomCost = $(this)[0].BookingRoomOptionModel.PricingSlotModel.PricingRule.PricePerRoom;
            if (leftPlayers =='true') {
                totalCost = $(this)[0].BookingRoomOptionModel.PricingSlotModel.PricingRule.PricePerPlayer *
                    $(this)[0].PlayersNumber;
            } else {
                totalCost = allRoomCost;
            }
            allOrderPrice += totalCost;
            $('#dateGame p').html('').append(createDateDay2($('#gamemonth').val(), $('#day').val())+' в ' +
                $(this)[0].BookingRoomOptionModel.PricingSlotModel.StartTimeFormatted);


            $('#prcePer').html('').append($(this)[0].BookingRoomOptionModel.PricingSlotModel.PricingRule.PricePerPlayer);
            $('#resultPrice p').html('').append('Итого: '+($(this)[0].BookingRoomOptionModel.PricingSlotModel.PricingRule.PricePerPlayer * $('#contentSlider1').val()));


            $('#dateGame2 p').html('').append(createDateDay2($('#gamemonth').val(), $('#day').val())+' в ' +
                $(this)[0].BookingRoomOptionModel.PricingSlotModel.StartTimeFormatted);


            $('#prcePer2').html('').append($(this)[0].BookingRoomOptionModel.PricingSlotModel.PricingRule.PricePerPlayer);
            $('#resultPrice2 p').html('').append('Итого: '+($(this)[0].BookingRoomOptionModel.PricingSlotModel.PricingRule.PricePerPlayer * $('#contentSlider1').val()));

            $('#bookthis').attr('arrayid',arrayId);


            //$('.selected').append("<div class='card'><div class='card-body'>" + textInsideCard + "</div></div>");
        });
    /*$('.selected')
        .append("<button id='book' class='btn btn-primary' onclick='bookBtn(" + arrayId + ")'>book</button>");*/
}

function getGameInfo() {

    var leftPlayers = $('input[name=command]:checked').val();
    var gameId = $('#gameId').val();
    var gamePointId = $('#pointId').val();
    var amount = $('#contentSlider1').val();

    //отправляем запрос для получения кучи инфы
    Data = new Date();
    Year = Data.getFullYear();
    Month = $('#gamemonth').val();
    Day = $('#day').val();


    $.ajax({
        type: "GET",
        // url: "/test.php?gamePointId=1&gameId=" + gameId + "&datetime=" + Year + "-" + Month + "-" + Day + "&leftPlayers=" + leftPlayers + "&playersNumber=5",
        url: "/test.php?gamePointId=" + gamePointId + "&gameId=" + gameId + "&datetime=" + Year + "-" + Month + "-" + Day + "&endTime=" + Year + "-" + Month + "-" + Day + "&leftPlayers=" + leftPlayers + "&playersNumber="+amount,
        //data: "caturl=" + caturl + "&typeid=" + typeid + "&count=" + count,
        dataType: "json",
        success: function (data) {
            var datatext = '<table><tr>';
            //jquery part
            $("#reservationTime").html(""); //clean
            /*$("#reservationTime").append('<table>\n' +
                '                                        <tr>');*/
            var i = 1;
            $.each(data,
                function (obj) {
                    var startTime = $(this)[0].BookingRoomOptionModel.PricingSlotModel.StartTimeFormatted;
                    var price = $(this)[0].BookingRoomOptionModel.PricingSlotModel.PricingRule.PricePerPlayer;
                    var totalPrice = 0;
                    $(this).each(function (x) {
                        totalPrice += $(this)[0].TotalPrice;
                    });

                    datatext += '<td class="myBorder">\n' +
                        '                                                <a href="#" onclick="timeButtonClick(this)" arrayid="'+obj+'" >\n' +
                        '                                                    <div class="time">' + startTime + '</div>\n' +
                        '                                                    <div class="price">' + price + ' р.</div>\n' +
                        '                                                </a>\n' +
                        '                                            </td>';
                    /* $("#reservationTime").append('<td class="myBorder">\n' +
                         '                                                <a href="#" onclick="timeButtonClick(this)" >\n' +
                         '                                                    <div class="time">'+startTime+'</div>\n' +
                         '                                                    <div class="price">'+price+' р.</div>\n' +
                         '                                                </a>\n' +
                         '                                            </td>');*/
                    /*       $("#reservationTime").append(
                                "<button class='btn btn-primary time-button' onclick='timeButtonClick(this)' arrayId='" +
                                obj +
                                "'><div name='time'>" +
                                startTime +
                                "</button>");*/
                    //$(this)[0].BookingRoomOptionModel.PricingSlotModel.StartTimeFormatted
                    if (i == 6) {
                        datatext += '</tr><tr>';
                        //$("#reservationTime").append('</tr><tr>');
                        i = 0;
                    }
                    i++;


                });
            datatext += '</tr></table>';

            $("#reservationTime").append(datatext);
            /*$("#reservationTime").append(' </tr>\n' +
                '                                    </table>');*/
            test2Result = data;
            console.log(data);


        }
    });
}


function getDay(date) { // получить номер дня недели, от 0(пн) до 6(вс)
    var day = date.getDay();
    if (day == 0) day = 7;
    return day - 1;
}


$(function () {
    $('[data-fancybox]').fancybox({
        youtube: {},
        vimeo: {
            color: 'f00'
        }
    });

    $('.formPay form').on('submit', function (e) {
        return false;

        // e.preventDefault();
        // e.stopPropagation();
        // const $form = $(this);
        // let err = false;
        // $form.addClass('sending');
        //
        // $('input', $form).each(function () {
        //     if ($(this).hasClass('error')) {
        //         err = true;
        //     }
        // });
        //
        // if (!err) {
        //     if (!$form.hasClass("successful")) return $.ajax({
        //         type: "POST",
        //         url: "/send.php",
        //         data: $form.serialize(),
        //         cache: !1,
        //         success: function (t) {
        //             //Success
        //             $form.slideUp(500, function () {
        //                 $('input, textarea', $form).val('');
        //             });
        //
        //             $form.next('.success-message').slideDown(500);
        //
        //             $form.addClass('successful');
        //         }
        //     });
        // } else {
        //     $form.removeClass('sending');
        // }
    });

    $('.testing__btn').on('click', function () {
        var $active = $('.question.active'),
            $next = $active.next('.question');

        if ($next.length) {
            $active.removeClass('active').slideUp(300);
            $next.addClass('active').slideDown(300);
        }
    });

    flatpickr.defaultConfig.animate = window.navigator.userAgent.indexOf('MSIE') === -1;
    flatpickr(".flatpickr");

    var examples = document.querySelectorAll(".flatpickr");

    var configs = {
        datetime: {
            enableTime: true,
            dateFormat: "d-m-Y H:i",
            time_24hr: true,
            minDate: "today",
            locale: 'ru',
            firstDayOfWeek: 2
        },

        altinput: {
            altInput: true,
            altFormat: "F j, Y",
            dateFormat: "Y-m-d"
        },

        "minDate": {
            minDate: "2020-01"
        },

        minDateToday: {
            minDate: "today"
        },

        "maxDateStr": {
            dateFormat: "d.m.Y",
            maxDate: "15.12.2017"
        },

        minMaxDateTwoWeeks: {
            minDate: "today",
            maxDate: new Date().setDate(new Date().getDate() + 14)
        },

        disableSpecific: {
            onReady: function () {
                this.jumpToDate("2025-01")
            },
            disable: ["2025-01-30", "2025-02-21", "2025-03-08", new Date(2025, 4, 9)]
        },

        disableRange: {
            onReady: function () {
                this.jumpToDate("2025-04")
            },
            disable: [
                {
                    from: "2025-04-01",
                    to: "2025-05-01"
                },
                {
                    from: "2025-09-01",
                    to: "2025-12-01"
                }
            ]
        },

        disableFunction: {
            locale: {
                firstDayOfWeek: 2
            },
            disable: [
                function (date) {
                    // return true to disable

                    return (date.getDay() === 0 || date.getDay() === 6);

                }
            ]
        },

        enableSpecific: {
            onReady: function () {
                this.jumpToDate("2025-03")
            },
            enable: ["2025-03-30", "2025-05-21", "2025-06-08", new Date(2025, 8, 9)]
        },

        enableRange: {
            onReady: function () {
                this.jumpToDate("2025-04")
            },
            enable: [
                {
                    from: "2025-04-01",
                    to: "2025-05-01"
                },
                {
                    from: "2025-09-01",
                    to: "2025-12-01"
                }
            ]
        },

        enableFunction: {
            enable: [
                function (date) {
                    // return true to enable

                    return (date.getMonth() % 2 === 0 && date.getDate() < 15);

                }
            ]
        },

        multiple: {
            mode: "multiple",
            dateFormat: "Y-m-d",
        },

        multipleCustomConjunction: {
            mode: "multiple",
            dateFormat: "Y-m-d",
            conjunction: " :: "
        },

        multiplePreload: {
            mode: "multiple",
            dateFormat: "Y-m-d",
            defaultDate: ["2016-10-20", "2016-11-04"]
        },

        range: {
            mode: "range"
        },

        rangeDisable: {
            mode: "range",
            minDate: "today",
            dateFormat: "Y-m-d",
            disable: [
                function (date) {
                    // disable every multiple of 8
                    return !(date.getDate() % 8);
                }
            ]
        },

        rangePreload: {
            mode: "range",
            dateFormat: "Y-m-d",
            defaultDate: ["2016-10-10", "2016-10-20"],
        },

        timePicker: {
            enableTime: true,
            noCalendar: true,
        },

        timePickerMinMaxHours: {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            minDate: "16:00",
            maxDate: "22:30",
        },

        "timePicker24": {
            enableTime: true,
            noCalendar: true,
            time_24hr: true,
        },

        "timePickerPreloading": {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            defaultDate: "13:45"
        },

        minTime: {
            enableTime: true,
            minTime: "09:00"
        },

        minMaxTime: {
            enableTime: true,
            minTime: "16:00",
            maxTime: "22:00"
        },

        inline: {
            inline: true
        },
        weekNumbers: {
            weekNumbers: true,

        },

        strap: {
            wrap: true
        },

        onDayCreate: {
            onDayCreate: function (dObj, dStr, fp, dayElem) {
                // Utilize dayElem.dateObj, which is the corresponding Date

                // dummy logic
                if (Math.random() < 0.15)
                    dayElem.innerHTML += "<span class='event'></span>";

                else if (Math.random() > 0.85)
                    dayElem.innerHTML += "<span class='event busy'></span>";
            }
        },

        confirmDate: {
            "enableTime": true,
        },
        weekSelect: {
            "onChange": [function () {
                // extract the week number
                // note: "this" is bound to the flatpickr instance
                var weekNumber = this.selectedDates[0]
                    ? this.config.getWeek(this.selectedDates[0])
                    : null;

                console.log(weekNumber);
            }]
        },
        rangePlugin: {},

        minMaxTimePlugin: {
            enableTime: true,
            minDate: "2025",
            plugins: []
        }
    }

    for (var i = 0; i < examples.length; i++) {
        flatpickr(examples[i], configs[examples[i].getAttribute("data-id")] || {});
    }
});


$(function () {

    $( "#polzunok" ).slider({
        value : 1,//Значение, которое будет выставлено слайдеру при загрузке
        min : 1,//Минимально возможное значение на ползунке
        max : 10,//Максимально возможное значение на ползунке
        step : 1,//Шаг, с которым будет двигаться ползунок
        create: function( event, ui ) {
            val = $( "#polzunok" ).slider("value");//При создании слайдера, получаем его значение в перемен. val
           $( "#contentSlider" ).html( val );//Заполняем этим значением элемент с id contentSlider
            $( "#contentSlider1" ).val( val );

        },
        slide: function( event, ui ) {
            countPeople = ui.value;
            $( "#contentSlider" ).html( countPeople );//При изменении значения ползунка заполняем элемент с id contentSlider
            $( "#contentSlider1" ).val( countPeople );
            $('.referentsQuantity span:first-child').text(countPeople);
        }
    });

   /* var values = [1, 2, 3,4];

    var slider = $("#polzunok").slider({
        min: values[0],
        max: values[3],
        slide: function (event, ui) {

            var includeLeft = event.keyCode != $.ui.keyCode.RIGHT;
            var includeRight = event.keyCode != $.ui.keyCode.LEFT;
            slider.slider('option', 'value', findNearest(includeLeft, includeRight, ui.value));
            if( ui.value<=3){
                $( "#amount" ).val( 1  );
                $('#referentsQuantity span').html('').append('1');
            }
            if( ui.value>3 && ui.value<=6 ){
                $( "#amount" ).val( 5  );
                $('#referentsQuantity span').html('').append('5');
            }
            if( ui.value>=8 && ui.value<=10 ){
                $( "#amount" ).val( 10  );
                $('#referentsQuantity span').html('').append('10');
            }
            return false;
        }
    });

    function findNearest(includeLeft, includeRight, value) {
        var nearest = null;
        var diff = null;
        for (var i = 0; i < values.length; i++) {
            if ((includeLeft && values[i] <= value) || (includeRight && values[i] >= value)) {
                var newDiff = Math.abs(value - values[i]);
                if (diff == null || newDiff < diff) {
                    nearest = values[i];
                    diff = newDiff;
                }
            }
        }
        return nearest;
    }*/
});

$(function () {

    $('.md-trigger').on('click', function () {
        $('.md-modal').addClass('md-show');
    });

    $('.md-close').on('click', function () {
        $('.md-modal').removeClass('md-show');
    });

});

$(function () {
    var btnPay = $('.btnBlock button');

    btnPay.on('click', function () {
        btnPay.removeClass('active');
        $(this).addClass('active');
    });
});


$(function () {
    var linkTable = $('.calendar td a');

    linkTable.on('click', function () {
        linkTable.removeClass('active');
        $(this).addClass('active');
    });
    var linkTable2 = $('.reservationTime td a');

    linkTable2.on('click', function () {
        linkTable2.removeClass('active');
        $(this).addClass('active');
    });
});

$(function () {
    var linkBackHome = $('#nav-home .linkBack');
    var linkNextHome = $('#nav-home .linkNext');
    var linkBacknProfile = $('#nav-profile .linkBack');
    var linkNextProfile = $('#nav-profile .linkNext');
    var linkBackContact = $('#nav-contact .linkBack');

    linkBackHome.on('click', function () {
        $('.twoWindow').slideUp('slow', function () {
            $('.oneWindow').slideDown('slow');
        });
    });
    linkNextHome.on('click', function () {
        $('#nav-home-tab').removeClass('active');
        $('#nav-profile-tab').addClass('active');
        $('#nav-home').removeClass('show active');
        $('#nav-profile').addClass('show active');
    });
    linkBacknProfile.on('click', function () {
        $('#nav-home-tab').addClass('active');
        $('#nav-profile-tab').removeClass('active');
        $('#nav-profile').removeClass('show active');
        $('#nav-home').addClass('show active');
    });
    linkNextProfile.on('click', function () {
        $('#nav-profile-tab').removeClass('active');
        $('#nav-contact-tab').addClass('active');
        $('#nav-profile').removeClass('show active');
        $('#nav-contact').addClass('show active');
        this.name = $(".formPay input[name='name']").val();
        this.phone = $(".formPay input[name='phone']").val();
        this.mail = $(".formPay input[name='mail']").val();
        this.notes = $(".formPay input[name='notes']").val();
        $('.information #name').text(this.name + ', ');
        $('.information #phone').text(this.phone);
        $('.information #email').text(this.mail + ', ');
        console.log(this.notes);
    });
    linkBackContact.on('click', function () {
        $('#nav-contact-tab').removeClass('active');
        $('#nav-profile-tab').addClass('active');
        $('#nav-contact').removeClass('show active');
        $('#nav-profile').addClass('show active');
    });
});


$(function () {
    var creditly = Creditly.initialize(
        '.creditly-wrapper .expiration-month-and-year',
        '.creditly-wrapper .credit-card-number',
        '.creditly-wrapper .security-code',
        '.creditly-wrapper .card-type');

    $(".creditly-card-form .submit").click(function (e) {
        e.preventDefault();
        var output = creditly.validate();
        if (output) {
            // Your validated credit card output
            console.log(output);
        }
    });
});
