$(document).on('turbolinks:load', function(){
  
    // 画面上の最新ID
    function buildHTML(message) {
      var image = message.image ? `<img src= ${ message.image }>` : "";
      var html = `<div class="message" data-message-id="${message.id}"> 
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-meesage">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                    </div>
                    ${image}
                  </div>`
      return html;
    }
  
    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $('.form__submit').removeAttr('data-disable-with');

      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false,
        timeout: 10000
      })
      .done(function(data){
        $('#new_message')[0].reset();
        var html = buildHTML(data);
        $('.messages').append(html);
        // $('.form__message').val('');
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, "first");
        // 画面上の最新IDを更新
        // latest_id = data.id;
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