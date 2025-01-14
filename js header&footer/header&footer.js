// دالة لتحميل المحتوى من ملف خارجي
function loadContent() {
    // تحميل الهيدر
    fetch('header.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('header').innerHTML = data;
      });

    // تحميل الفوتر
    fetch('footer.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('footer').innerHTML = data;
      });
  }

  // استدعاء الدالة عند تحميل الصفحة
  window.onload = loadContent;
