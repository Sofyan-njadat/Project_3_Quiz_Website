const check = localStorage.getItem('user');
window.onload = function () {

    if (check) {
        document.getElementById('register-btn').style.display = 'none';
        document.getElementById('auth-item').style.display = 'none';
        document.getElementById('profile-btn').style.display = 'block';
        document.getElementById('apply-btn').style.display = 'block';
        document.getElementById('logout-btn').style.display = 'block';
    }else{
        document.getElementById('profile-btn').style.display = 'none';
        document.getElementById('apply-btn').style.display = 'none';
        document.getElementById('logout-btn').style.display = 'none';
        
    }
};