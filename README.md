# **DA WHISKY - FrontEnd**

[![유튜브 소개 영상](https://img.youtube.com/vi/WFIsjYjPs0E/0.jpg)](https://www.youtube.com/watch?v=WFIsjYjPs0E)

_(👆 클릭 시 소개 영상 페이지로 이동합니다.)_

<br />

## **🥃 프로젝트 소개**

### 🍹 다위스키?

DA WHISKY(다위스키)는 "위스키를 더 쉽게, 깊이 알아갈 수 있는 곳이 없을까?" 라는 물음에서 시작되었습니다. <br />
**위스키 검색, 기록, 위스키바 탐색 및 줄서기 기능** 까지 - **위스키 경험을 더욱 풍부하게 만들어 주는 온라인 플랫폼** 입니다. <br />

<br />

DA WHISKY는 다음과 같은 기능을 제공합니다.

- **카테고리별 위스키 조회, 해당 위스키에 대한 맛 평가 기록**

- **내 주변 또는 설정한 위치를 중심으로 한 위스키바 조회**

- **조회한 위스키바가 보유 중인 위스키 조회 및 실시간 줄서기, 입장 알림**

- **전직 바텐더의 입문용 위스키 큐레이션, 위스키 검색**

<br />

### 🖼️ 브로슈어

<details>
  <summary>좌측의 화살표 아이콘(▶︎) 클릭 시 토글을 열어 확인할 수 있습니다.</summary>
  <div markdown="1">

  <p align="center"><img src="https://github.com/dawhisky/dawhisky-FE/assets/84097192/e649a1f4-3c32-48c5-93c0-b2677cd67c58" alt="다위스키 브로슈어_1"></p>
  <p align="center"><img src="https://github.com/dawhisky/dawhisky-FE/assets/84097192/6123c079-0f70-45e1-8e03-67d6a8585af6" alt="다위스키 브로슈어_2"></p>
  <p align="center"><img src="https://github.com/dawhisky/dawhisky-FE/assets/84097192/0eb3a5fa-d699-4883-bf48-f8e0cb880d97" alt="다위스키 브로슈어_3"></p>
  <p align="center"><img src="https://github.com/dawhisky/dawhisky-FE/assets/84097192/ef38df02-ec10-455a-8459-a61880a1a0c2" alt="다위스키 브로슈어_4"></p>
  <p align="center"><img src="https://github.com/dawhisky/dawhisky-FE/assets/84097192/7f5b4667-e7db-4591-a07d-22d41b3da1c4" alt="다위스키 브로슈어_5"></p>

  </div>
</details>

<br />

### ⏰ 개발 일정

| 기간 | 일정 |
| --- | --- |
| 23/05/19 ~ 23/05/21 | 프로젝트 주제 및 일정 수립 |
| 23/05/22 ~ 23/05/28 | UI 디자인 및 와이어프레임 구현 |
| 23/05/29 ~ 23/06/04 | 화면 구현 및 MVP 1차 스코프 기능 구현 |
| 23/06/05 ~ 23/06/18 | 1차 기능 피드백 수정 및 MVP 2차 스코프 기능 구현 |
| 23/06/19 ~ 23/06/25 | 유저 배포 및 유저 테스트 피드백 반영 |

<br />

### 관련 링크

| 구분 | 링크 바로가기 |
| --- | --- |
| <img src="https://github.com/dawhisky/dawhisky-FE/assets/84097192/e7224472-3ca0-4a45-88d1-f13075911d23" alt="다위스키 아이콘" style="width: 20px; height: 20px; padding-top: 10px;"> | [서비스](https://dawhisky.vercel.app) _(운영 종료로 일부 UI만 확인 가능합니다.)_ |
| <img src="https://github.com/dawhisky/dawhisky-FE/assets/84097192/ad8ad10c-7bce-4157-bf21-238d672086c9" alt="노션 아이콘" style="width: 20px; height: 20px; padding-top: 10px;"> | [개발 팀 노션](https://team-spirits.notion.site/DA-WHISKY-8cd5298ee7fe4921983d820d87681467?pvs=4) |
| <img src="https://github.com/dawhisky/dawhisky-FE/assets/84097192/0963648e-73ec-470e-924f-1c7b392a1bcc" alt="피그마 아이콘" style="width: 25px; height: 20px; padding-top: 10px;"> | [피그마](https://www.figma.com/file/et8Ad4QCJByHaQ5DT1YYjV/%EB%8B%A4%EC%9C%84%EC%8A%A4%ED%82%A4?type=design&node-id=0-1&mode=design&t=xMs2bzxX6qb0359Y-0) |

<br /> <br />

## **🥃 서비스 아키텍처**

<p align="center"><img src="https://github.com/dawhisky/dawhisky-FE/assets/84097192/9435d863-f6af-49f5-9219-0d28519e6487" alt="다위스키 아키텍처"></p>

<br /> <br />

## **🥃 주요 기능**

<table>
  <tr align="center">
    <td><strong>무한 스크롤</strong></td>
    <td><strong>실시간 줄서기</strong></td>
    <td><strong>줄서기 응답 알림</strong></td>
  </tr>
   <tr align="center">
    <td><img src="./img/무한스크롤.webp" alt="무한 스크롤 gif" /></td>
    <td><img src="./img/실시간줄서기.webp" alt="실시간 줄서기 gif" /></td>
    <td><img src="./img/줄서기응답알림.webp" alt="줄서기 응답 알림 gif" /></td>
  </tr>
  <tr align="center">
    <td><strong>PWA 배포</strong></td>
    <td><strong>검색어 자동완성</strong></td>
    <td><strong>지도 위치 감지</strong></td>
  </tr>
   <tr align="center">
    <td><img src="./img/pwa배포.webp" alt="PWA 배포 gif" /></td>
    <td><img src="./img/검색어자동완성.webp" alt="검색어 자동완성 gif" /></td>
    <td><img src="./img/지도위치감지.webp" alt="지도 위치 감지 gif" /></td>
  </tr>
</table>

<br /> <br />

## **🥃 기술적 의사결정**

<table>
  <tr>
    <td><strong>Styled Component</strong></td>
    <td>테일윈드와 스타일드 컴포넌트를 고민하던 중, 디자이너님과의 원만한 협업과 초기 러닝커브를 고려하여 익숙한 라이브러리를 선택하는 것이 좋다는 판단하에 선정</td>
  </tr>
  <tr>
    <td><strong>React router dom</strong></td>
    <td>UI를 url에 따라 분기 처리하여 렌더링하기 위해서 선정</td>
  </tr>
  <tr>
    <td><strong>React query</strong></td>
    <td>리액트 쿼리 사용 시 캐싱 처리를 이용하거나 데이터 변경 시 get api를 자동 실행하는 등 최적화와 효율적인 코드 작성을 위해 선정</td>
  </tr>
  <tr>
    <td><strong>Axios</strong></td>
    <td>비동기 통신처리 수단 중 fetch같은 JS 내장함수에 비해 에러상황 등에 대한 처리가 유연하여 선정</td>
  </tr>
  <tr>
    <td><strong>React kakao maps sdk</strong></td>
    <td>기존의 html + js로 구성되어있는 kakao maps 레퍼런스를 리액트와 jsx에 맞게 함수형 컴포넌트 코드로 작성하기 위해 선정</td>
  </tr>
  <tr>
    <td><strong>Firebase</strong></td>
    <td>주류 관련 사이트 사유로 ‘카카오톡 메시지’ 보내기를 포함한 카카오 API의 상당부분을 반려받아 구현 중이던 ‘줄 서기’ 기능에서 점주가 대기중이던 고객에게 알림을 보내기 위한 수단으로써 차선책으로 FCM을 채택</td>
  </tr>
  <tr>
    <td><strong>Socket.io</strong></td>
    <td>줄서기 기능의 실시간 자리현황 반영을 위해 소켓 방식을 채택하였고, FE와 BE 언어가 동일하여 관련 npm 중 완성도가 가장 높은 라이브러리인 socket.io 선정</td>
  </tr>
  <tr>
    <td><strong>Recoil</strong></td>
    <td>- 데이터의 양방향 핸들링을 위해 상태관리 툴을 도입<br />- 리덕스나 리덕스 툴킷보다 보일러플레이트가 적고, 상대적으로 더 기존 리액트 코드와 유사해(useState ↔ useRecoilState) 러닝 커브가 적을 것으로 예상되어 선정</td>
  </tr>
  <tr>
    <td><strong>React-intersection-observer</strong></td>
    <td>- 무한스크롤 적용을 위해 도입<br />- 직접 dom의 scroll 위치값을 계산하는 것보다 observer가 제공하는 ref와 inView를 이용해 위치값을 계산하는 것이 상대적으로 렌더링이 적어 해당 라이브러리 선정</td>
  </tr>
  <tr>
    <td><strong>React-toastify</strong></td>
    <td>‘확인’ 버튼을 눌러야 하는 브라우저 기본 알림보다 원하는 시간 만큼 알림창을 화면에 띄울 수 있고, 디자인을 커스텀할 수 있어 선정</td>
  </tr>
</table>

<br /> <br />

## **🥃 트러블슈팅**

### [👉 Route 인증/인가 오류](https://oliviakim.tistory.com/123)

### [👉 Map marker 비동기 출력 이슈](https://oliviakim.tistory.com/124)

### [👉 PWA](https://team-spirits.notion.site/PWA-361040d7ff4046bb863f36982cdff269?pvs=4)

<br /> <br />

## **🥃 유저 테스트 피드백**

### [👉 유저 테스트 결과 및 피드백 반영](https://team-spirits.notion.site/39a7d83538874355bf45b391fa959a09?pvs=4)

<br /> <br />

## **🥃 팀원 소개**

### 🎨 디자이너

| 이름 | 담당 기능 | 이메일 |
| --- | --- | --- |
| 김영은 | - UI/UX 전체 디자인 <br /> - 로고 및 브로슈어 디자인 | zerosilveree@gmail.com |

### 🍷 프론트엔드

| 이름 | 담당 기능 | 깃허브 |
| --- | --- | --- |
| 김한솔<br />(리더, 프론트엔드 총괄) | - UI 공통 컴포넌트 및 API 공통 함수 제작 <br /> - route 인증/인가 <br /> - 카카오맵 커스텀 <br /> - 디바운싱을 이용한 검색어 추천 및 검색기능 <br /> - 좋아요, 코멘트 CRUD <br /> - 위스키 및 위스키바 리스트, 디테일 페이지 <br /> - 유저 마이페이지, 스토어 주류관리 페이지 | [@hansololiviakim](https://github.com/hansololiviakim) |
| 최재홍 | - 점주 로컬 회원가입/로그인 <br /> - 유저 카카오 회원가입/로그인 <br /> - PWA <br /> - socket.io를 통한 실시간 줄서기 <br /> - FCM 줄서기 알림 기능 <br /> - 스토어 마이페이지 <br /> | [@allongsio](https://github.com/allongsio) |


### 🍻 백엔드

| 이름 | 담당 기능 | 깃허브 |
| --- | --- | --- |
| 주지민<br />(부리더, 백엔드 총괄) | - 서버 배포/관리 <br /> - HTTPS <br /> - CI/CD <br /> - Socket(줄서기) <br /> - DB Polling(자리 현황) <br /> - ERD/아키택쳐/스트럭쳐 설계 <br /> - 북마크/좋아요 기능 <br /> - Swagger <br /> - Sentry | [@jujigithub](https://github.com/jujigithub) |
| 박지현 | - 점주 마이페이지 <br /> - 줄서기/리뷰 CRUD <br />  - 유저 마이페이지 <br /> - 위스키 조회/필터링/검색 | [@jihyunpark81](https://github.com/jihyunpark81) |
| 이준교 | - 소셜로그인(카카오) <br /> - 회원가입(점주/유저) <br /> - 줄서기 관련 FCM <br /> - 리프레쉬/디바이스 토큰 <br /> - 위스키 및 점주 DB 스크랩핑 작업 | [@junkyo974](https://github.com/junkyo974) |

<br /><br />

<p align="center">🥃 Copyright ©2023 Team Spirits all rights reserved.</p>