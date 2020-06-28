const cron = require("node-cron");
const croncontroller = require("./croncontroller");
//cron.schedule("* * * * *", function() {
  //  console.log("running a task every minute");
//cron.schedule("0 */12 * * *",function(){
//});


//cron.schedule("* * * * *", function() {
    cron.schedule("0 */12 * * *",function(){ 
    croncontroller.maillist();
    console.log("running a task every minute");
});