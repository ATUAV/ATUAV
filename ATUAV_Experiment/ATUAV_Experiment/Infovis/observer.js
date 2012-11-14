﻿var address = "http://localhost:8080/atuav";
var processorId = "observer";
var trackedSumFeatures = []

function startTask(userId, taskId, aois) {
    $.get(address + "/start?userId=" + userId + "&taskId=" + taskId + "&aois=" + aois)
}

function pollFeatures() {
    $.getJSON(address + "/features?processorId=" + processorId + "&callback=?", null, function (data) {
        var features = "";
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                features += (key + ": " + data[key] + "<br/>");
                if ($.inArray(key, trackedSumFeatures) >= 0) {
                    updateTrackedSumFeature(key, data[key]);
                }
            }
        }
        $("#features").html(features);
    });
}

function addTrackedSumFeatures() {
    $(".sum").each(function (index, element) {
        trackedSumFeatures[index] = element.id;
    })
}

function updateTrackedSumFeature(feature, value) {
    $feature = $("#" + feature);
    if ($feature.text() != "") {
        value = (parseInt($feature.text().match(/\d+/)) + parseInt(value));
    }
    $feature.text("sum " + feature + ": " + value);
}

$(document).ready(function () {
    addTrackedSumFeatures();
    startTask("test_user", "test_task", "left\\t0,0\\t640,0\\t640,1024\\t0,1024\\r\\nright\\t641,0\\t1280,0\\t1280,1024\\t641,1024")
    setInterval(pollFeatures, 5000);
});