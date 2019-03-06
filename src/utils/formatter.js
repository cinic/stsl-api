class DateFormatter {
  constructor(date = new Date()) {
    this.date = date;
    this.hours = date.getHours();
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds()
    this.month = date.getMonth() + 1;
    this.day = date.getDate();
    this.year = date.getFullYear().toString().substr(2);
  }
  
  short () {
    // Simple dirty code :)
    const hours = this.hours < 10 ? `0${this.hours}` : this.hours;
    const minutes = this.minutes < 10 ? `0${this.minutes}` : this.minutes;
    const seconds = this.seconds < 10 ? `0${this.seconds}` : this.seconds;
    const month = this.month < 10 ? `0${this.month}` : this.month;
    const day = this.day < 10 ? `0${this.day}` : this.day;

    return `${month}/${day}/${this.year} ${hours}:${minutes}:${seconds}`;
  }
}

module.exports = DateFormatter;
