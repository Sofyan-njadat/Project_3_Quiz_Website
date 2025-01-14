const user = JSON.parse(localStorage.getItem('user'));

document.addEventListener('DOMContentLoaded', function () {
    const name = user.firstName;
    const email = user.email;
    const bio = localStorage.getItem('bio') || '';
    const gender = localStorage.getItem('gender') || '';
    const age = localStorage.getItem('age') || '';
    const profileImage = localStorage.getItem('profile-image') || '';
    const storedPassword = user.password; 

    // const name = localStorage.getItem('user.firstName') || 'Ahmad';
    // const email = localStorage.getItem('user.email') || 'ahmad@example.com';
    // const bio = localStorage.getItem('bio') || '';
    // const gender = localStorage.getItem('gender') || '';
    // const age = localStorage.getItem('age') || '';
    // const profileImage = localStorage.getItem('profile-image') || '';
    // const storedPassword = localStorage.getItem('user.password') || ''; 

    document.getElementById('profile-name').textContent = name;
    document.getElementById('profile-email').textContent = email;
    document.getElementById('profile-bio').textContent = bio;
    document.getElementById('profile-gender').textContent = gender;
    document.getElementById('profile-age').textContent = age;
    document.getElementById('profile-image').src = profileImage;

    document.getElementById('edit-button').addEventListener('click', function () {
        const modal = document.getElementById('edit-profile-modal');
        modal.classList.add('modal-visible');
        modal.style.display = 'flex';
    });

    // التحقق الفوري من كلمة المرور الجديدة
    const passwordInput = document.getElementById("new-password");
    const passwordError = document.getElementById("Rpassword");

    passwordInput.addEventListener("input", function () {
        const password = passwordInput.value;
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*.]).{8,}$/;
        passwordError.textContent = passwordPattern.test(password)
            ? ""
            : "Invalid Password. Must be 8+ characters, include 1 number, and 1 special char.";
    });

    // التحقق من تطابق كلمة المرور الجديدة مع التأكيد
    const confirmPasswordInput = document.getElementById("confirm-password");
    const confirmPasswordError = document.getElementById("Rcpassword");

    confirmPasswordInput.addEventListener("input", function () {
        const newPassword = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        confirmPasswordError.textContent = newPassword === confirmPassword
            ? ""
            : "Passwords do not match.";
    });

    document.getElementById('close-modal').addEventListener('click', function () {
        const modal = document.getElementById('edit-profile-modal');
        modal.classList.remove('modal-visible');
        setTimeout(function () {
            modal.style.display = 'none';
        }, 300);
    });

    // حفظ التعديلات في الملف الشخصي
    document.getElementById('edit-profile-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const bio = document.getElementById('bio').value;
        const gender = document.getElementById('gender').value;
        const age = document.getElementById('age').value;
        const profileImage = document.getElementById('profile-image-upload').files[0];
        const oldPasswordInput = document.getElementById('old-password-edit').value;

        if (oldPasswordInput !== storedPassword) {
            alert('password is incorrect!');
            return;
        }

        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('bio', bio);
        localStorage.setItem('gender', gender);
        localStorage.setItem('age', age);

        if (profileImage) {
            const reader = new FileReader();
            reader.onload = function (e) {
                localStorage.setItem('profile-image', e.target.result);
                document.getElementById('profile-image').src = e.target.result;
            };
            reader.readAsDataURL(profileImage);
        }

        document.getElementById('profile-name').textContent = name;
        document.getElementById('profile-email').textContent = email;
        document.getElementById('profile-bio').textContent = bio;
        document.getElementById('profile-gender').textContent = gender;
        document.getElementById('profile-age').textContent = age;

        alert('Profile updated successfully!');
        document.getElementById('edit-profile-modal').classList.remove('modal-visible');
        setTimeout(function () {
            location.reload();
        }, 300);
    });

    const resetPasswordBtn = document.getElementById('reset-password-btn');
    const resetPasswordModal = document.getElementById('reset-password-modal');
    const closeResetModal = document.getElementById('close-reset-modal');

    resetPasswordBtn.addEventListener('click', function () {
        resetPasswordModal.classList.add('modal-visible');
        resetPasswordModal.style.display = 'flex';
    });

    closeResetModal.addEventListener('click', function () {
        resetPasswordModal.classList.remove('modal-visible');
        setTimeout(function () {
            resetPasswordModal.style.display = 'none';
        }, 300);
    });

    // إعادة تعيين كلمة المرور
    document.getElementById('reset-password-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // تحقق من تطابق كلمة المرور الجديدة مع التأكيد
        const passwordPattern = /^(?=(.*\d){6})(?=(.*[a-zA-Z]){2}).*$/;

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match!');
        } else if (!passwordPattern.test(newPassword)) {
            alert('Password must contain at least 6 digits and 2 letters!');
        } else {
            localStorage.setItem('password', newPassword); 
            alert('Password reset successful!');
            resetPasswordModal.classList.remove('modal-visible');
            setTimeout(function () {
                location.reload(); 
            }, 300);
        }
    });
});
