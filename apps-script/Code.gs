/**
 * 언론유닛 대시보드 데이터 API (Google Apps Script)
 *
 * 실제로 도는 코드는 Apps Script 쪽에 있고, 이 파일은 저장소에 두는 사본입니다.
 * 여기만 고치면 아무 일도 일어나지 않습니다. 반드시 편집기에 붙여넣고 재배포해야 합니다.
 *
 * 배포 (URL을 유지하려면 반드시 이 경로로):
 *   배포 > 배포 관리 > 연필(편집) > 버전: 새 버전 > 배포
 *   "새 배포"를 누르면 URL이 바뀌어 index.html 의 GOOGLE_APPS_SCRIPT_URL 도 같이 고쳐야 합니다.
 *
 * 현재 배포 ID: AKfycbwnDpYwXnzNtfs7zCl-HY-AitPOfiyw503RjaRm3lQv73Hn_r9Ry-zs0IQdC8x1pEnC1Q
 * 2026-09-22 버전 5 기준.
 */
function doGet() {
  try {
    // 팀 원본 "언론유닛 업무 공유" (asanpr.members@gmail.com 소유, 공유받은 문서).
    // 2026-09-22 이전에는 개인 사본(18ueYvkr...)을 보고 있어서 6월 19일 이후 실적이 반영되지 않았습니다.
    const sheet = SpreadsheetApp.openById('15mRKud-otGhbvY5efenonaZxjlHGKRMhDU9LmoAA2WA')
      .getSheetByName('언론 업무');

    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({error: "Sheet not found"}))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 열 순서 고정: 완 / 년도 / 월 / 게재일 / 구분 / 담당 / 제목·내용 / 진료과 / 의료진 / 요청 / 비고 / 배포범위
    // 시트에서 열을 추가하거나 옮기면 아래 인덱스도 같이 고쳐야 합니다.
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 12).getValues();

    const records = data.map(row => ({
      year: row[1],
      month: row[2],
      type: row[4],
      staff: row[5],
      title: row[6],
      dept: row[7],
      doctor: row[8],
      media: row[11]
    })).filter(r => r.year);

    return ContentService.createTextOutput(JSON.stringify(records))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({error: e.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
