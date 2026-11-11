const status = document.querySelector(".copy-status");
let statusTimer;

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.append(field);
  field.select();
  const copied = document.execCommand("copy");
  field.remove();
  if (!copied) throw new Error("Copy unavailable");
}

document.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-copy]");
  if (!button) return;
  const source = document.getElementById(button.dataset.copy);
  if (!source) return;

  document.querySelectorAll("[data-copy]").forEach((item) => {
    item.textContent = "Copy text";
  });

  try {
    await copyText(source.innerText.trim());
    button.textContent = "Copied";
    status.textContent = "Text copied";
  } catch {
    status.textContent = "Copy unavailable. Select the text to copy it.";
  }

  status.classList.add("visible");
  clearTimeout(statusTimer);
  statusTimer = setTimeout(() => {
    status.classList.remove("visible");
    button.textContent = "Copy text";
  }, 2200);
});
