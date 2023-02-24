# wanted-pre-onboarding-frontend 01 과제 제출

<p>
<img alt="Typescript" src="https://img.shields.io/badge/Typescript-v4.9.4-3178C6?style=plastic&logoColor=white%22/%3E"/>
<img alt="React" src="https://img.shields.io/badge/React-v18.2.0-61DAFB?style=plastic&logo=react&logoColor=white"/>
<img alt="React Router" src="https://img.shields.io/badge/React Router-v6.8.0-CA4245?style=plastic&logo=reactrouter&logoColor=white"/>
</p>

## 실행 방법

---

```sh
git clone // this repository
cd this file location
npm install
npx vite
```

## 선정이유

```
1. vite를 써서 일반적인 번들링과정을 생략하여 보다 빠르게 설치 가능
2. axios쓴 이유 => 기존보다 편하며 반복되는 코드 줄일 수 있음
3. 파일구조와 컴포넌트를 세분화 시켜 가독성과 재사용성을 향상
4. 타입스크립트를 사용하여 코드의 오류를 컴파일 단계에서 잡음
5. 가독성을 높이기 위해 순수함수를 작성하려고 노력
6. 확장성을 고려하여 정규표현식 사용해서 유효성 검사를 진행
7. 사용자 경험을 증대시키기 위해 confirm을 사용하여 안전장치 생성, 할 일 추가 후 입력창 비움
8. prettier,eslint,husky를 사용함으로써 코드컨벤션을 맞춤
```

## 배포 사이트

---

(http://s3-deploy-cicd.s3-website.ap-northeast-2.amazonaws.com/)

## 👨‍💻 팀원

---

| [강명훈](https://github.com/michoball) | [김진영](https://github.com/tbs01215)  |  [백유리](https://github.com/BaekYuri)  | [김유신](https://github.com/kysclient) |
| :------------------------------------: | :------------------------------------: | :-------------------------------------: | :------------------------------------: |
| [최명식](https://github.com/mysungsik) | [안윤경](https://github.com/skyhanull) | [구본아](https://github.com/bona373737) | [김재욱](https://github.com/WooGie911) |

## 구현 요구사항 목록

### Sign in & up

- [x] 회원가입과 로그인 페이지에 이메일과 비밀번호의 유효성 검사기능을 구현해주세요 (이메일 조건: @ 포함, 비밀번호 조건: 8자 이상)
  - [x] 입력된 이메일과 비밀번호가 유효성 검사를 통과하지 못한다면 button에 disabled 속성을 부여해주세요
  - [x] 회원가입 페이지에서 버튼을 클릭 시 회원가입을 진행하고 회원가입이 정상적으로 완료되었을 시 /signin 경로로 이동해주세요
- [x] 로그인 페이지에서 버튼을 클릭 시, 로그인을 진행하고 로그인이 정상적으로 완료되었을 시 /todo 경로로 이동해주세요
- [x] 응답받은 JWT는 로컬 스토리지에 저장해주세요
- [x] 로그인 여부에 따른 리다이렉트 처리를 구현해주세요

### Todo List

- [x] /todo경로에 접속하면 투두 리스트의 목록을 볼 수 있도록 해주세요
  - [x] 목록에서는 TODO의 내용과 완료 여부가 표시되어야 합니다.
  - [x] TODO의 완료 여부는 <input type="checkbox" />를 통해 표현해주세요
  - [x] TODO는 `<li> tag` 를 이용해 감싸주세요.
- [x] 리스트 페이지에 새로운 TODO를 입력할 수 있는 input과 추가 button을 만들어주세요
  - [x] 추가 button을 클릭하면 입력 input의 내용이 새로운 TODO로 추가되도록 해주세요
- [x] TODO의 체크박스를 통해 완료 여부를 수정할 수 있도록 해주세요.
- [x] TODO 우측에 수정버튼과 삭제 버튼을 만들어주세요
- [x] 투두 리스트의 삭제 기능을 구현해주세요
- [x] 투두 리스트의 수정 기능을 구현해주세요

## 파일구조

---

```
📦src
 ┣ 📂apis
 ┃ ┣ 📂dtos
 ┃ ┃ ┣ 📜TodoDto.ts
 ┃ ┃ ┗ 📜UserDto.ts
 ┃ ┣ 📜todo-api.ts
 ┃ ┗ 📜user-api.ts
 ┣ 📂assets
 ┃ ┗ 📜react.svg
 ┣ 📂components
 ┃ ┣ 📜SignIn.tsx
 ┃ ┣ 📜SignUp.tsx
 ┃ ┣ 📜Todo.tsx
 ┃ ┗ 📜TodoItem.tsx
 ┣ 📂pages
 ┃ ┣ 📜SignInPage.tsx
 ┃ ┣ 📜SignUpPage.tsx
 ┃ ┗ 📜TodoPage.tsx
 ┣ 📂utils
 ┃ ┣ 📜axios.ts
 ┃ ┗ 📜regex.ts
 ┣ 📜App.css
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜main.tsx
 ┣ 📜types.ts
 ┗ 📜vite-env.d.ts
```
