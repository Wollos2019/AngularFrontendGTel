import { HoliDay, IHoliDay } from '../config/model/holiDay.model';

export const NombreJourMois = (mois: number, annee: number) => {
  var nbreJour = 0;

  if (mois <= 6) {
    if (mois % 2 == 0) {
      nbreJour = 31;
    } else {
      nbreJour = 30;
    }
  } else {
    if (mois % 2 == 1) {
      nbreJour = 30;
    } else {
      nbreJour = 31;
    }
  }
  if (mois == 1) {
    if (annee % 4 == 0) {
      if (annee % 100 == 0) {
        if (annee % 400 == 0) {
          nbreJour = 29;
        } else {
          nbreJour = 28;
        }
      } else {
        nbreJour = 29;
      }
    } else {
      nbreJour = 28;
    }
  }

  return nbreJour;
};

export const dayMonthHolidayYearCurrent = (holiDay: IHoliDay[]): any => {
  let arr: Array<{ day: number; month: number }> = [];
  for (let index = 0; index < holiDay.length; index++) {
    const element = holiDay[index];
    arr.push({
      day: new Date(String(element.date)).getDate(),
      month: new Date(String(element.date)).getMonth() + 1,
    });
  }

  return arr;
};
