// input {
//    attendance: 100.0,
//    homework: calculatePercent([[12,12], [14,14]]),
//    final: calculatePercent([[10,10], [6,6], [3,3], [4,4], [4,4]])
// }
// output 100%
function getApiCoursePercent(params = {}) {
  const {
    attendance: attendanceMarkOf100 = 100,
    homework: homeworkMarkOf100 = 0,
    final: finalMarkOf100 = 0,
  } = params;
  const attendanceWeight = ((attendanceMarkOf100 / 100) * (1 / 3) * 100);
  const homeworkWeight = ((homeworkMarkOf100 / 100) * (27 / 100) * 100);
  const finalWeight = ((finalMarkOf100 / 100) * (4 / 10) * 100);

  return Math.round(attendanceWeight + homeworkWeight + finalWeight);
}

function getJqueryCoursePercent(skillMarkOf100, attendanceMarkOf100 = 100) {
  const skills = ((skillMarkOf100 / 100) * (2 / 3) * 100);
  const attendance = ((attendanceMarkOf100 / 100) * (1 / 3) * 100);

  return Math.round(skills + attendance);
}

// input [[1,2], [8,16]]
// output 50%
function calculatePercent(marks) {
  let earned = 0;
  let total = 0;

  marks.forEach((mark) => {
    earned += mark[0];
    total += mark[1];
  });

  return Math.round((earned / total) * 100);
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getApiCoursePercent,
    getJqueryCoursePercent,
    calculatePercent,
  };
}

function getDateDay(date) {
  const d = new Date(date);
  let month = (d.getMonth() + 1).toString();
  let day = d.getDate().toString();
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join('-');
}

function getDateStart(date) {
  return `${getDateDay(date)} 09:00:00`;
}

function getDateEnd(date) {
  return `${getDateDay(date)} 12:17:00`;
}

function createCourseSchedule(courseTitle = 'Dan\'s class') {
  const classes = [];
  const weeklyClassInterval = Array(11).fill(7);
  let classCount = weeklyClassInterval.length;
  let betweenClasses = weeklyClassInterval;
  let nextDate = new Date();

  const course = {
    getAllClasses: () => {
      while (betweenClasses.length > 0) {
        classes.push(course.getNextClass());
      }

      return classes;
    },
    getNextClass: () => {
      const day = getDateDay(nextDate);
      const start = getDateStart(nextDate);
      const end = getDateEnd(nextDate);
      const title = `${courseTitle} ${(classCount - betweenClasses.length) + 1}`;

      const daysNextClass = betweenClasses.splice(0, 1);
      nextDate.setHours(24 * daysNextClass);

      return {
        title, day, start, end,
      };
    },
    setDaysBetweenClasses: (between) => {
      classCount = between.length;
      betweenClasses = Array.from(between);
      return course;
    },
    setFirstClassDate: (date) => {
      nextDate = new Date(date.getTime());
      return course;
    },
  };

  return course;
}

function courseCalendar() {
  const firstDateJq = new Date(2019, 3, 3); // Apr 3
  const courseJq = createCourseSchedule('jQuery')
    .setFirstClassDate(firstDateJq)
    .setDaysBetweenClasses([3, 4, 3, 4, 7, 7, 7, 7, 7, 7, 7]);

  const firstDateApi = new Date(2019, 5, 5); // Jun 5
  const courseApi = createCourseSchedule('API')
    .setFirstClassDate(firstDateApi)
    .setDaysBetweenClasses([7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7]);
  const events = courseJq.getAllClasses().concat(courseApi.getAllClasses());

  // Update times specifically on weekend
  events[1].start = '2019-04-06 10:30:00';
  events[1].end = '2019-04-06 13:45:00';

  events[3].start = '2019-04-13 10:30:00';
  events[3].end = '2019-04-13 13:45:00';

  $('#calendar').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay,listWeek',
    },
    firstDay: 1, // Monday start
    defaultDate: getDateDay(new Date()),
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    events,
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    courseCalendar,
    getDateDay,
    getDateStart,
    getDateEnd,
    createCourseSchedule,
  };
}

const applyImageRollover = () => {
  const handleIn = function handleIn() {
    const sourcePath = $(this).attr('src');
    const secondaryPath = $(this).attr('data-secondary');

    $(this)
      .attr('data-primary', sourcePath)
      .attr('src', secondaryPath);
  };

  const handleOut = function handleOut() {
    const primaryPath = $(this).attr('data-primary');
    $(this).attr('src', primaryPath);
  };

  $('.js-rollover').hover(handleIn, handleOut);

  // const handleInClassic = function handleInClassic() {
  //   const sourcePath = this.src;
  //   const secondaryPath = this.getAttribute('data-secondary');

  //   this.setAttribute('data-primary', sourcePath);
  //   this.src = secondaryPath;
  // };

  // const handleOutClassic = function handleOutClassic() {
  //   const primaryPath = this.getAttribute('data-primary');
  //   this.setAttribute('src', primaryPath);
  // };

  // Array.from(document.querySelectorAll('.js-rollover')).forEach((img) => {
  //   img.addEventListener('mouseover', handleInClassic);
  //   img.addEventListener('mouseout', handleOutClassic);
  // });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    applyImageRollover,
  };
}

/* global salesTaxData */

// $.each(salesTaxData, (index, value) =>
// {
//   $('body').append(`Province ${index}: ${value}. <br>`)
// })
const pizzaSales = () => {
  // looping over all data to separate the key and value of the object
  $.each(salesTaxData.provinces, (key, value) => {
    // getting the selected input from DOM
    const selectedProvince = document.getElementById('provinces').value;
    // Adding all data into the DOM select option
    $('#provinces').append(`<option>${value.name}</option>`);
    // Displaying the Abreviated name on the DOM
    $('section').append(`<br>Abbreviated Name is ${key} and Full Name is ${value.name}.<br>`);
    // Displaying the tax on the DOM
    $('section').append(`Federal tax for ${key} is $${value.taxes[0].tax}.<br>`);
    // If input selection does not match the data name then console log nothing...
    if (`${selectedProvince} != ${value.name}`) { console.log('nothing was selected yet.'); } else {
    // Else console log the tax as per province.
      console.log(`${selectedProvince}'s taxes are ${salesTaxData.provinces[0].taxes[0].tax}.`);
    }
  });

  $('#provinces').change(() => {
    console.log(`${document.getElementById('provinces').value}'s taxes are: ${salesTaxData.provinces[0].taxes[0].tax}`);
  });
};

// $('#provinces').blur(() => { console.log('hello'); });
// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    pizzaSales,
  };
}
