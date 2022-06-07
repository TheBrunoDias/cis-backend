import { format, parse } from 'date-fns';

const phoneAndDocumentFormat = (s: string) => s.replace(/\D/g, '');

const dateToStringFormat = (d: Date) => format(d, 'dd/MM/yyyy');

const stringHourValidation = (s: string) => {
  var regex = /^(\d{2}):(\d{2})$/gm;
  var valid = regex.test(s);

  if (!valid) throw new Error(`A valor ${s} informado deve estar no formato HH:mm`);
};

const stringToDateFormat = (s: string) => parse(s, 'yyyy-MM-dd', new Date());

const stringHourToHourDateFormat = (s: string) => {
  var date = parse(s, 'HH:mm', new Date());
  date.setHours(date.getHours() - date.getTimezoneOffset() / 60);

  return date;
};

export {
  phoneAndDocumentFormat,
  dateToStringFormat,
  stringToDateFormat,
  stringHourToHourDateFormat,
  stringHourValidation,
};
