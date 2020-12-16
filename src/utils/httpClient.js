import axios from 'axios';

const URL = 'https://my.api.mockaroo.com/';

export default axios.create({
  baseURL: URL,
  timeout: 10000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'X-API-Key': '38effba0'
  }
});

function get(url) {
  if (url === '/surgery')
    return {
      data: [
        {
          id: 1,
          label: 'Fimose',
          count: 13
        },
        {
          id: 2,
          label: 'Hérnia inguinal',
          count: 27
        },
        {
          id: 3,
          label: 'Hernia umbilical',
          count: 7
        },
        {
          id: 4,
          label: 'Frio lingual curto',
          count: 6
        },
        {
          id: 5,
          label: 'Hipospádia',
          count: 19
        },
        {
          id: 6,
          label: 'Testículos não descidos',
          count: 8
        }
      ]
    };
  if (url === '/patient')
    return {
      data: [
        {
          id: 1,
          fullName: 'Bobbie Raynes',
          birthDate: '2020-01-08 02:16:03',
          city: 'Jarry',
          handbookNumber: 752,
          motherName: 'Cyb Heddon',
          sex: 'F',
          statusId: 1,
          surgeryId: 2,
          weight: 10,
          bedNumber: 30
        },
        {
          id: 2,
          fullName: 'Shepperd Gudde',
          birthDate: '2020-06-06 12:24:29',
          city: 'Ordos',
          handbookNumber: 336,
          motherName: 'Amble Claworth',
          sex: 'M',
          statusId: 0,
          surgeryId: 1,
          weight: 5,
          bedNumber: 79
        },
        {
          id: 3,
          fullName: 'Mildrid Peyes',
          birthDate: '2020-11-10 12:36:13',
          city: 'Krouna',
          handbookNumber: 141,
          motherName: 'Vi Rouf',
          sex: 'F',
          statusId: 2,
          surgeryId: 2,
          weight: 8,
          bedNumber: 46
        },
        {
          id: 4,
          fullName: 'Roberta Landsborough',
          birthDate: '2020-05-27 20:38:14',
          city: 'Kedungbulu',
          handbookNumber: 510,
          motherName: 'Guglielma Cabena',
          sex: 'F',
          statusId: 1,
          surgeryId: 0,
          weight: 1,
          bedNumber: 39
        },
        {
          id: 5,
          fullName: 'Annecorinne Kiddey',
          birthDate: '2020-12-03 13:18:40',
          city: 'Łopuszno',
          handbookNumber: 74,
          motherName: 'Melody Fossick',
          sex: 'F',
          statusId: 1,
          surgeryId: 2,
          weight: 10,
          bedNumber: 15
        },
        {
          id: 6,
          fullName: 'Reina Faraker',
          birthDate: '2020-02-03 17:54:48',
          city: 'Pereleshino',
          handbookNumber: 847,
          motherName: 'Bert Yarrow',
          sex: 'F',
          statusId: 2,
          surgeryId: 0,
          weight: 8,
          bedNumber: 84
        },
        {
          id: 7,
          fullName: 'Helene Ellit',
          birthDate: '2020-05-11 12:27:20',
          city: 'Tatebayashi',
          handbookNumber: 178,
          motherName: 'Sandye How to preserve',
          sex: 'F',
          statusId: 0,
          surgeryId: 2,
          weight: 3,
          bedNumber: 55
        },
        {
          id: 8,
          fullName: 'Lorry Greenhow',
          birthDate: '2020-09-07 09:09:25',
          city: 'Hedian',
          handbookNumber: 962,
          motherName: 'Karee Clitherow',
          sex: 'F',
          statusId: 2,
          surgeryId: 0,
          weight: 10,
          bedNumber: 36
        },
        {
          id: 9,
          fullName: 'Hymie Craske',
          birthDate: '2020-07-29 11:52:59',
          city: 'Mae Hi',
          handbookNumber: 748,
          motherName: 'Christophe McFaell',
          sex: 'M',
          statusId: 0,
          surgeryId: 0,
          weight: 8,
          bedNumber: 55
        },
        {
          id: 10,
          fullName: 'Keelia Markl',
          birthDate: '2020-05-29 05:02:49',
          city: 'Abū Sunbul',
          handbookNumber: 185,
          motherName: 'Karita Snoad',
          sex: 'F',
          statusId: 0,
          surgeryId: 0,
          weight: 3,
          bedNumber: 96
        }
      ]
    };
  if (url === '/patient/1')
    return {
      data: {
        id: 1,
        fullName: 'Bobbie Raynes',
        birthDate: '2020-01-08 02:16:03',
        city: 'Jarry',
        handbookNumber: 752,
        motherName: 'Cyb Heddon',
        sex: 'F',
        statusId: 1,
        surgeryId: 2,
        weight: 10,
        bedNumber: 30
      }
    };
}

function post() {
  return 'batata';
}
