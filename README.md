# 이정훈 — Robotics & Embedded Firmware Engineer Portfolio

본 저장소는 이정훈 님의 웹 포트폴리오 정적 사이트 패키지입니다.  
별도의 Node.js 빌드나 복잡한 의존성 설치 없이, 웹 브라우저만으로 즉시 실행 및 GitHub Pages 배포가 가능한 HTML5 / CSS3 / Vanilla JS 기반 프로젝트입니다.

---

## 📌 주요 구성 섹션

1. **소개 (Profile & Overview)**
   - 메인 슬로건: *"센서 데이터 해석부터 액추에이터 정밀 제어까지, 로봇의 실제 움직임을 소프트웨어로 완성합니다."*
   - 핵심 타겟 분야: `AMR · 자율주행`, `임베디드 펌웨어`, `센서 퓨전 & 정밀 제어`, `온디바이스 Edge AI`, `산업 자동화 · PLC`
   - 핵심 역량 소개, 인적사항, 연락처 및 주요 지표 요약

2. **기술 역량 (Engineering Skills)**
   - 6대 기술 분야별 핵심 스택 및 구현 역량 상세:
     - **자율주행 & 로보틱스**: ROS 2 (Jazzy/Humble), Nav2, 2D LiDAR, 2D ICP (cKDTree/SVD), PID Control, Gazebo, RViz2
     - **MCU & 임베디드 펌웨어**: C/C++, STM32 (F1/F4/H5), AVR (ATmega328P), FreeRTOS, STM32CubeIDE, Dual PID, 불감대 보정
     - **통신 프로토콜 & 인터페이스**: CAN / FDCAN, UART / RS-232 / RS-485, SPI, I2C, One-Wire (DS18B20), 32-bit Timer Input Capture
     - **온디바이스 AI & 컴퓨터 비전**: LiteRT (TFLite INT8), YOLO26n-sem, MediaPipe, OpenCV, PyTorch, Zero-Copy 파이프라인, 1D Danger Map
     - **회로 설계 & 3D 섀시 모델링**: KiCAD (회로/PCB 아트워크), PADS Logic/Layout, OpenSCAD 3D 모델링, Bambu Studio
     - **산업 자동화 & 시퀀스 제어**: LS ELECTRIC XG5000, 래더 다이어그램(Ladder Diagram), 서보 모션 제어, 안전 인터록 회로

3. **주요 엔지니어링 프로젝트 (Selected Work - 6 Projects)**
   - **01. LOGITLE 물류센터 LiDAR 기반 정밀 도킹 시스템** (ROS 2 Jazzy, 2D ICP, 20Hz Action Server, 오차 1.5cm 이내 도킹)
   - **02. VIP Wearable — 시각장애인 보행 보조 시스템** (제24회 임베디드SW경진대회 출품, Raspberry Pi 5, LiteRT INT8, 12+ FPS Zero-Copy, 1D Danger Map, STM32 햅틱 연동)
   - **03. KICK-CAN — CAN 기반 분산 제어 4WD RC카** (STM32, FDCAN 다중 노드, 차동 구동 믹싱, 32-bit 타이머 인풋 캡처 속도 계측, RC522 RFID)
   - **04. Balancing Robot — 2륜 자기 평형 역진자 로봇** (ATmega328P/STM32, MPU6050 1차원 칼만 필터 센서 퓨전, 이중 PID 제어기, KiCAD PCB 제작)
   - **05. STM32 기반 실시간 온도 제어 시스템** (학부 1인 전담 졸업작품, STM32F407, 4대 통신 버스 동시성 충돌 해결을 위한 Software Lock, 제어 오차 ±1.5℃ 이내)
   - **06. PLC 자동화 물류 설비 제어 미니프로젝트** (LS ELECTRIC XG5000 래더 시퀀스, 승강기 이송 및 안전 인터록, Tact Time 최적화)

4. **실무 경력 (Professional Work Experience)**
   - **주식회사 피플웍스아스날 — 3팀 연구원** (2025.11 ~ 2026.03 | 정규직)
     - 무인수상정(USV) RF 제어부 시스템 펌웨어 개발
     - RS-232 시리얼 통신 연동 및 가변 패킷 파서(Parser) 구현
     - I2C EEPROM 비휘발성 파라미터 관리 최적화 및 캐싱
     - PLL 제어 모듈 레지스터 실시간 설정 및 신호 무결성 검증

5. **학력, 자격 및 병역 (Credentials & Background)**
   - **학력**: 국립한국교통대학교 전자공학과 학사 졸업 (2020.03 ~ 2026.02, 공학사 / 전자공학심화, 평점 4.15 / 4.5)
   - **자격**: 정보처리기사 (2023.06, 한국산업인력공단), 정보통신기술자 경력수첩 초급 (2025.06, 한국정보통신공사협회)
   - **교육**: PADS Basic 과정 수료 (2026.02, ED&C), Hanwha Vision VEDA 4기 부트캠프 (2026.03)
   - **병역**: 대한민국 육군 병장 만기제대 (MW 통신운용병 복무, 2021.03 ~ 2022.09)

---

## 🚀 GitHub Pages 배포 방법

1. 본인의 GitHub 계정(`jhleedev00`)으로 로그인합니다.
2. 새 저장소(New repository)를 `portfolio` (또는 `jhleedev00.github.io`) 이름으로 생성합니다.
3. 이 폴더 내부의 모든 파일(`index.html`, `styles.css`, `app.js`, `favicon.svg`, `.nojekyll`, `assets/` 폴더)을 저장소 최상위(Root)에 업로드합니다.
4. 저장소 **Settings** → **Pages**로 이동합니다.
5. **Build and deployment** > **Source**에서 **Deploy from a branch**를 선택하고, Branch를 **main** / **/(root)**로 지정 후 **Save**를 클릭합니다.
6. Actions 탭에서 배포가 완료되면 `https://jhleedev00.github.io/portfolio/`로 접속하여 확인합니다.

---

## 🖨️ PDF 저장 및 인쇄 안내
상단 내비게이션 바의 **[PDF 저장 / 인쇄]** 버튼을 클릭하면, 불필요한 내비게이션 요소가 제외되고 채용 제출용 규격에 맞춰 A4 단면 인쇄 및 PDF 저장이 최적화되어 동작합니다.
