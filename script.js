const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const urlInput = document.getElementById("urlInput");
const qrImage = document.getElementById("qrCode");

generateBtn.addEventListener("click", () => {
  const url = urlInput.value.trim();

  if (url === "") {
    alert("Please enter a URL.");
    return;
  }

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(url)}&size=200x200`;
  qrImage.crossOrigin = "anonymous"; // Allow canvas access
  qrImage.src = qrUrl;

  qrImage.onload = () => {
    downloadBtn.disabled = false;
  };
});

downloadBtn.addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  canvas.width = qrImage.naturalWidth;
  canvas.height = qrImage.naturalHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(qrImage, 0, 0);

  const dataURL = canvas.toDataURL("image/png");

  // Trigger real download
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "qr-code.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Optionally store in localStorage
  localStorage.setItem("lastQRCode", dataURL);
});
