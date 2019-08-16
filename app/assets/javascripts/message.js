$(function() {
  
    // 画面上の最新ID
    var latest_id = 0;
    function buildHTML(message) {
      var image = message.image.url ? `<img src= ${ message.image.url }>` : "";
      var html = `<div class="message" data-message-id="${message.id}"> 
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="lower-meesage">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                        ${image}
                    </div>
                  </div>`
      return html;
    }
  
    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var href = window.location.href + ''
      $('.form__submit').removeAttr('data-disable-with');

      $.ajax({
        url: href,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false,
        timeout: 10000
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);
        $('.form__message').val('');
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, "first");
        // 画面上の最新IDを更新
        latest_id = data.id;
      })
      .fail(function(){
        alert('非同期通信に失敗しました');
      });
    });
      var reloadMessages = function() {
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        if (window.location.href.match(/\/groups\/\d+\/messages/)){
        last_message_id = $('.message:last').data("message-id");
        $.ajax({
          url: "api/messages",
          type: 'get',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {
          var insertHTML = '';
          messages.forEach(function (message) {
            insertHTML = buildHTML(message);
            $('.messages').append(insertHTML);
          })
        })
        .fail(function() {
          alert('自動更新に失敗しました');
        });
      }
    }
  setInterval(reloadMessages, 5000);
});