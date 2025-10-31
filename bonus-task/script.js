$(document).ready(function () {
  $("#add-btn").click(function () {
    const value = $("#item-input").val().trim();
    if (value === "") {
      $(".fade-warning").fadeIn(200).delay(1000).fadeOut(300);
      return;
    }

    const li = $(
      `<li class="list-group-item d-flex justify-content-between align-items-center">
         ${value}
         <button class="btn btn-danger btn-sm delete-btn">❌</button>
       </li>`
    );

    $("#item-list").append(li);
    $("#item-input").val("");
  });

  $(document).on("click", ".delete-btn", function () {
    $(this).closest("li").fadeOut(200, function () {
      $(this).remove();
    });
  });
});
