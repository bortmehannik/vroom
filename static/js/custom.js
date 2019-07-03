var test2Result;
var gameId;
var pointId;
var roomId;
var countPeople = 1;
var leftPlayers = false;
var currentDate;
var currentCell;
var name;
var phone;
var mail;
var privacy = false;
var promo;
var notes;
var fullPay = true;
var gameName;
var poligonName;
var price;
var totalPrice;
var months;
var priceWithoutPeople = 0;

function selectGame(gameId) {
    $('#gameId').val(gameId);

    $('#step1').removeAttr('disabled');
    this.gameId = gameId;
    $('#games__list').find('.poligons-list__item').on('click', 'button', function() {
        $('#games__list').find('.poligons-list__item button').removeClass('activepoint');
       $(this).addClass('activepoint');
    });
    console.log(this.gameId);
    /*   $('.oneWindow').slideUp('slow', function () {
           $('.twoWindow').slideDown('slow');
       });*/

    // getGameInfo();
}


$(document).ready(function() {

    $('.inputsCommands label').click(function() {
        if ($(this).attr('for') == 'own') {
            leftPlayers = false;
        } else {
            leftPlayers = true;
        }
        $('.result').css('display', 'none');
        if (currentCell) {
            const data = {
                gamePointId: pointId,
                gameId: gameId,
                beginTime: currentCell.toISOString(),
                endTime: currentCell.toISOString(),
                leftPlayers: leftPlayers,
                playersNumber: countPeople
            };
            getSlots(data);
        }
    });

    $('.promo button').click(function() {
       console.log('Применить промокод');
       return false;
    });

    $('.policy input').click(function() {
        privacy = !privacy;
        console.log(privacy);
    });

    chooseSlot();
    getTimeSlots();
});

$('.go-to-pay').click(function() {
    bookApi();
});

function bookApi() {

    var bookingRoomModels = new Array();
    var bookingRoomModel = {
        PlayersNumber: countPeople,
        GameId: gameId,
        RoomId: roomId,
        StartTime: this.currentDate,
        OccupyAllRoom: countPeople
    };
    bookingRoomModels.push(bookingRoomModel);
    var data = {
        PhoneNumber: $(".formPay input[name='phone']").val(),
        ClientEmail: $(".formPay input[name='mail']").val(),
        ClientName: $(".formPay input[name='name']").val(),
        BookingRoomModels: bookingRoomModels,
        PromoCodeString: $(".formPay input[name='promo']").val()
    };
    console.log(data);

    $.ajax({
        type: 'POST',
        url: 'http://var-vision.com/Api/Booking/BookOrder',
        data: data,
        beforeSend: function() {
            $('.loader').css('display', 'block');
        },
        success: function(data) {
            $('.loader').css('display', 'none');
            window.location.href = data.PaymentFormUrl;
        }
    }).fail(function(data) {
        console.log(data);
        alert(data.responseJSON.Message);

    });
}

