/* Using Jquery validation jqBootstrapValidation */

$(function() {
	$("input,textarea").jqBootstrapValidation (
	{
		preventSubmit: true,
		submitError: function ($form, event, errors) {
			//something to have when submit produces an error? 
			//Not sure yet
		},
		submitSuccess: function($form, event) {
			event.preventDefault();
			// get values from FORM element
			var name = $("input#name").val();
			var email =$("input#email").val();
			var message =$("textarea#message").val();
			var firstName = name; // This is for sucess/fail message
			//Check for white space in name for success/fail
			if (firstName.indexOf(' ') >= 0) {
				firstName = name.split(' ').slice(0, -1).join(' ');
			}
			$.ajax({
				url: "./contact_me.php",
				type: "POST",
				data: {name: name, email: email, message: message},
				cache: false,
				success: function() {
					//success message
					$('#success').html("<div class='alert alert-success'>");
            	   $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            		.append( "</button>");
            	  $('#success > .alert-success')
            		.append("<strong>Your message has been sent. </strong>");
 		  $('#success > .alert-success')
 			.append('</div>');
 						    
 		  //clear all fields
 		  $('#contactForm').trigger("reset");
 	      },
 	      error: function() {		
 		// Fail message
 		 $('#success').html("<div class='alert alert-danger'>");
            	$('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            	 .append( "</button>");
            	$('#success > .alert-danger').append("<strong>Sorry "+firstName+" it seems that my mail server is not responding...</strong> Could you please email me directly to <a href='mailto:nihongotraveler@icloud.com?Subject=Contact from Sinying-Sanghou'>nihongotraveler@icloud.com</a> ? Sorry for the inconvenience!");
 	        $('#success > .alert-danger').append('</div>');
 		//clear all fields
 		$('#contactForm').trigger("reset");
 	    },
           })
         },
            filter: function() {
                   return $(this).is(":visible");
         },
       });

      $("a[data-toggle=\"tab\"]").click(function(e) {
                    e.preventDefault();
                    $(this).tab("show");
        });
  });
 
 /*When clicking onf ull hide fail/success boxes */
 $('#name').focus(function() {
 	$('#success').html('');

 });
