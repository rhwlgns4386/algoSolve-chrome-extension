let checkId = null;

const find_id = function find_id(details) {
  const url = details.url;
  const match = url.match(/\/(\d+)\/check\//);
  return match[1];
};

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    checkId = find_id(details);
  },
  { urls: ["https://leetcode.com/submissions/detail/*/check/"] }
);

const parse_body = function parse_body(body) {
  const uint8Array = new Uint8Array(body[0].bytes);
  const decoder = new TextDecoder("utf-8");
  const decodedBody = decoder.decode(uint8Array);
  return JSON.parse(decodedBody);
};

const send_submission_id = function send_submission_id(id) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { submissionId: id });
  });
};

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    const body = details.requestBody.raw;

    if (!body || body.length <= 0) {
      return;
    }
    const parsedQuery = parse_body(body);

    const operationName = parsedQuery.operationName;
    if (operationName && operationName == "submissionDetails") {
      const id = parsedQuery.variables.submissionId;
      if (checkId == id) {
        checkId = null;
        send_submission_id(id);
      }
    }
  },
  { urls: ["https://leetcode.com/graphql/"] },
  ["requestBody"]
);
