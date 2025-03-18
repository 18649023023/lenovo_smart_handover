//日期戳转换日期格式
const dateformats = (dateString: any) => {
  let date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedDate = `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;
  return formattedDate
}
//日期戳转换日期格式
const monthformats = (dateString: any) => {
  let date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const formattedDate = `${year}/${month.toString().padStart(2, '0')}`;
  return formattedDate
}
//日期戳转换日期格式
const tabledateformats = (dateString: any) => {
  let date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  return formattedDate
}
//日期戳转换日期+时分秒格式
const timeformats = (timeString: any) => {
  const date = new Date(timeString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const formattedDate = `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  return formattedDate
}
//日期戳转换日期+时分秒格式
const tabletimeformats = (timeString: any) => {
  const date = new Date(timeString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
  return formattedDate
}
//近一周
const last_week = () => {
  // 获取当前日期
  let currentDate = new Date();
  // 计算一周前的日期
  let oneWeekAgo = new Date();
  oneWeekAgo.setDate(currentDate.getDate() - 6 * 1);
  let currentDateString = dateformats(currentDate);
  let oneWeekAgoString = dateformats(oneWeekAgo);
  // 输出结果
  return { startDate: oneWeekAgoString, endDate: currentDateString }
}
//近一个月
const last_month = () => {
  // 获取当前日期
  let currentDate = new Date();

  // 计算一个月前的日期
  let oneMonthAgo = new Date();
  oneMonthAgo.setMonth(currentDate.getMonth() - 1);

  // 格式化日期为字符串
  let currentDateString = dateformats(currentDate);
  let oneMonthAgoString = dateformats(oneMonthAgo);

  // 输出结果
  return { startDate: oneMonthAgoString, endDate: currentDateString }
}
//上个季度
const last_quarter = () => {
  // 获取当前日期
  let currentDate = new Date('2022-04-01');
  let currentMonth = currentDate.getMonth() + 1
  let year = currentDate.getFullYear()
  // 判断当前季度
  let currentQuarter;
  if (currentMonth >= 1 && currentMonth <= 3) {
    currentQuarter = 1;
  } else if (currentMonth >= 4 && currentMonth <= 6) {
    currentQuarter = 2;
  } else if (currentMonth >= 7 && currentMonth <= 9) {
    currentQuarter = 3;
  } else {
    currentQuarter = 4;
  }
  return getQuarter(year, currentQuarter)
}
const getQuarter = (year: any, quarter: any) => {

  if (quarter - 1 == 0) {
    year -= 1;
    quarter = 4
  } else {
    quarter -= 1
  }
  if (quarter == 1) {
    return { startDate: `${year}/01/01`, endDate: `${year}/03/31` }
  } else if (quarter == 2) {
    return { startDate: `${year}/04/01`, endDate: `${year}/06/30` }
  } else if (quarter == 3) {
    return { startDate: `${year}/07/01`, endDate: `${year}/09/30` }
  } else {
    return { startDate: `${year}/10/01`, endDate: `${year}/12/31` }
  }
}
//近半年
const last_half_year = () => {
  let date = new Date()
  // 获取给定日期的年份和月份
  let year = date.getFullYear();
  let month = date.getMonth() + 1;

  // 计算起止日期
  let startDate = new Date(year, month - 7, 1);
  let endDate = new Date(year, month - 1, 0);

  // 格式化日期为字符串

  let startDateString = dateformats(startDate);
  let endDateString = dateformats(endDate);

  // 返回起止日期
  return {
    startDate: startDateString,
    endDate: endDateString
  };
}
//上半年
const up_half_year = () => {
  let date = new Date()
  // 获取给定日期的年份和月份
  let year = date.getFullYear();

  // 计算起止日期
  let startDate = new Date(year, 0, 1);
  let endDate = new Date(year, 6, 0);

  // 格式化日期为字符串

  let startDateString = dateformats(startDate);
  let endDateString = dateformats(endDate);

  // 返回起止日期
  return {
    startDate: startDateString,
    endDate: endDateString
  };
}
//下半年
const down_half_year = () => {
  let date = new Date()
  // 获取给定日期的年份和月份
  let year = date.getFullYear();

  // 计算起止日期
  let startDate = new Date(year, 6, 1);
  let endDate = new Date(year, 12, 0);

  // 格式化日期为字符串

  let startDateString = dateformats(startDate);
  let endDateString = dateformats(endDate);

  // 返回起止日期
  return {
    startDate: startDateString,
    endDate: endDateString
  };
}
//当年
const current_year = () => {
  let date = new Date()
  // 获取给定日期的年份和月份
  let year = date.getFullYear();

  // 计算起止日期
  let startDate = new Date(year, 0, 1);
  let endDate = new Date(year, 12, 0);

  // 格式化日期为字符串

  let startDateString = dateformats(startDate);
  let endDateString = dateformats(endDate);

  // 返回起止日期
  return {
    startDate: startDateString,
    endDate: endDateString
  };
}
//近一年
const last_one_year = () => {
  let currentDate = new Date();

  // 获取当前日期的年份、月份和日期
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();
  let currentDay = currentDate.getDate();

  // 计算起始日期
  let startDate = dateformats(new Date(currentYear - 1, currentMonth, currentDay));

  // 计算结束日期
  let endDate = dateformats(currentDate);

  // 返回起止日期
  return {
    startDate,
    endDate
  };

}
//通过年月返回共多少天数
const getDaysInMonth = (year: any, month: any) => {
  // console.log("获取天数", year, month)
  // 创建一个新的Date对象，将年份和月份作为参数传入
  // 注意，月份是从0开始的，所以需要将传入的月份减1
  var date = new Date(Number(year), Number(month) - 1, 1);

  // 将日期设置为下个月的第0天，即当前月的最后一天
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  // console.log(date.getDate())
  // 返回当前月的天数
  return date.getDate();
}
//月份标题转换大写
const exchange_month = (m: any) => {
  switch (m) {
    case '01':
      return '一';
    case '02':
      return '二';
    case '03':
      return '三';
    case '04':
      return '四';
    case '05':
      return '五';
    case '06':
      return '六';
    case '07':
      return '七';
    case '08':
      return '八';
    case '09':
      return '九';
    case '10':
      return '十';
    case '11':
      return '十一';
    case '12':
      return '十二';

    default:
      '一';
  }
}
//月份标题转换小写
const init_exchange_month = (m: any) => {
  // console.log("月份标题转换小写",m)
  switch (m) {
    case '一':
      return '01';
    case '二':
      return '02';
    case '三':
      return '03';
    case '四':
      return '04';
    case '五':
      return '05';
    case '六':
      return '06';
    case '七':
      return '07';
    case '八':
      return '08';
    case '九':
      return '09';
    case '十':
      return '10';
    case '十一':
      return '11';
    case '十二':
      return '12';

    default:
      '一';
  }
}
//通过起止年月获取所有年月
const getAllMonths = (y1: any, m1: any, y2: any, m2: any) => {
  let startDate = new Date(Number(y1), Number(m1) - 1); // 起始年月
  let endDate = new Date(Number(y2), Number(m2) - 1); // 结束年月
  let startYear = startDate.getFullYear();
  let startMonth = startDate.getMonth();
  let endYear = endDate.getFullYear();
  let endMonth = endDate.getMonth();
  let months = [];

  for (let year = startYear; year <= endYear; year++) {
    let monthStart = year === startYear ? startMonth : 0;
    let monthEnd = year === endYear ? endMonth : 11;

    for (var month = monthStart; month <= monthEnd; month++) {
      let dd = new Date(year, month)
      let m = dd.getMonth() + 1 > 9 ? dd.getMonth() + 1 : '0' + (dd.getMonth() + 1)
      months.push(`${dd.getFullYear()}/${m}`);
    }
  }
return months
  // 输出所有年月
//   months.forEach((date:any)=> {
//   var year = date.getFullYear();
//   var month = date.getMonth() + 1;
  
// });
  
}





export default {
  getAllMonths,
  getDaysInMonth,
  up_half_year,
  down_half_year,
  current_year,
  dateformats,
  tabledateformats,
  timeformats,
  tabletimeformats,
  last_month,
  last_week,
  last_quarter,
  last_half_year,
  last_one_year,
  exchange_month,
  init_exchange_month,
  monthformats
}