import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

let lastPath: string;

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

const injectButton = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  while (!document.querySelector(".project__header__content")) {
    console.log("Waiting for container...");
    await new Promise(resolve => setTimeout(resolve, 1000)); // Add delay between checks
  }

  while (!document.querySelector(".project__header__content")) console.log("Waiting for container...");

  if (document.querySelector(".bp-injector-btn")) return;

  const button = document.createElement("button");

  button.innerText = "Add to instance";

  button.style.width = "100%";
  button.style.padding = "15px";
  button.style.marginTop = "10px";

  button.classList.add("bp-injector-btn");

  button.style.backgroundColor = "#B3CAE5";
  button.style.color = "black";

  button.style.borderRadius = "5px";

  document.querySelector(".project__header__content")?.appendChild(button);

  const link = document.createElement("a");
  link.href = window.location.href;
  link.target = "_blank";

  const openButton = document.createElement("button");

  openButton.innerText = "Open on Modrinth";

  openButton.style.width = "100%";
  openButton.style.padding = "15px";
  openButton.style.marginTop = "10px";

  openButton.classList.add("bp-injector-btn");

  openButton.style.backgroundColor = "#30801c";
  openButton.style.color = "white";

  openButton.style.borderRadius = "5px";

  link.appendChild(openButton);

  document.querySelector(".project__header__content")?.appendChild(link);
}

contextBridge.exposeInMainWorld('injectButton', injectButton);

window.setInterval(() => {
  if (lastPath == window.location.pathname) return;
  console.log('location changed! ' + window.location.pathname);

  lastPath = window.location.pathname;

  if (window.location.pathname.startsWith("/mod/")) injectButton();
}, 500);