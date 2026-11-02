function mean(data) {
    return (data.reduce((a,b) => a+b, 0) / data.length);
}
function median(data) {
    let sorted = [...data].sort((a,b) => a-b);
    let mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 == 0) {
        return ((sorted[mid-1] + sorted[mid]) / 2);
    }
    else {
        return sorted[mid];
    }
}
function variance(data) {
    let m = mean(data);
    return (data.reduce((sum,x) => sum + (x-m)**2, 0) / data.length);
}
function standardDeviation(data) {
    return Math.sqrt(variance(data));
}
function expectation(data) {
    return mean(data);
}
function pmf(data) {
    let counts = {};
    data.forEach(x => {
        counts[x] = (counts[x] || 0) + 1;
    });
    let result = {};
    for (let key in counts) {
        result[key] = counts[key] / data.length;
    }
    return result;
}
function pdfApproximation(data) {
    let counts = {};
    data.forEach(x => {
        counts[x] = (counts[x] || 0) + 1;
    });
    let result = {}
    for (let key in counts) {
        result[key] = counts[key] / data.length;
    }
    return result;
}
function correlation(x,y) {
    if (x.length !== y.length || x.length === 0) {
        return "Invalid Data";
    }
    let meanX = mean(x);
    let meanY = mean(y);
    let numerator = 0;
    let sumX = 0;
    let sumY = 0;
    for (let i = 0; i < x.length; i++) {
        let dx = x[i] - meanX;
        let dy = y[i] - meanY;
        numerator += dx * dy;
        sumX += dx * dx;
        sumY += dy * dy;
    }
    return (numerator / Math.sqrt(sumX * sumY));
}
function calculate() {
    let x = document.getElementById("xData").value.split(",").map(Number).filter(n => !isNaN(n));
    let y = document.getElementById("yData").value.split(",").map(Number).filter(n => !isNaN(n));
    let output = "";
    output += `Mean of X: ${mean(x).toFixed(4)}\n`;
    output += `Median of X: ${median(x).toFixed(4)}\n`;
    output += `Expectation E(X): ${expectation(x).toFixed(4)}\n`;
    output += `Variance of X: ${variance(x).toFixed(4)}\n`;
    output += `Standard Deviation of X: ${standardDeviation(x).toFixed(4)}\n\n`;
    output += "PMF:\n";
    let pmfResultX = pmf(x);
    for(let value in pmfResultX){
        output += `P(X=${value}) = ${pmfResultX[value].toFixed(4)}\n`;
    }
    output += "\nPDF Approximation:\n";
    let pdfResultX = pdfApproximation(x);
    for(let value in pdfResultX){
        output += `f(${value}) = ${pdfResultX[value].toFixed(4)}\n`;
    }
    output += "\n";
    output += `Mean of Y: ${mean(y).toFixed(4)}\n`
    output += `Median of Y: ${median(y).toFixed(4)}\n`
    output += `Expectation E(Y): ${expectation(y).toFixed(4)}\n`
    output += `Variance of Y: ${variance(y).toFixed(4)}\n`
    output += `Standard Deviation of Y: ${standardDeviation(y).toFixed(4)}\n\n`
    output += "PMF:\n";
    let pmfResultY = pmf(y);
    for(let value in pmfResultY){
        output += `P(Y=${value}) = ${pmfResultY[value].toFixed(4)}\n`;
    }
    output += "\nPDF Approximation:\n";
    let pdfResultY = pdfApproximation(y);
    for(let value in pdfResultY){
        output += `f(${value}) = ${pdfResultY[value].toFixed(4)}\n`;
    }
    output += "\n";
    if (x.length === y.length && x.length > 1) {
        output += `Correlation Coefficient (r): ${correlation(x,y).toFixed(4)}\n`;
    }
    document.getElementById("output").textContent = output;
    document.getElementById("output").style.display = "block";
}
function clearAll() {
    document.getElementById("xData").value = "";
    document.getElementById("yData").value = "";
    document.getElementById("output").textContent = "";
    document.getElementById("output").style.display = "none";
}
function getJointPMF() {
    const numX = parseInt(document.getElementById("numX").value);
    const numY = parseInt(document.getElementById("numY").value);
    let xValues = []
    let yValues = []
    let probabilities = []
    for (let x = 0; x < numX; x++) {
        xValues.push(Number(document.getElementById(`xValue${x}`).value));
    }
    for (let y = 0; y < numY; y++) {
        yValues.push(Number(document.getElementById(`yValue${y}`).value));
        let row = [];
        for (let x = 0; x < numX; x++) {
            row.push(Number(document.getElementById(`p_${y}_${x}`).value));
        }
        probabilities.push(row);
    }
    return {xValues, yValues, probabilities};
}
function marginalX(joint) {
    let cols = joint.xValues.length;
    let result = Array(cols).fill(0);
    for (let y = 0; y < joint.yValues.length; y++) {
        for (let x = 0; x < cols; x++) {
            result[x] += joint.probabilities[y][x];
        }
    }
    return result;
}
function marginalY(joint) {
    return joint.probabilities.map(row => row.reduce((a,b)=>a+b,0));
}
function expectedX(joint) {
    let ex = 0;
    for (let y = 0; y < joint.yValues.length; y++) {
        for (let x = 0; x < joint.xValues.length; x++) {
            ex += joint.xValues[x] * joint.probabilities[y][x];
        }
    }
    return ex;
}
function expectedY(joint) {
    let ey = 0;
    for (let y = 0; y < joint.yValues.length; y++) {
        for (let x = 0; x < joint.xValues.length; x++) {
            ey += joint.yValues[y] * joint.probabilities[y][x];
        }
    }
    return ey;
}
function expectedXY(joint) {
    let exy = 0;
    for (let y = 0; y < joint.yValues.length; y++) {
        for (let x = 0; x < joint.xValues.length; x++) {
            exy += joint.xValues[x] * joint.yValues[y] * joint.probabilities[y][x];
        }
    }
    return exy;
}
function varianceX(joint) {
    const ex = expectedX(joint);
    let ex2 = 0;
    for (let y = 0; y < joint.yValues.length; y++) {
        for (let x = 0; x < joint.xValues.length; x++) {
            ex2 += joint.xValues[x] * joint.xValues[x] * joint.probabilities[y][x];
        }
    }
    return (ex2 - ex * ex);
}
function varianceY(joint) {
    const ey = expectedY(joint);
    let ey2 = 0;
    for (let y = 0; y < joint.yValues.length; y++) {
        for (let x = 0; x < joint.xValues.length; x++) {
            ey2 += joint.yValues[y] * joint.yValues[y] * joint.probabilities[y][x];
        }
    }
    return (ey2 - ey * ey);
}
function covariance(joint) {
    return (expectedXY(joint) - expectedX(joint) * expectedY(joint));
}
function correlationJoint(joint) {
    const cov = covariance(joint);
    const sdX = Math.sqrt(varianceX(joint));
    const sdY = Math.sqrt(varianceY(joint));
    return (cov / (sdX * sdY));
}
function isIndependent(joint) {
    const px = marginalX(joint);
    const py = marginalY(joint);
    const tolerance = 0.0001;
    for(let y = 0; y < joint.yValues.length; y++) {
        for(let x = 0; x < joint.xValues.length; x++) {
            const expected = px[x] * py[y];
            if(Math.abs(joint.probabilities[y][x] - expected) > tolerance)
                return false;
        }
    }
    return true;
}
function generateTable() {
    const numX = parseInt(document.getElementById("numX").value);
    const numY = parseInt(document.getElementById("numY").value);
    let html = "<table>";
    html += "<tr>";
    html += "<th></th>";
    for (let x = 0; x < numX; x++) {
        html += `<th><input type="number" step="any" id="xValue${x}" placeholder="X${x}"></th>`;
    }
    html += "</tr>";
    for (let y = 0; y < numY; y++) {
        html += "<tr>";
        html += `<th><input type="number" step="any" id="yValue${y}" placeholder="Y${y}"></th>`;
        for (let x = 0; x < numX; x++) {
            html += `<td><input type="number" step="any" id="p_${y}_${x}" placeholder="P"></td>`;
        }
        html += "</tr>";
    }
    html += "</table>";
    document.getElementById("tableContainer").innerHTML = html;
}
function calculateJointPMF() {
    const joint = getJointPMF();
    let output = "";
    output += "Marginal PMF of X:\n"
    const px = marginalX(joint);
    px.forEach((p,x) => {output += `P(X=${joint.xValues[x]}) = ${p.toFixed(4)}\n`});
    output += "\nMarginal PMF of Y:\n"
    const py = marginalY(joint);
    py.forEach((p,y) => {output += `P(Y=${joint.yValues[y]}) = ${p.toFixed(4)}\n`});
    output += `\nE(X) = ${expectedX(joint).toFixed(4)}\n`;
    output += `E(Y) = ${expectedY(joint).toFixed(4)}\n`;
    output += `E(XY) = ${expectedXY(joint).toFixed(4)}\n`;
    output += `\nVar(X) = ${varianceX(joint).toFixed(4)}\n`;
    output += `Var(Y) = ${varianceY(joint).toFixed(4)}\n`;
    output += `\nCov(X,Y) = ${covariance(joint).toFixed(4)}\n`
    output += `Correlation = ${correlationJoint(joint).toFixed(4)}\n`
    output += `\nIndependent? ${isIndependent(joint) ? "Yes" : "No"}`;
    document.getElementById("jointOutput").textContent = output;
    document.getElementById("jointOutput").style.display = "block";
}
function clearJointPMF() {
    document.getElementById("numX").value = "";
    document.getElementById("numY").value = "";
    document.getElementById("tableContainer").innerHTML = "";
    document.getElementById("jointOutput").textContent = "";
    document.getElementById("jointOutput").style.display = "none";
}