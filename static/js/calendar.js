!(() => {

    const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        monthNames = [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ];

    Date.prototype.getLocaleString = function() {
        const currentMonth = this.getMonth();

        let monthName = monthNames[currentMonth];

        if(currentMonth == 2 || currentMonth == 7)
            monthName += 'а';
        else monthName = monthName.substring(0, monthName.length - 1) + 'я';

        return this.getDate() + ' ' + monthName + ' ' + this.getFullYear();
    };

    let actualDate = new Date();

    const isActualDay = (year, month, day) =>
        day === actualDate.getDate()
        && month === actualDate.getMonth()
        && year === actualDate.getFullYear()
    ;

    const renderCalendar = async (element, options) => {

        const year = options.year,
            month = options.month;

        actualDate = new Date();

        const date = new Date(year, month + 1, 0),
            lastDate = date.getDate(),
            lastDay = date.getDay(),
            firstDay = new Date(year, month, 1).getDay()
        ;

        let unsafeTR = true;

        let calendar = (options.wrapper ? '<div class="calendar__wrapper">' : '' ) + '<p class="calendar__month-title">'+ monthNames[date.getMonth()] + ' ' + date.getFullYear() + '</p><table class="calendar__table"><thead><tr>';

        for(let i = 0; i < 7; ++i) {
            calendar += '<th><span>' + dayNames[i] + '</span></th>';
        }

        calendar += '</tr></thead><tbody><tr>';

        const range = firstDay == 0 ? 6 : firstDay;

        for(let i = Number(firstDay != 0); i < range; ++i) {
            calendar += '<td>&nbsp;</td>';
        }

        for(var i = 1; i <= lastDate; ++i) {
            calendar += '<td data-date="' + year + '-' + (month + 1) + '-' + i + '" ' + (isActualDay(date.getFullYear(), date.getMonth(), i) ? ' class="calendar__current-day"' : '') + '><span>' + i + '</span></td>';

            if(((i + (7 - (7 - firstDay + 1))) % 7) == 0) {
                calendar += '</tr>';
                if(i != lastDate) {
                    calendar += '<tr>';
                } else unsafeTR = false;
            }
        }

        if(unsafeTR) {
            for(let i = lastDay; i < 7; ++i) {
                calendar += '<td>&nbsp;</td>';
            }
            calendar += '</tr>';
        }

        calendar += '</tbody></table>' + (options.wrapper ? '</div>' : '');

        element.innerHTML = calendar;

        if(options.selectebleDate) {

            const calendarCells = element.getElementsByTagName('td');

            for(const cell of calendarCells) {
                if('date' in cell.dataset) {
                    cell.onclick = options.selectFunction;
                }
            }
        }
    };

    function Calendar (element, options = {
        year: actualDate.getFullYear(),
        month: actualDate.getMonth(),
        // weekNumber: false,
        wrapper: false,
        selectebleDate: false,
        selectFunction: undefined,
        controls: false,
        // controlsElements
    }) {

        if(!(element instanceof HTMLElement))
            throw Error('Calendar element is not specified');

        options = {
            year: options.year || actualDate.getFullYear(),
            month: options.month || actualDate.getMonth(),
            // weekNumber: options.weekNumber || false,
            wrapper: options.wrapper || false,
            selectebleDate: options.selectebleDate || false,
            selectFunction: typeof options.selectFunction === "function" ? options.selectFunction : undefined
        };

        renderCalendar(element, options);

        return {
            element,
            options,
            next: function () {
                if(this.options.month == 11) {
                    this.options.month = 0;
                    this.options.year++;
                } else this.options.month++;
                renderCalendar(this.element, this.options);
            },
            prev: function () {
                if(this.options.month == 0) {
                    this.options.month = 11;
                    this.options.year--;
                } else this.options.month--;
                renderCalendar(this.element, this.options);
            }
        };
    }

    window.Calendar = Calendar;
})();
