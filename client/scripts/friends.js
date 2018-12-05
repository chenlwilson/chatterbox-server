var Friends = {
  toggleStatus: function() {
    var username = document.getElementsByClassName('username');
    for (var i = 0; i < username.length; i++) {
      if (username[i].innerText === $(this).text().trim()) {
        $(username[i]).addClass('friend');
      }
    }
  }
};