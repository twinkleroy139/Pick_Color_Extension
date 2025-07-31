// Required as service_worker for Manifest V3
chrome.runtime.onInstalled.addListener(() => {
    console.log("Color Picker Extension Installed.");
  });
  