//import.controller.js
angular.module("brandqastApp")
.controller("ExportController", function(product_line, product_line_revision, $scope, $localStorage, Upload) {
   $scope.product_line = product_line.data;
   $scope.product_line_revision = product_line_revision.data;

   if($localStorage.flash_message) {
     $scope.flash_message = $localStorage.flash_message;
     $localStorage.flash_message = undefined;
   }

   $scope.submit = function() {
     console.log("we are uploading a file!");
     if ($scope.file) {
       $scope.upload($scope.file);
     }
   };

   $scope.upload = function (file) {
       Upload.upload({
           url: '/api/v1/product_line_revisions/' + $scope.product_line_revision._id + '/products/import',
           data: {file: file }
       }).then(function (resp) {
           console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
       }, function (resp) {
           console.log('Error status: ' + resp.status);
       }, function (evt) {
           var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
           console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
       });
   };
});
