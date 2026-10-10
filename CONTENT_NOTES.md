# 내용·자료 출처 및 확인 범위

이 문서는 내용의 근거를 확인하기 위한 제작 기록입니다. 포트폴리오 프로젝트는 6개이며 LOGITLE 상세는 A4 2쪽입니다.

## 2026-10-11 LOGITLE 기획 및 LLM 설명 보강

- 사용자가 프로젝트 기획을 직접 담당했다고 확인했습니다. 개인 담당에 프로젝트 기획, 정밀 도킹 구현, 로컬 네트워크 구축을 명시했습니다. 팀장 역할이나 전체 시스템의 단독 구현을 의미하지 않습니다.
- [사용자 제공 Canva 발표자료](https://www.canva.com/design/DAHWc-TGiS8/N6wiz9wljzOqhaEOFclbjw/edit)의 개요·시스템 구성·AI 경로 생성·개발 현황 텍스트를 확인했습니다. 주문·배차, AMR 운반·도킹, OMX 적재·하역의 연결 구조를 반영했습니다.
- LLM은 코드가 제공한 이동 가능한 후보 노드에서 다음 노드를 반복 선택하고, 간선 검증 후 주행하며 실패 시 알고리즘 경로로 대체하는 팀 기능으로 구분했습니다. 개인 기여는 기존의 LLM 경로 판단 제안 범위를 유지했습니다.
- 자료에는 LLM 경로 시험 및 A* 비교 검증 진행 상태가 기재돼 있습니다. 시험 표본·조건이 확인되지 않은 경로 유효성 100%, 최단 경로 일치 40%, 단계당 약 0.39초는 포트폴리오 성과 수치로 추가하지 않았습니다.
- 자료의 RAG 사용 여부, 로봇팔 수, 미완성 문구에 불일치가 있어 해당 세부사항은 단정하지 않았습니다. 도킹 수치와 기존 코드 확인 범위는 유지했습니다. Canva 원본은 수정하지 않았습니다.

## 2026-10-08 코드·Drive 대조 및 문구 교정

현재 화면 문구에는 아래 대조 결과를 우선 적용했습니다. 기존 기록 중 STM32 온도 제어 프로젝트는 현재 Guide Dog로 교체되어 있습니다. assets 폴더 내부는 이번 분석에서 열람하지 않았습니다.

- LOGITLE: [AMR docking 브랜치](https://github.com/E1I6-Logistics/Logistics_AMR/tree/0a984ccb00425a112212a7464ac1d74fa2401b9a), `src/logitle/logitle_docking/logitle_docking/precision_docking_server.py` 확인. 2D ICP, PID, 경유지 접근, 근거리 Odometry 후진, Action 취소·정합 실패 처리와 `create_rate(20.0)`, 거리 판정 `0.015`를 확인했습니다. 20Hz는 설정이고 1.5cm는 완료 판정 기준이며 실측 정확도가 아닙니다. 본인 기여 범위는 기존 자료의 도킹 담당 범위를 유지했습니다.
- [Logistics_FMS README](https://github.com/E1I6-Logistics/Logistics_FMS): 모의 로봇 데이터 사용 및 실기체 통합 별도 검증을 명시합니다. 실제 다중 AMR 관제·PostgreSQL·ROS VLM 브리지 완성을 개인 성과로 단정한 문구를 제거했습니다. 공개 코드 확인만으로 해당 기능의 부재를 단정하는 것은 아닙니다.
- [VIP Raspberry Pi README 및 소스](https://github.com/VIP-WEARABLE/vip_wearable_rasi): 이정훈 역할 항목과 `main.py`, `ai/od.py`, `ai/sem.py`를 대조했습니다. 본인 담당은 Edge AI, 모델 튜닝, 멀티프로세싱·프레임 분배·이벤트 처리입니다. 최종 추론 코드는 ONNX 모델을 로드하며 프레임 읽기에 `.copy()`가 있어 완전한 무복사·발열 감소를 단정하지 않습니다. 최종 햅틱은 Raspberry Pi GPIO 직접 제어이고 해당 하드웨어·BT 담당은 팀원으로 구분했습니다. 약 6→12 FPS는 README·팀 보고서에 따른 수치이며 재측정하지 않았습니다.
- Drive `project정리/VIP`의 개발완료보고서 PDF 1–4쪽에서 듀얼 비전 AI, Raspberry Pi·GPIO·앱 구성과 KPI 문맥을 확인했습니다. GitHub의 현행 코드와 보고서가 다르면 현행 구현을 우선하고 보고서 수치는 출처를 밝혔습니다.
- [KICK-CAN Main Node](https://github.com/kick-can/main_node): README, `My_main/MOTOR/motor_ctrl.c`, `My_main/VELOCITY/velocity.c` 확인. Bluetooth 조종 입력과 CAN 차량 노드를 구분하고 Main Node의 H523, 차동 PWM, Input Capture·DMA, 100us 미만 간격 제외, 500ms 타임아웃을 반영했습니다. Drive `kick-can/발표자료_최종.pdf` 1–4쪽의 차량 전장 모사라는 주제와 기존 역할 근거를 함께 사용했습니다.
- [Guide Dog STM](https://github.com/GuideDog-Robotics/STM) `Core/Src/main.c`와 [Raspi README](https://github.com/GuideDog-Robotics/Raspi) 대조. MCU 거리 계측·필터링·명령 수신·모터 제어와 Raspberry Pi 위험도·회피 FSM을 분리했습니다. Drive Guide_Dog 결과보고서 PDF 4쪽의 센서 융합 목표 및 22쪽의 2륜→4륜 변경·이정훈 팀장/하드웨어 디버깅 후기를 확인했습니다. 공개 STM 코드에는 초기 균형 제어 흔적도 남아 있어 최종 4륜 시연과 구분합니다.
- [BalancingRobot](https://github.com/jhleedev00/BalancingRobot): README, `CONTROL/Balancing_Control.c` 확인. MCU는 ATmega328P이며 균형·회전 PID 출력을 합성합니다. 기존 각도·속도 중첩 PID 및 위치 복원 주장을 교정했습니다. PCB 담당은 기존 제공 자료 근거를 유지합니다.
- PLC는 이번 GitHub 링크에 대응 저장소가 없어 기존 발표자료 기반 문구를 유지했습니다.

아래는 이전 버전의 제작 이력입니다.

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
