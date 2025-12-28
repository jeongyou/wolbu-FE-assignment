import type { ServerErrorResponse } from './types';

/**
 * HTTP 요청 실패 시 throw 되는 커스텀 에러 정의
 *
 * - status: HTTP 상태 코드
 * - payload: 서버에서 내려준 에러 응답(JSON)
 *
 * 서버 오류 / 네트워크 오류를 하나의 타입으로 통일해
 * 호출부에서 instanceof HttpError 기준으로 처리할 수 있게 한다.
 */
export class HttpError extends Error {
  status: number;
  payload: ServerErrorResponse;

  constructor(status: number, payload: ServerErrorResponse) {
    super(payload.message);
    this.name = 'HttpError';
    this.status = status;
    this.payload = payload;
  }
}
