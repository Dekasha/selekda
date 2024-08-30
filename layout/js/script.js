let index = 0;

function showSlide(n) {
  const slides = document.querySelectorAll(".carousel-item");
  const totalSlides = slides.length;
  if (n >= totalSlides) index = 0;
  if (n < 0) index = totalSlides - 1;

  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(-${index * 100}%)`;
  });
}

function nextSlide() {
  index++;
  showSlide(index);
}

function prevSlide() {
  index--;
  showSlide(index);
}

showSlide(index);

const pathname = window.location.pathname;

if (pathname === "/html/portfolio.html") {
  const modal = document.getElementById("myModal");
  const openModalButton = document.getElementById("openModal");
  const closeModalButton = document.getElementById("closeModal");
  const modalOverlay = document.getElementById("modalOverlay");

  openModalButton.addEventListener("click", function () {
    modal.style.display = "block";
    modalOverlay.style.display = "block";
  });

  closeModalButton.addEventListener("click", function () {
    modal.style.display = "none";
    modalOverlay.style.display = "none";
  });

  modalOverlay.addEventListener("click", function () {
    modal.style.display = "none";
    modalOverlay.style.display = "none";
  });
}

if (pathname === "/html/admin.html") {
  const canvas1 = document.getElementById("chartPertama");
  const canvas2 = document.getElementById("chartKedua");
  const canvas3 = document.getElementById("chartKetiga");

  if (canvas1) {
    const ctx1 = canvas1.getContext("2d");
    const data1 = [12, 19, 3, 5, 2, 3, 7];
    const labels1 = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
    ];
    renderBarChart(ctx1, data1, labels1, "#4e79a7", 50, 20, 20);
  }

  if (canvas2) {
    const ctx2 = canvas2.getContext("2d");
    const data2 = [10, 25, 15, 30, 20, 35, 25];
    const labels2 = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"];
    renderBarChart(ctx2, data2, labels2, "#4e79a7", 50, 30, 30);
  }

  if (canvas3) {
    const ctx3 = canvas3.getContext("2d");
    const data3 = [45, 60, 30, 80, 55, 90, 70];
    const labels3 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
    renderBarChart(ctx3, data3, labels3, "#ff6f61", 60, 40, 40);
  }
}

function renderBarChart(
  ctx,
  data,
  labels,
  barColor,
  barWidth,
  barSpacing,
  padding
) {
  const chartWidth = ctx.canvas.width;
  const chartHeight = ctx.canvas.height;
  const maxDataValue = Math.max(...data);

  ctx.fillStyle = barColor;
  ctx.strokeStyle = "#333";
  ctx.font = "12px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";

  for (let i = 0; i < data.length; i++) {
    const barHeight = (data[i] / maxDataValue) * (chartHeight - 2 * padding);
    const x = i * (barWidth + barSpacing) + padding;
    const y = chartHeight - padding - barHeight;

    ctx.fillRect(x, y, barWidth, barHeight);
    ctx.strokeRect(x, y, barWidth, barHeight);

    ctx.fillStyle = "#333";
    ctx.fillText(data[i], x + barWidth / 2, y - 5);

    ctx.fillText(labels[i], x + barWidth / 2, chartHeight - padding + 20);  
  }
}