function getRooms(city) {

        $.ajax({
            type: "GET",
            url: "http://var-vision.com/Api/Booking/GetGamePointsAndRoomsForCity?city="+city,
            // url: "/test1.php?city="+city,
            //data: "caturl=" + caturl + "&typeid=" + typeid + "&count=" + count,
            dataType: "json",
            beforeSend: function() {
              $('.loader').css('display', 'block');
            },
            success: function (data) {
                var datatext = '';
                $('.loader').css('display', 'none');
                var gamesBtns = $('#poligonsgames .poligons__btn');
                var gamesPrev = $('#poligonsgames .poligons__prev');
                var gamesNext = $('#poligonsgames .poligons__next');

                $.each(data[0].Rooms, function (index, value) {
                    $.each(value.Games, function (index, secondValue) {
                        // test = secondValue.split(' ');
                        // namegame = '<span>'+test.join('</span><br><span>')+'</span>';
                        datatext +='<div class="poligons-list__item">\n' +
                            '<button class="poligons__btn" data-game-id="'+ index +'" onclick="selectGame('+index+')" id="gameid_'+value.Id+'"><p class="poligons__name games__name">'+secondValue+'</p></button>' + '</div>';
                        roomId = value.Id;
                    })
                });

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
    this.pointId = 1;


    getRooms('Санкт-Петербург');
}

$(document).ready(function () {


    $('.btnNext button').click(function () {
        // var gameId = $('#gameId').val();
        // var gamePointId = $('#pointId').val();
        var gamePointId = 1;
        $.each($('#poligons__list .owl-item'), function() {
            if ($(this).find('button').hasClass('activepoint')) {
                gameName = $(this).find('button').children().clone();
            }
        });
        $.each($('#games__list .poligons-list__item'), function() {
            if ($(this).find('button').hasClass('activepoint')) {
               poligonName = $(this).find('button').children().clone();
           }
        });
        $('.locationGame p').html(poligonName);
        $('.nameGame > p').html(gameName);

        console.log(poligonName);
        console.log(gameName);

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

            // getGameInfo();
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

    // getGameInfo();
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

    $('.calendar').html('').append(table);
    $('#reservationTime').empty();
    //
}

function createCalendar1(year, month) {
    $('#selectDateDay').empty();
    createCalendar(year, month);
}

function timeButtonClick(btn) {


    var arrayId = $(btn).attr('data-array-id');
    var obj = test2Result[arrayId];
    $('#resultSelect').show();
    // $('#referentsQuantity span').html('').append($('#contentSlider1').val());
    // $( ".myBorder a" ).removeClass( "active" );
    // $('[arrayid="'+arrayId+'"]').addClass('active');

    // var allOrderPrice = 0;
    price = 0;
    $.each(obj,
        function(element) {
            var totalCost = 0;
            var allRoomCost = $(this)[0].BookingRoomOptionModel.PricingSlotModel.PricingRule.PricePerRoom;
            if (leftPlayers === true) {
                totalCost = $(this)[0].BookingRoomOptionModel.PricingSlotModel.PricingRule.PricePerPlayer *
                    $(this)[0].PlayersNumber;
                console.log(totalCost);
            } else {
                totalCost = allRoomCost;
            }
            price += totalCost;
            // console.log(price);

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

    $('form').on('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const $form = $(this);
        let err = false;
        $form.addClass('sending');

        $('input', $form).each(function () {
            if ($(this).hasClass('error')) {
                err = true;
            }
        });

        if (!err) {
            if (!$form.hasClass("successful")) return $.ajax({
                type: "POST",
                url: "/send.php",
                data: $form.serialize(),
                cache: !1,
                success: function (t) {
                    //Success
                    $form.slideUp(500, function () {
                        $('input, textarea', $form).val('');
                    });

                    $form.next('.success-message').slideDown(500);

                    $form.addClass('successful');
                }
            });
        } else {
            $form.removeClass('sending');
        }
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
            // getTotalPrice();
            $('.result').css('display', 'none');
            if (currentCell) {
                const data = {
                    gamePointId: pointId,
                    gameId: gameId,
                    beginTime: currentCell.toISOString(),
                    endTime: currentCell.toISOString(),
                    leftPlayers: leftPlayers,
                    playersNumber: countPeople
                };
                getSlots(data);
            }
        }
    });
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
        if (price !== undefined) {
            $('#nav-home-tab').removeClass('active');
            $('#nav-profile-tab').addClass('active');
            $('#nav-home').removeClass('show active');
            $('#nav-profile').addClass('show active');
            $('a#nav-profile-tab').css({
                'pointer-events': 'auto',
                'color': '#ffffff'
            });
        }
    });
    linkBacknProfile.on('click', function () {
        $('#nav-home-tab').addClass('active');
        $('#nav-profile-tab').removeClass('active');
        $('#nav-profile').removeClass('show active');
        $('#nav-home').addClass('show active');
    });
    linkNextProfile.on('click', function () {
        this.name = $(".formPay input[name='name']").val();
        this.phone = $(".formPay input[name='phone']").val();
        this.mail = $(".formPay input[name='mail']").val();
        this.notes = $(".formPay input[name='notes']").val();
        if (this.name !== '' && this.phone !== '' && this.mail !== '' && privacy !== false) {
            $('#nav-profile-tab').removeClass('active');
            $('#nav-contact-tab').addClass('active');
            $('#nav-profile').removeClass('show active');
            $('#nav-contact').addClass('show active');
            $('.information #name').text(this.name + ', ');
            $('.information #phone').text(this.phone);
            $('.information #email').text(this.mail + '');
            $('a#nav-contact-tab').css({
                'pointer-events': 'auto',
                'color': '#ffffff'
            });
            $('.selected .date p').text($('.slot__current-day').text());
        } else {
            $('.required-inputs input').each(function() {
                if ($(this).val() === '') {
                    $(this).css('border', '1px solid red');
                } else {
                    $(this).css('border', 'none');
                }
            });
            if (privacy === false) {
                $('label[for="policy"]').css('color', 'red');
            } else {
                $('label[for="policy"]').css('color', 'inherit')
            }
        }
        // else {
        //     $('.inputs input').each(function() {
        //         if (($(this).attr('name') == 'name').text() ==)
        //     });
            // if (this.name === '' && this.phone === '' && this.mail === '') {

                // $('.inputs input[name="name"], .inputs input[name="phone"], .inputs input[name="mail"]').css('border', '1px solid red');
            // }
    });
    linkBackContact.on('click', function () {
        $('#nav-contact-tab').removeClass('active');
        $('#nav-profile-tab').addClass('active');
        $('#nav-contact').removeClass('show active');
        $('#nav-profile').addClass('show active');
    });
});

//Выбор свободного места

function getTotalPrice(price) {
    $('.resultPrice p span').text(countPeople * price);
}

function chooseSlot() {
    $('.booking-slots').on('click', 'td', function() {

        $('.booking-slots').find('td').removeClass('active');
        $(this).addClass('active');
        currentDate = $(this).find('.time').attr("data-time-formatted");
        // price = $(this).find('.price span').text();
        priceWithoutPeople = 0;
        priceWithoutPeople = $(this).find('.price span').text();
        $('.result .referentsQuantity .prcePer').text(priceWithoutPeople);
        if (leftPlayers === true) {
            getTotalPrice(priceWithoutPeople);
        } else {
            $('.resultPrice p span').text(price);
        }

        $('.result').css('display', 'block');
    });
}

function getSlots(data) {
    $('.loader').css('display', 'block');
    $.getJSON('http://var-vision.com/Api/Booking/GetTimeSlots', data, response => {
        $('.loader').css('display', 'none');
        let rowCount = Math.ceil(response.length / 5);
        let table = '';
        let inc = 0;
        let lenghtResponse = 5;
        test2Result = response;
        console.log(response);
        for (var i = 0; i < rowCount; i++) {
            table += '<tr>';
            for(var j = inc; j < lenghtResponse; j++) {
                table += '<td onclick="timeButtonClick(this)" data-array-id="'+ j +'">' +
                    '<div class="time" data-time-formatted="'+ response[j][0].BookingRoomOptionModel.PricingSlotModel.StartTime + '">' + response[j][0].BookingRoomOptionModel.PricingSlotModel.StartTimeFormatted + '</div>' +
                    '<div class="price"><span>' + response[j][0].BookingRoomOptionModel.PricingSlotModel.PricingRule.PricePerPlayer + '</span> р.' + '</div>';
                table += '</td>';
            }
            lenghtResponse += 5;
            if (lenghtResponse > response.length) {
                lenghtResponse = lenghtResponse - (lenghtResponse - response.length);
            }
            inc += 5;
            table += '</tr>';
        }
        $('.booking-slots tbody').html(table);
    });
}

function getTimeSlots() {
    let a = null;
    const calendar = new Calendar(document.querySelector('.calendar__wrapper'), {
        selectebleDate: true,
        selectFunction: function () {

            if($(this).hasClass('active')) return;
            $('.calendar__day--btn.active').removeClass('active');
            $(this).addClass('active');

            $('.result').css('display', 'none');

            currentCell = new Date(this.value);

            const data = {
                gamePointId: pointId,
                gameId: gameId,
                beginTime: currentCell.toISOString(),
                endTime: currentCell.toISOString(),
                leftPlayers: leftPlayers,
                playersNumber: countPeople
            };
            const currentDay = document.querySelector('.slot__current-day');
            currentDay.innerHTML = currentCell.getLocaleString().toUpperCase();
            getSlots(data);
        }
    });

    $(document).ready(() => {
        var poligonsList = $('#poligons__list');
        var poligonsBtns = $('#poligons .poligons__btn');
        var poligonsPrev = $('#poligons .poligons__prev');
        var poligonsNext = $('#poligons .poligons__next');
        var gamesPrev = $('#poligonsgames .poligons__prev');
        var gamesNext = $('#poligonsgames .poligons__next');

        if (poligonsBtns.length > 3) {
            poligonsList.removeClass('without-carousel');
            poligonsList.addClass('owl-carousel');

            $('#poligons__list').owlCarousel({
                nav: true
            });

            poligonsPrev.on('click', function() {
                $('#poligons .owl-nav .owl-prev').trigger('click');
            });

            poligonsNext.on('click', function() {
                $('#poligons .owl-nav .owl-next').trigger('click');
            });

            poligonsPrev.show();
            poligonsNext.show();
        } else
            poligonsList.addClass('without-carousel');

        gamesPrev.on('click', function() {
            $('#poligonsgames .owl-nav .owl-prev').trigger('click');
        });

        gamesNext.on('click', function() {
            $('#poligonsgames .owl-nav .owl-next').trigger('click');
        });

        $('.calendar__control--prev').on('click', () => {
            calendar.prev();
        });
        $('.calendar__control--next').on('click', () => {
            calendar.next();
        });

        const prevControl = document.querySelector('.calendar__control--prev');
        const nextControl = document.querySelector('.calendar__control--next');

        months = calendar.getMonths();

        prevControl.setAttribute('title', months.prev);
        nextControl.setAttribute('title', months.next);

        $('.calendar__control').on('click', () => {
            months = calendar.getMonths();
            prevControl.setAttribute('title', months.prev);
            nextControl.setAttribute('title', months.next);
        });
    });
}
