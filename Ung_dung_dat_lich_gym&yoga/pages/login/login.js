const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

const signUpForm = document.getElementById("signUpForm");
const signUpNameInput = document.getElementById("signUpName");
const signUpEmailInput = document.getElementById("signUpEmail");
const signUpPasswordInput = document.getElementById("signUpPassword");
const confirmPasswordInput = document.getElementById("confirmPassword");
const signUpError = document.getElementById("signUpError");

const signInForm = document.getElementById("signInForm");
const signInEmailInput = document.getElementById("signInEmail");
const signInPasswordInput = document.getElementById("signInPassword");
const signInError = document.getElementById("signInError");

if (registerBtn && loginBtn && container) {
  registerBtn.addEventListener("click", () => {
    container.classList.add("active");
    signInError.textContent = '';
    signUpError.textContent = '';
  });

  loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
    signUpError.textContent = '';
    signInError.textContent = '';
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

if (signUpForm) {
  signUpForm.addEventListener("submit", function(e) {
    e.preventDefault();
    signUpError.textContent = "";
    signUpError.style.color = "red";

    const name = signUpNameInput.value.trim();
    const email = signUpEmailInput.value.trim();
    const password = signUpPasswordInput.value;
    const confirm = confirmPasswordInput.value;

    let isValid = true;

    if (name === "") {
      signUpError.textContent = "Họ và tên không được để trống.";
      isValid = false;
    }
    else if (email === "") {
      signUpError.textContent = "Email không được để trống.";
      isValid = false;
    } else if (!isValidEmail(email)) {
      signUpError.textContent = "Email không đúng định dạng.";
      isValid = false;
    }
    else if (password === "") {
      signUpError.textContent = "Mật khẩu không được để trống.";
      isValid = false;
    } else if (password.length < 8) {
      signUpError.textContent = "Mật khẩu phải có ít nhất 8 ký tự.";
      isValid = false;
    }
    else if (confirm === "") {
      signUpError.textContent = "Vui lòng xác nhận mật khẩu.";
      isValid = false;
    } else if (password !== confirm) {
      signUpError.textContent = "Mật khẩu xác nhận không khớp.";
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = users.some(user => user.email === email);

    if (emailExists) {
      signUpError.textContent = "Email này đã được sử dụng.";
      isValid = false;
    }

    if (isValid) {
      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));

      signUpError.style.color = "green";
      signUpError.textContent = "Đăng ký thành công! Vui lòng đăng nhập.";

      signUpForm.reset();

      setTimeout(() => {
          if(container) container.classList.remove("active");
           signUpError.textContent = '';
      }, 1500);
    }
  });
}

if (signInForm) {
  signInForm.addEventListener("submit", function (e) {
    e.preventDefault();
    signInError.textContent = "";
    signInError.style.color = "red";

    const email = signInEmailInput.value.trim();
    const password = signInPasswordInput.value;

    if (!email || !password) {
      signInError.textContent = "Vui lòng nhập email và mật khẩu.";
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(user => user.email === email && user.password === password);

    if (!foundUser) {
      signInError.textContent = "Email hoặc mật khẩu không đúng!";
      signInPasswordInput.value = "";
      signInPasswordInput.focus();
    } else {
      signInError.style.color = "green";
      signInError.textContent = "Đăng nhập thành công! Đang chuyển hướng...";

      localStorage.setItem("currentUser", JSON.stringify(foundUser));

      setTimeout(() => {
        window.location.href = "../dashboard/dashboard.html";
      }, 1500);
    }
  });
}