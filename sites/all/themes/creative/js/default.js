jQuery(document).ready(function($) {  
  // clean up the initial question page. Just to avoid user enter in question , and already have his answer checked
  if ( $('form#closedquestion-get-form-for').length > 0 && !$('form#closedquestion-get-form-for input.form-radio').first().attr('disabled') ) {
    $('form#closedquestion-get-form-for input.form-radio').each(function() {
      $(this).removeAttr('checked')
    })
  
    $('form#closedquestion-get-form-for fieldset#edit-feedback').remove()
  }
  if ( $('form#closedquestion-get-form-for').length > 0 ) { 
    jQuery('form#closedquestion-get-form-for div#edit-options input').click(function() {
      jQuery('form#closedquestion-get-form-for input#edit-submit').show();
    })
  }
  
  if ( $('body.front div.messages.error').length == 1) {
    $('div#block-block-1').hide();
    $('div#block-block-2').hide();
    $('div#block-system-main').hide();
  }
  
  //avoid back page
  if ( $('form#closedquestion-get-form-for').length > 0 ) { 
    var question_id = "";
    jQuery('form#closedquestion-get-form-for div div').each(function() {
      var feedback_id = jQuery(this).attr('id');
      var feedback_lenght = feedback_id.length;
      var index = feedback_id.indexOf('_question');

      if (index > 1) {
        question_id = feedback_id.substring(index+9, feedback_lenght-1);
      }
    })
    jQuery.ajax({
      url: "closedquestion/avoidbackpage",
      data: {
        question_id: question_id
      },
      success: function(response) {
        if (response.forward) {
          window.history.forward();
        }
      },
      dataType: 'json',
      type: 'POST'
    });
  }
  
  //validate sudoku
  jQuery('div#big_square input').blur(function() {
    //validate number 1 to 9
    if (jQuery(this).val() > 9) {
      jQuery(this).val(jQuery(this).val().substring(0,1))
    }
    if (jQuery(this).val() < 1) {
      jQuery(this).val("")
    }
    
    var finish = 1;
    jQuery('div#big_square input').each(function() {
      if (jQuery(this).val() == "") {
        finish = 0;
      }
    })
  
    var result = "";
    if (finish) {
      jQuery('div#big_square div.line').each(function() {
        if (jQuery(this).html().indexOf('input') >= 0) {
          if (result == "") {
            result = jQuery(this).children('input').val()
          } else {
            result = result + ";" + jQuery(this).children('input').val()
          }
        } else {
          if (result == "") {
            result = jQuery(this).html()
          } else {
            result = result + ";" + jQuery(this).html()
          }
        }
      })
      
      jQuery.ajax({
        url: "sudoku/checkresult",
        data: {
          result: result,
          key: document.location.search.substring(1, document.location.search.length)
        },
        success: function(response) {
          if (jQuery('div#wrapper_end span').length > 0) {
            jQuery('div#wrapper_end span').remove()
          }
          jQuery('div#wrapper_end').append(response.html);
        },
        dataType: 'json',
        type: 'POST'
      });
    }
  })
  
});

function nextquestion_callback() {
  jQuery.ajax({
    url: "closedquestion/nextquestion",
    success: function(response) {
      document.location.href = response.url;
    },
    dataType: 'json',
    type: 'POST'
  });
}

function updateScore_callback() {
  var question_id = "";
  jQuery('form#closedquestion-get-form-for div div').each(function() {
    var feedback_id = jQuery(this).attr('id');
    var feedback_lenght = feedback_id.length;
    var index = feedback_id.indexOf('_question');

    if (index > 1) {
      question_id = feedback_id.substring(index+9, feedback_lenght-1);
    }
  })
  
  jQuery.ajax({
    url: "closedquestion/update_score",
    data: {
      question_id: question_id,
      feedback: jQuery('fieldset#edit-feedback div div p').text()
    },
    success: function(response) {
      if (!response.questionAnswered) {
        if (response.html.indexOf('http') >= 0) {
          document.location.href = response.html;
        } else {
          jQuery('form#closedquestion-get-form-for div#next-question').append("<span class='questionday'>"+ response.html +"</span>");
        }
      } else {
        jQuery('form#closedquestion-get-form-for div#next-question').append("<span class='questionday'>"+ response.html +"</span>");
      }
    },
    dataType: 'json',
    type: 'POST'
  });
}

function reiniciarSudoku() {
  jQuery('div#big_square div.line input').val("");
}

function createNewPhase() {
  var numberDays = jQuery('input#number_days').val();
  var description= jQuery('input#description').val();
  
  if (isNaN(numberDays) || numberDays < 0) {
    alert('Quantidade de dias inválido.');
  }
  
  jQuery.ajax({
    url: "create_new_phase",
    data: {
      numberDays : numberDays,
      description: description
    },
    success: function(response) {
      
    },
    dataType: 'json',
    type: 'POST'
  });
}