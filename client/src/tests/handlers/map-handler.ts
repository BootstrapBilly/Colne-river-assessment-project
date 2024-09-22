import { http, HttpResponse, RequestHandler } from 'msw';

export const entSuccessHandler: RequestHandler = http.get(
  'https://crap-api-635719a27ef1.herokuapp.com/data?parameter=NFP_ENT',
  () =>
    HttpResponse.json(
      [
        {
          siteID: 'Br_1',
          latitude: 51.7895,
          longitude: 1.0155,
          N: 2,
          color: 1,
          value: 18,
        },
        {
          siteID: 'Co_1',
          latitude: 51.8521,
          longitude: 0.9635,
          N: 8,
          color: 4,
          value: 644,
        },
      ],
      { status: 200 }
    )
);
