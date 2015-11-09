window.onload = function() {
  var today = new Date();
  var year = today.getFullYear();

  // init moment with current locale
  var locale = window.navigator.userLanguage || window.navigator.language;
  moment.locale(locale);
  moment.initCalendarDays(config);

  // set month title  column
  var months = moment.months();
  $('.colHeader').each(function(index) {
    $(this).html(months[index]);
    initMonth(index, year);
  });

  // mark current day
  var dayKey = pad2(today.getDate()) + pad2(today.getMonth() + 1);
  addClassForDate(dayKey, 'today');
}

function initMonth(month, year) {
  var date  = moment().date(1).month(month).year(year);

  for (var i=1; i <= 31; ++i) {
    var dayKey = pad2(i) + pad2(month + 1);

    if (date.month() === month) {
      $('#d' + dayKey).html(date.format('dd'));
      $('#n' + dayKey).html(date.dayName());

      if ((date.day() === 0) || (date.isFeastDay())){
	    addClassForDate(dayKey, 'sunday');
      }
      else if (date.day() === 6) {
	    addClassForDate(dayKey, 'saturday');
      }
      else {
	    addClassForDate(dayKey, 'weekday');
      }
    }
    else {
      $('#r' + dayKey).html('');
    }
    
    date.add(1, 'days');
  }
}

function pad2(num) {
  return ('0' + num).substr(-2);
}

function addClassForDate(dayKey, clazz) {
  $('#r' + dayKey).addClass(clazz);
  $('#d' + dayKey).addClass(clazz);
  $('#n' + dayKey).addClass(clazz);
}