# 이정훈 포트폴리오 — 전달 및 GitHub Pages 업로드 안내

이 폴더는 이정훈 님의 별도 포트폴리오입니다. 빌드나 프로그램 설치 없이 사용할 수 있는 HTML·CSS·JavaScript 정적 사이트입니다.

## 1. 먼저 확인하기

압축을 풀고 `index.html`을 Chrome 또는 Edge로 엽니다. 압축파일 안에서 바로 열지 말고 **전체 폴더를 먼저 압축 해제**하세요. 인터넷 없이도 본문과 포함된 영상이 동작합니다. GitHub 링크는 인터넷 연결이 필요합니다.

- 왼쪽 프로젝트 메뉴(모바일에서는 위쪽 가로 메뉴)로 이동합니다.
- 웹에서는 아래로 스크롤하면 모든 프로젝트를 연속해서 볼 수 있습니다. 다음 페이지 버튼을 누를 필요가 없습니다.
- 프로젝트 메뉴를 누르면 해당 프로젝트의 시작 부분으로 바로 이동합니다.
- 영상은 재생 버튼을 눌러 봅니다. 자동 재생하지 않습니다.
- `인쇄 / PDF`는 현재 페이지가 아니라 **전체 11페이지**를 인쇄합니다. A4 가로, 배율 100%, 머리글·바닥글 끄기, 배경 그래픽 켜기를 권장합니다.

## 2. GitHub에 올리기 — 웹 브라우저만 사용하는 방법

1. **이정훈 님 본인의 GitHub 계정**으로 로그인합니다.
2. 오른쪽 위 `+` → `New repository`를 선택합니다.
3. 저장소 이름은 `portfolio`로 입력하고 `Public`을 선택합니다. `Add a README file`을 켜서 `main` 브랜치를 만든 뒤 `Create repository`를 누릅니다. 이미 같은 이름의 저장소가 있으면 다른 이름을 사용합니다.
4. 저장소 화면에서 `Add file` → `Upload files`를 선택합니다.
5. 이 폴더 **안의 파일들과 `assets` 폴더**를 함께 끌어다 놓습니다. 바깥쪽 `lee-junghoon-portfolio` 폴더째 올리면 안 됩니다. ZIP 파일 자체도 올리지 않습니다.
6. 업로드 화면의 경로가 아래 구조인지 확인하고 변경 내용을 커밋합니다. 새 브랜치로 올렸다면 `main`에 병합합니다.
7. 저장소 `Settings` → `Pages`로 이동합니다.
8. `Build and deployment` → `Source`에서 **Deploy from a branch**를 선택합니다.
9. Branch는 **main**, 폴더는 **/(root)**를 선택하고 `Save`를 누릅니다.
10. `Actions`에서 Pages 배포 완료를 확인한 후 `Settings` → `Pages`의 `Visit site`로 접속합니다.

파일 구조:

```text
저장소 최상위/
├── index.html
├── styles.css
├── app.js
├── favicon.svg
├── .nojekyll
├── assets/
│   ├── docking.svg
│   ├── vip.mp4
│   ├── kick.mp4
│   ├── plc.mp4
│   ├── balance.mp4
│   └── 이미지 및 영상 포스터 파일들
├── README.md
├── 업로드_설명서.html
└── CONTENT_NOTES.md
```

`.nojekyll`은 숨김 파일입니다. 파일 탐색기에서 보이지 않으면 GitHub의 `Add file` → `Create new file`로 이름을 `.nojekyll`로 지정하고 빈 파일을 커밋해도 됩니다. 안내 문서 3개는 사이트 실행에 필수는 아니지만 함께 보관하면 편리합니다.

계정이 `jhleedev00`, 저장소가 `portfolio`라면 주소는 `https://jhleedev00.github.io/portfolio/`입니다. 다른 계정·저장소 이름이면 그에 맞게 주소가 바뀝니다. 계정 대표 주소를 쓰려면 저장소 이름을 `계정이름.github.io`로 만들어 같은 절차로 배포합니다. 이미 대표 사이트가 있다면 별도 `portfolio` 저장소 사용을 권장합니다.

