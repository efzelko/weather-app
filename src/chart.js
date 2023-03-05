google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ["Time", "Temp"],
    ["4am", 20],
    ["8am", 25],
    ["12pm", 34],
    ["4pm", 30],
    ["8pm", 26],
    ["12am", 18],
  ]);

  var options = {
    curveType: "function",
    legend: { position: "none" },
    vAxis: {
      title: "Temp(°F)",
      titleTextStyle: { color: "#828282" },
    },
    backgroundColor: "#f5f7fa",
  };

  var chart = new google.visualization.LineChart(
    document.getElementById("chart")
  );

  chart.draw(data, options);
}
