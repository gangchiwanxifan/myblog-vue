// import moment from 'moment';

export function timeTransform(time) {
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const gap = new Date().getTime() - new Date(time).getTime();
  if (gap / day >= 1) {
    return time;
  } else if (gap / hour >= 1) {
    return Math.floor(gap / hour) + "小时前";
  } else if (gap / minute >= 1) {
    return Math.floor(gap / minute) + "分钟前";
  } else {
    return "刚刚";
  }
}

export function timeFix() {
  const time = new Date();
  const hour = time.getHours();
  return hour < 9
    ? "早上好"
    : hour <= 11
    ? "上午好"
    : hour <= 13
    ? "中午好"
    : hour < 20
    ? "下午好"
    : "晚上好";
}

export function welcome() {
  const arr = [
    "休息一会儿吧",
    "准备吃什么呢?",
    "要不要打一把 DOTA",
    "我猜你可能累了",
  ];
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

export function scorePassword(pass) {
  let score = 0;
  if (!pass) {
    return score;
  }
  const variations = {
    digits: /\d/.test(pass),
    lower: /[a-z]/.test(pass),
    upper: /[A-Z]/.test(pass),
    nonWords: /\W/.test(pass),
  };

  let variationCount = 0;
  for (var check in variations) {
    variationCount += variations[check] === true ? 1 : 0;
  }
  score += variationCount * 10;

  return parseInt(score);
}
