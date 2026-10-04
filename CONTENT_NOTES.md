# 내용·자료 출처 및 확인 범위

이 문서는 전달받는 분이 내용의 근거를 확인하기 위한 제작 기록입니다. 포트폴리오 화면의 프로젝트 수는 6개, 상세 페이지 수는 11개입니다.

## 개인 담당 업무

- **LOGITLE**: 사용자 지정 범위인 `logitle_docking/logitle_docking/precision_docking_ICP_server.py`. 로컬 제공 코드를 읽어 ROI 전처리, V-Funnel 모델, ICP·PID, ROS 2 Action, 정지·취소·재탐색 분기를 정리했습니다. 20 Hz, 6 cm, 1.5 cm 등은 코드 설정·판정 기준이며 측정 성능이 아닙니다. 실측 오차·성공률·현장 적용 실적을 추가하지 않았습니다.
- **VIP Wearable**: `2026ESWContest_자유공모_VIPWEARABLE_개발완료보고서.pptx` 20쪽의 이정훈 역할(Edge AI, INT8, Zero-Copy, 1D Danger Map)을 기준으로 했습니다. BT 통신·센서 파싱·낙상 감지·PWM 햅틱을 개인 성과로 기재하지 않았습니다. 성능은 보고서의 팀 평가임을 표기했습니다. 0.0 ms 등의 절대적인 지연 제거 표현은 사용하지 않았습니다.
- **Kick-can**: `발표자료_최종.pptx` 7쪽과 19–23쪽, Main Node 저장소. 컨트롤러·Node 1·Node 2의 담당 작업을 개인 성과로 합치지 않았습니다. Main Node 자체를 FreeRTOS 구현으로 소개하지 않았습니다.
- **PLC**: `PLC_미니프로젝트_PPT.pptx` 3쪽과 10–15쪽. 이정훈 담당인 층 선택·램프·Tact Time, 공동 통합 디버깅을 정리했습니다. HMI 화면 설계와 기본 서보 기능은 팀원 담당으로 분리했습니다.
- **Balancing Robot**: 제공 GitHub의 C 소스와 영상·사진. DT=0.01 설정이 실제 100 Hz 주기 보장을 의미하지 않아 측정 성능으로 쓰지 않았습니다. 앱 저장소는 이번 확인 범위에 포함하지 않았습니다.
- **STM32**: 저장소 README 및 `Core.zip` 내부의 `main.c`, `heaterController.c`, `motor_Controller.c`, `defines.h`. README의 팬 자동 연동 설명과 달리 제공된 히터 제어 코드의 팬 호출은 주석입니다. 따라서 히터·서보 제어 및 팬 드라이버 구성으로 범위를 구분했습니다. 기존 드라이버의 저자 표기가 있어 모든 하위 코드를 독자 작성했다고 주장하지 않습니다.

## 참고만 하고 제외한 자료

`AI융합로봇_3기_결과보고서(4조).pptx`는 GUIDEDOG 안내견 로봇 자료입니다. 요청하신 여섯 프로젝트에 추가하지 않았고 물류센터 도킹의 사진·성과로 사용하지 않았습니다.

## 미디어 출처

- `vip.mp4`: 제공된 VIP_Wearable 동작 영상. `vip-vision.png`: VIP 보고서의 이미지.
- `kick.mp4`: 제공 자료 폴더의 Final.mp4. `kick-architecture.png`: Kick-can 발표자료의 Main Node 도식.
- `plc.mp4`: 제공 자료 폴더의 2026_06_17 12_28.mp4. `plc-ladder.png`: PLC 발표자료의 창고 적재 램프 래더 이미지.
- `balance.mp4`: 제공된 20260403_213639.mp4. `balancing-robot.jpg`: 제공된 20260404_000725.jpg 원본.
- `*-poster.jpg`: 해당 제공 영상의 1초 지점에서 추출한 재생 전 미리보기.
- `docking.svg`: 제공 코드를 설명하기 위해 새로 작성한 개념도. 측정 데이터·시연 결과가 아닙니다.

PPT 원본, 원본 소스코드 전체, 원본 대용량 영상은 배포 폴더에 포함하지 않았습니다. 내용 근거를 보여 주는 GitHub 링크와 필요한 미디어만 포함했습니다. 원본 소스의 라이선스는 각 저장소를 따릅니다. STM32 저장소는 GPL-3.0과 드라이버 출처를 안내합니다.

## 확인한 GitHub 버전

- [balancingrobot](https://github.com/jhleedev00/balancingrobot/tree/a85df6f24be3c2efaafd135195c37411d460d4cc): `a85df6f24be3c2efaafd135195c37411d460d4cc`
- [main_node](https://github.com/kick-can/main_node/tree/882f71d65c653fecf4d4953309c275bf8dd90c83): `882f71d65c653fecf4d4953309c275bf8dd90c83`
- [stm32](https://github.com/jhleedev00/STM32-Temperature-Control-System/tree/a3c859bc9b87b2457268c963099e97378f2d4b67): `a3c859bc9b87b2457268c963099e97378f2d4b67`
