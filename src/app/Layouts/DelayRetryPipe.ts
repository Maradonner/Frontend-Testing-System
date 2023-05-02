import {delay, mergeMap, Observable, of, retryWhen, throwError} from "rxjs";


export function delayRetryPipe<T>(delayMs = 5000, maxRetry = 3)
{
  let retries = maxRetry;
  let subError: any[] = [];
  return (src: Observable<T>): Observable<T> =>
    src.pipe(
      retryWhen(error =>
        error.pipe(
          delay(delayMs),
          mergeMap(error =>
          {
            subError.push(error);
            return --retries > 0
              ? of(error)
              : throwError({ error: `Превышено максимальное количество попыток ${maxRetry}`, subError })
          })
        )));
}
