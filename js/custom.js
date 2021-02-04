// Scroll active menu item into view
try {
  var offset = $('nav li.current:first')[0].offsetTop;
  // Somewhat arbitrary cutoff point
  if (offset > 300) {
    $('nav li.current:first')[0].scrollIntoView();
  }
}
catch (e) { /* noop */ }

// $(document).ready(function () {
//   $(function () {
//     if ($('li.current').length) {
//       $('.wy-nav-side').scrollTop(
//         $('li.current').offset().top - $('.wy-nav-side').offset().top - 90
//       );
//     }
//   });
// })