> 이 패키지는 아직 GitHub에 업로드하거나 공개 배포하지 않았습니다. 받는 분이 위 절차를 완료해야 공개 주소가 생깁니다.

## 3. 글과 미디어 수정하기

- **본문·이름·GitHub 주소**: `index.html`에서 해당 문구를 검색해 수정합니다. `<article>` 한 개가 포트폴리오 한 페이지입니다.
- **색상·레이아웃**: `styles.css`에서 수정합니다. 맨 위 `--blue`는 강조색, `--nav`는 메뉴 배경색입니다.
- **프로젝트 메뉴 동작**: `app.js`에서 관리합니다. 제목이나 본문만 바꿀 때는 수정할 필요가 없습니다.
- **사진·영상**: `assets` 안의 같은 이름 파일로 교체하면 연결이 유지됩니다. 이름을 바꾸면 `index.html`의 경로도 함께 바꿉니다. 영상을 바꾸면 해당 `*-poster.jpg`도 변경하세요.
- 사진 비율은 유지됩니다. 원본의 EXIF 회전 정보는 브라우저가 적용합니다.
- GitHub에서 변경한 파일을 `main`에 커밋하면 다시 배포됩니다.

파일 경로는 모두 상대 경로로 작성되어 일반 프로젝트 저장소와 계정 대표 저장소에서 모두 사용할 수 있습니다. HTML·JS는 텍스트 편집기로 열고 UTF-8로 저장하세요.

## 4. 구성과 자료 범위

| 순서 | 프로젝트 | 페이지 | 포함 미디어 |
|---|---|---:|---|
| 1 | LOGITLE 물류센터 정밀 도킹 | 2 | 코드 기반 개념도 1개 |
| 2 | VIP Wearable | 2 | 영상 1개 + 추론 화면 1개 |
| 3 | Kick-can | 2 | 영상 1개 + 인터페이스 도식 1개 |
| 4 | Balancing Robot | 2 | 영상 1개 + 실물 사진 1개 |
| 5 | STM32 온도 제어 | 2 | HTML 제어 흐름·주변장치 표 |
| 6 | PLC 미니프로젝트 | 1 | 영상 1개 + 래더 이미지 1개 |

포스터 이미지는 영상 재생 전의 미리보기이며, 별도 사진 갤러리가 아닙니다. 영상 4개는 원본 길이와 음성을 유지하고 웹용으로 압축했습니다. 각 파일은 GitHub 브라우저 업로드 제한인 25 MiB보다 작습니다.

물류센터·STM32에는 제공된 실물 사진·영상이 없어 임의의 다른 프로젝트 사진을 넣지 않았습니다. 물류센터는 코드 기반 도식으로, STM32는 제어 흐름으로 구성했습니다. 새 시연 자료가 생기면 해당 프로젝트의 미디어 영역에 교체할 수 있습니다.

## 5. 문제가 있을 때

- **404가 나옵니다**: `index.html`이 저장소 최상위에 있는지, Pages 설정이 `main` / `/(root)`인지 확인합니다. 배포가 끝났는지는 `Actions`에서 봅니다.
- **디자인이 없습니다**: `styles.css`가 `index.html`과 같은 폴더에 있는지 확인합니다.
- **사진·영상이 없습니다**: `assets` 폴더를 함께 올렸는지, 파일명의 대소문자가 경로와 일치하는지 확인합니다.
- **이전 화면이 보입니다**: 브라우저 강력 새로고침(Ctrl+Shift+R)을 합니다.
- **영상 업로드가 안 됩니다**: 원본 대용량 영상 대신 이 패키지의 압축된 `assets/*.mp4`를 사용합니다.
- **로컬 영상이 안 됩니다**: ZIP 전체를 압축 해제했는지 확인하고 Chrome 또는 Edge에서 엽니다.

공식 절차 확인: [GitHub Pages 배포 소스 설정](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [GitHub 파일 업로드](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository).
