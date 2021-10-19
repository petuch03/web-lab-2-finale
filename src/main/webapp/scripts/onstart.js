let tableInfo = Array.prototype.map.call(document.querySelectorAll('#tableWithResults tr'), function(tr){
    return Array.prototype.map.call(tr.querySelectorAll('td'), function(td){
        return td.innerHTML;
    });
});

for (let i = 1; i < tableInfo.length; i++) {
    console.log(tableInfo[i][0] + " --- " + tableInfo[i][1] + " --- " + tableInfo[i][2] + " --- " + tableInfo[i][3]);
    drawPoint(tableInfo[i][0], tableInfo[i][1], tableInfo[i][2], ((tableInfo[i][3] === 'yes') ? "#22be00" : "#ff0000"));
}