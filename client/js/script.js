const CHATGPT_KEY = "";
let messages = [];
init();

function init() {
  setRoleGPT(
    "Eres un asistente virtual para un chatbot.Te van hacer prefuntas relacionadas a nuestro negocio"
  );
  renderMessages();
}

async function onClickBtnEnviar() {
  let inputHtml = document.getElementById("txtMessage");
  let userMessage = inputHtml.value;
  inputHtml.value = "";
  await makeAQuestiontoGPT(userMessage);
  renderMessages;
}

function setRoleGPT(roleChatGPT) {
  messages = [
    {
      role: "system",
      content: roleChatGPT,
    },
  ];
  messages.push({ role: "assistant", content: "Hola, En que puedo ayudarte" });
}

async function makeAQuestiontoGPT(question) {
  messages.push({ role: "user", content: question });
  messages.push({ role: "assistant", content: "Escribiendo ..." });
  renderMessages();
  messages.pop();
  let response = await callToChatGpt();
  messages.push({ role: "assistant", content: response });
  renderMessages();
}

function scrollToMessagestoEnd() {
  var messagesChat = document.getElementsByClassName("messages")[0].innerHTML;
  messagesChat.scrollTop = messagesChat.scrollHeight;
}

function renderMessages() {
  let html = "";
  for (let message of messages) {
    if ((messages.role = "system")) {
      continue;
    }
    html += `<div class="${message.role}-message">
                <span>${message.content}</span>
             </div>
    `;
  }
  document.getElementsByClassName("messages")[0].innerHTML = html;
  scrollToMessagestoEnd();
}

async function callToChatGpt() {
  const bodyRequest = {
    model: "gpt-3.5-turbo",
    max_tokens: 500,
    message: messages,
  };

  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CHATGPT_KEY}`,
    },
    body: JSON.stringify(bodyRequest),
  };

  const response = await fetch(`https://api.openai.com/v1/chat/completions`);
  const json = await response.json;
  console.log(json.choices);
  return json.choices[0].message.content;
}
