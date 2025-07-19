// HTML 요소들을 변수에 담기
const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// 버튼 클릭 이벤트: 할 일 추가
addBtn.addEventListener("click", () => {
  let task = todoInput.value.trim(); // 입력값 가져오기

  // 입력이 비어있지 않으면
  if (task !== "") {
    // 새 <li> 요소 생성
    const li = document.createElement("li");
    li.textContent = task;

    // 완료 표시 기능 (체크표시)
    li.addEventListener("click", () => {
      if (li.classList.toggle("done")) {
        li.textContent = "✔️ " + task;
      } else {
        li.textContent = task;
      }
      li.appendChild(delBtn);  // 삭제 버튼 다시 붙이기!
    });

    // 수정 기능 (더블클릭)
    li.addEventListener("dblclick", () => {
      const input = document.createElement("input");
      input.type = "text";
      input.value = task;
      li.textContent = "";  // 기존 텍스트 제거
      li.appendChild(input);
      input.focus();

      // 엔터 누르면 수정 완료
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          task = input.value.trim();
          li.textContent = task;
          li.appendChild(delBtn);
        }
      });

      // 입력창 밖 클릭해도 수정 완료
      input.addEventListener("blur", () => {
        task = input.value.trim();
        li.textContent = task;
        li.appendChild(delBtn);
      });
    });

    // 삭제 버튼 만들기
    const delBtn = document.createElement("button");
    delBtn.textContent = "삭제";
    delBtn.classList.add("delete");

    // 삭제 버튼 클릭 이벤트
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // 부모 요소 클릭 방지
      todoList.removeChild(li); // 목록에서 삭제
    });

    // <li>에 삭제 버튼 붙이기
    li.appendChild(delBtn);

    // 리스트에 <li> 추가 (맨 위에)
    todoList.insertBefore(li, todoList.firstChild);

    // 입력창 비우기
    todoInput.value = "";
  }
});

// 엔터키로 할 일 추가
todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addBtn.click();  // 엔터 누르면 추가 버튼 클릭한 것과 동일하게 처리
  }
});

// 오늘 날짜를 구해서 <p id="today-date">에 넣기
function getTodayDate() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  return `${month}월 ${day}일`;
}

document.getElementById("today-date").textContent = getTodayDate();
