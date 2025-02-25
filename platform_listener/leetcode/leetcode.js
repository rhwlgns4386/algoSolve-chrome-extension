const result_state = function result_state(state_msg) {
  if (state_msg === "Accepted") {
    return ResultState.AC;
  }
  return ResultState.FAIL;
};

const get_problem_info = function get_problem_info(response) {
  const get_id = function get_problem_id(response) {
    return response.question_id;
  };

  const get_name = function get_problem_name() {
    return (titleElement = document.title.split("-")[0]);
  };

  const get_url = function get_problem_url() {
    const url = window.location.href;
    return url.split("/submissions")[0];
  };

  return {
    id: get_id(response),
    name: get_name(),
    url: get_url(),
  };
};

const create_dto = function (response) {
  const status = result_state(response.status_msg);
  const { id, name, url } = get_problem_info(response);
  const currentDate = new Date();
  return new ProblemStateDto(
    Platform.LEETCODE,
    status,
    id,
    name,
    url,
    currentDate
  );
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.submissionId) {
    // submissionId 값을 받았을 때 처리
    sendResponse({ status: "success", submissionId: message.submissionId });

    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `https://leetcode.com/submissions/detail/${message.submissionId}/check/`
    );
    xhr.onload = function () {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        send(create_dto(response));
      } else {
        console.error("Request failed with status", xhr.status);
      }
    };
    xhr.send();
  }
  return true; // 비동기 처리
});
