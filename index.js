// const { Paper, Card } = require("@material-ui/core");

window.onload = function () {
  $.getJSON("http://localhost:3000/chan", (data) => {
    data = JSON.parse(data);
    console.log(data);
    // <Paper>
    //   <Card>
    //     <ima src={data.channelicon} />
    //   </Card>
    // </Paper>
  });
  setInterval(() => {
    $.getJSON("http://localhost:3000/chan", (data) => {
      data = JSON.parse(data);
      console.log(data);
    });
  }, 3000);
};
