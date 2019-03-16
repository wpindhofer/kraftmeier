export default class DateFormatHelper {

    static dateLocale='de-DE';

    static setDateLocale(localeString) {
        this.dateLocale=localeString;
    }

    static getFormattedData(date) {
        let dateObj = new Date(date);
        if(Object.prototype.toString.call(dateObj) === '[object Date]' && !isNaN(dateObj.getTime()))
            return new Intl.DateTimeFormat(this.dateLocale).format(dateObj);
        else
            return date;
    }

    // 'de-DE'
}

