/**
 * 날짜를 한국어 형식으로 포맷팅하는 유틸리티 함수들
 */

/**
 * 날짜를 'YYYY년 MM월 DD일' 형식으로 변환
 * @param date 변환할 날짜
 * @returns 포맷팅된 날짜 문자열
 */
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}년 ${month}월 ${day}일`;
};

/**
 * 날짜를 'YYYY년 MM월 DD일 HH:mm' 형식으로 변환
 * @param date 변환할 날짜
 * @returns 포맷팅된 날짜와 시간 문자열
 */
export const formatDateTime = (date: Date | string): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
};

/**
 * 날짜를 'YYYY년 MM월 DD일 HH시 mm분 ss초' 형식으로 변환
 * @param date 변환할 날짜
 * @returns 포맷팅된 날짜와 시간 문자열
 */
export const formatDateTime2 = (date: Date | string): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");

  return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분 ${seconds}초`;
};

/**
 * 날짜를 'YYYY년 MM월 DD일 (요일) HH시 mm분 ss초' 형식으로 변환
 * @param date 변환할 날짜
 * @returns 포맷팅된 날짜와 시간 문자열
 */
export const formatDateTime3 = (date: Date | string): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");
  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];
  return `${year}년 ${month}월 ${day}일 (${dayOfWeek}) ${hours}시 ${minutes}분 ${seconds}초`;
};

/**
 * 상대적 시간을 표시 (예: 3분 전, 2시간 전, 1일 전)
 * @param date 변환할 날짜
 * @returns 상대적 시간 문자열
 */
export const formatRelativeTime = (date: Date | string): string => {
  const d = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "방금 전";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays}일 전`;
  }

  return formatDate(d);
};
