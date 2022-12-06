function locked() 
{
  alert("Chức năng đã bị khóa!");
}
function check() 
{
    if(document.getElementById("signInUsername").value == 'mariecurie' && document.getElementById("signInPassword").value == 'lethanhdanh') {

      console.log("yes")
      window.location.replace("/pages/map.html");
    }
    else {
      alert("Tên người dùng hoặc mật khẩu sai!");
      console.log("no")
    }
}