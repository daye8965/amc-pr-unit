# amc-pr-unit

서울아산병원 **언론유닛 홍보 실적 대시보드 (2021–2026)**.
연도별 보도자료·언론보도 실적을 탭으로 나눠 보고, PDF로 출력해 보고서로 씁니다.

- 공개 주소: https://daye8965.github.io/amc-pr-unit/

## 구조

단일 파일 정적 페이지입니다. `index.html` 하나가 전부이고 (`test.html`은 실험용), 빌드 과정이 없습니다.

- 라이브러리: Chart.js, html2canvas, jsPDF (CDN)
- 탭: `overview`(전체 현황) / `compare`(연도별 비교) / `y2026`(2026년 상세) / `dept`(진료과 분석) / `staff`(담당자 현황) / `terms`(키워드·브랜딩)

## 데이터 (중요)

**데이터는 저장소에 없습니다.** 페이지가 열릴 때 Google Apps Script 엔드포인트(`GOOGLE_APPS_SCRIPT_URL`, `index.html` 상단)를
`fetch`해서 Google Sheets의 실적을 받아 `ALL_DATA`에 채웁니다.

받아오는 필드: `year, month, type, staff, title, dept, media, doctor`

따라서:

- **실적을 고치려면 저장소가 아니라 Google Sheet를 고쳐야 합니다.** 코드를 바꿔도 수치는 변하지 않습니다.
- 시트나 Apps Script 배포가 막히면 대시보드가 빈 화면이 됩니다. 수치가 안 나올 때 코드부터 의심하지 마세요.
- 오프라인에서는 동작하지 않습니다.

## 작업할 때 주의

- 모든 차트는 하드코딩 값이 아니라 `ALL_DATA`에서 계산하도록 정리해 둔 상태입니다. 새 차트도 `ALL_DATA` 기준으로 만드세요.
- 보도자료는 **연도+월+제목** 키로 중복 제거합니다(`type === '보도자료'`인 행만). 이 키가 깨지지 않게 하세요.
- 진료과·담당자·연도 필터가 서로 엮여 있으니, 한쪽을 고치면 나머지 필터에서도 확인하세요.
- PDF 출력이 주 용도입니다. 레이아웃을 바꾸면 PDF 저장 결과까지 확인하세요.
- 커밋 메시지는 영문 명령형 한 줄이 많습니다.
- 확인: `python -m http.server 8765` 후 `http://localhost:8765/` (시트 접근이 되어야 데이터가 뜹니다)
