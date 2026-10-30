(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const COLORS = {text:"#dce7f8",muted:"#94a7c2",grid:"#26364d",blue:"#76a9ff",teal:"#5eead4"};
  let data = [];
  let stats = null;
  let grid = null;
  let currentModel = "normal";
  let bandwidthMultiplier = 1;
  let plotResolution = 45;
  let dataSource = "generated";

  function seededRandom(seed) {
    let s = (Number(seed) || 1) >>> 0;
    return () => { s = (1664525 * s + 1013904223) >>> 0; return (s + 1) / 4294967297; };
  }
  function makeNormalGenerator(rand) {
    let spare = null;
    return () => {
      if (spare !== null) { const v = spare; spare = null; return v; }
      let u = 0, v = 0;
      while (u === 0) u = rand();
      while (v === 0) v = rand();
      const mag = Math.sqrt(-2 * Math.log(u)), angle = 2 * Math.PI * v;
      spare = mag * Math.sin(angle);
      return mag * Math.cos(angle);
    };
  }
  function generate(n, rho, seed, meanX=0, meanY=0, sdX=1, sdY=1) {
    const rand = seededRandom(seed), normal = makeNormalGenerator(rand);
    return Array.from({length:n}, () => {
      const z1 = normal(), z2 = normal();
      return {x:meanX + sdX*z1, y:meanY + sdY*(rho*z1 + Math.sqrt(Math.max(0,1-rho*rho))*z2)};
    });
  }
  function generationSettings() {
    const mx=Number($("meanXParam").value), my=Number($("meanYParam").value);
    const sx=Number($("sdXParam").value), sy=Number($("sdYParam").value);
    const rho=Number($("targetRhoParam").value);
    if (![mx,my,sx,sy,rho].every(Number.isFinite) || sx<=0 || sy<=0 || rho<=-1 || rho>=1) {
      throw new Error("Enter finite means, positive standard deviations, and a target correlation strictly between -1 and 1.");
    }
    return {mx,my,sx,sy,rho};
  }
  function mean(arr) { return arr.reduce((a,b)=>a+b,0)/arr.length; }
  function summarize(points) {
    if (points.length < 2) throw new Error("Please provide at least two valid numeric rows.");
    const xs=points.map(p=>p.x), ys=points.map(p=>p.y), mx=mean(xs), my=mean(ys);
    let xx=0, yy=0, xy=0;
    for (const p of points) { const dx=p.x-mx, dy=p.y-my; xx+=dx*dx; yy+=dy*dy; xy+=dx*dy; }
    const den=points.length-1, vx=xx/den, vy=yy/den, cov=xy/den;
    if (!(vx>0) || !(vy>0)) throw new Error("Both columns must have nonzero variation.");
    return {n:points.length,mx,my,vx,vy,sx:Math.sqrt(vx),sy:Math.sqrt(vy),cov,r:cov/Math.sqrt(vx*vy),det:vx*vy-cov*cov};
  }
  const gaussian = z => Math.exp(-0.5*z*z)/Math.sqrt(2*Math.PI);
  function normalPDF(x,y,s=stats) {
    const dx=x-s.mx, dy=y-s.my, det=s.vx*s.vy-s.cov*s.cov;
    if (det <= 1e-12) return 0;
    const q=(s.vy*dx*dx - 2*s.cov*dx*dy + s.vx*dy*dy)/det;
    return Math.exp(-0.5*q)/(2*Math.PI*Math.sqrt(det));
  }
  function kdeBandwidth() {
    const n=data.length;
    // Scott-style bivariate bandwidth: scale by n^(-1/6); separate bandwidths
    const factor=Math.pow(n,-1/6);
    return {hx:Math.max(stats.sx*factor*bandwidthMultiplier,1e-6),hy:Math.max(stats.sy*factor*bandwidthMultiplier,1e-6)};
  }
  function kdePDF(x,y) {
    const {hx,hy}=grid.bandwidth;
    let sum=0;
    for (const p of data) sum += gaussian((x-p.x)/hx)*gaussian((y-p.y)/hy);
    return sum/(data.length*hx*hy);
  }
  function density(x,y) { return currentModel==="normal" ? normalPDF(x,y) : kdePDF(x,y); }
  function marginalX(x) {
    if(currentModel==="normal") return gaussian((x-stats.mx)/stats.sx)/stats.sx;
    const h=grid.bandwidth.hx; let sum=0;
    for(const p of data) sum+=gaussian((x-p.x)/h);
    return sum/(data.length*h);
  }
  function marginalY(y) {
    if(currentModel==="normal") return gaussian((y-stats.my)/stats.sy)/stats.sy;
    const h=grid.bandwidth.hy; let sum=0;
    for(const p of data) sum+=gaussian((y-p.y)/h);
    return sum/(data.length*h);
  }
  function bounds() {
    const xs=data.map(p=>p.x), ys=data.map(p=>p.y);
    const padX=(Math.max(...xs)-Math.min(...xs))*0.15 || 1;
    const padY=(Math.max(...ys)-Math.min(...ys))*0.15 || 1;
    return {xmin:Math.min(...xs)-padX,xmax:Math.max(...xs)+padX,ymin:Math.min(...ys)-padY,ymax:Math.max(...ys)+padY};
  }
  function buildGrid() {
    const b=bounds(), steps=plotResolution;
    grid={...b,steps,bandwidth:kdeBandwidth()};
    grid.x=Array.from({length:steps},(_,i)=>b.xmin+(b.xmax-b.xmin)*i/(steps-1));
    grid.y=Array.from({length:steps},(_,i)=>b.ymin+(b.ymax-b.ymin)*i/(steps-1));
    grid.z=grid.y.map(y=>grid.x.map(x=>density(x,y)));
  }
  function layoutBase(title) {
    return {title:{text:title,font:{size:13,color:COLORS.text}},paper_bgcolor:"rgba(0,0,0,0)",plot_bgcolor:"rgba(0,0,0,0)",
      font:{family:"DM Sans, sans-serif",color:COLORS.text,size:11},margin:{l:55,r:20,t:45,b:50},
      xaxis:{gridcolor:COLORS.grid,zerolinecolor:COLORS.grid},yaxis:{gridcolor:COLORS.grid,zerolinecolor:COLORS.grid},
      legend:{orientation:"h",y:-0.2},autosize:true};
  }
  const config={responsive:true,displaylogo:false,modeBarButtonsToRemove:["select2d","lasso2d"]};
  function drawSurface() {
    const trace={type:"surface",x:grid.x,y:grid.y,z:grid.z,colorscale:"Viridis",showscale:true,
      colorbar:{title:{text:"Density",font:{color:COLORS.text}},tickfont:{color:COLORS.text},thickness:12},
      hovertemplate:"X: %{x:.3f}<br>Y: %{y:.3f}<br>Density: %{z:.5f}<extra></extra>"};
    const layout={paper_bgcolor:"rgba(0,0,0,0)",font:{family:"DM Sans",color:COLORS.text},margin:{l:0,r:0,t:20,b:0},
      scene:{xaxis:{title:"X",backgroundcolor:"#111c2d",gridcolor:COLORS.grid,color:COLORS.text},
        yaxis:{title:"Y",backgroundcolor:"#111c2d",gridcolor:COLORS.grid,color:COLORS.text},
        zaxis:{title:"Density",backgroundcolor:"#111c2d",gridcolor:COLORS.grid,color:COLORS.text},
        camera:{eye:{x:1.55,y:1.55,z:1.1}}}};
    Plotly.react("surfacePlot",[trace],layout,config);
  }
  function drawContour() {
    const trace={type:"contour",x:grid.x,y:grid.y,z:grid.z,colorscale:"Viridis",ncontours:18,
      contours:{coloring:"heatmap",showlabels:true},colorbar:{title:"Density",tickfont:{color:COLORS.text}},
      hovertemplate:"X: %{x:.3f}<br>Y: %{y:.3f}<br>Density: %{z:.5f}<extra></extra>"};
    const layout=layoutBase("Joint density fX,Y(x, y)");
    layout.xaxis.title="X"; layout.yaxis.title="Y";
    Plotly.react("contourPlot",[trace],layout,config);
  }
  function drawMarginals() {
    const xs=Array.from({length:160},(_,i)=>grid.xmin+(grid.xmax-grid.xmin)*i/159);
    const ys=Array.from({length:160},(_,i)=>grid.ymin+(grid.ymax-grid.ymin)*i/159);
    const layout=layoutBase("Marginal probability densities");
    layout.xaxis.title="Value"; layout.yaxis.title="Density";
    Plotly.react("marginalPlot",[
      {type:"scatter",mode:"lines",name:"fX(x)",x:xs,y:xs.map(marginalX),line:{color:COLORS.blue,width:3},hovertemplate:"X: %{x:.3f}<br>fX(x): %{y:.4f}<extra></extra>"},
      {type:"scatter",mode:"lines",name:"fY(y)",x:ys,y:ys.map(marginalY),line:{color:COLORS.teal,width:3},hovertemplate:"Y: %{x:.3f}<br>fY(y): %{y:.4f}<extra></extra>"}
    ],layout,config);
  }
  function drawScatter() {
    const layout=layoutBase("Observed paired values");
    layout.xaxis.title="X"; layout.yaxis.title="Y";
    Plotly.react("scatterPlot",[{type:"scatter",mode:"markers",x:data.map(p=>p.x),y:data.map(p=>p.y),
      marker:{size:6,color:COLORS.blue,opacity:.65,line:{width:0}},name:"Observations",
      hovertemplate:"X: %{x:.3f}<br>Y: %{y:.3f}<extra></extra>"}],layout,config);
  }
  function fmt(v) { return Number(v).toFixed(3); }
  function updateMetrics() {
    $("countMetric").textContent = stats.n;

    $("corrMetric").textContent = fmt(stats.r);

    $("corrLabel").textContent =
        stats.r > 0.05 ? "positive linear association" :
        stats.r < -0.05 ? "negative linear association" :
        "little linear association";

    $("meanXMetric").textContent = fmt(stats.mx);
    $("meanYMetric").textContent = fmt(stats.my);

    $("sdXMetric").textContent = "SD " + fmt(stats.sx);
    $("sdYMetric").textContent = "SD " + fmt(stats.sy);

    // Estimated expected values
    $("expectedXMetric").textContent = fmt(stats.mx);
    $("expectedYMetric").textContent = fmt(stats.my);

    // Detailed correlation
    $("correlationDetailMetric").textContent = fmt(stats.r);

    // KDE bandwidth
    $("bandwidthOut").textContent =
        bandwidthMultiplier.toFixed(2) + "×";

    // Dataset information
    $("dataStatus").textContent =
        `${stats.n} observations loaded`;

    $("modelTag").textContent =
        currentModel === "normal"
            ? "Fitted bivariate normal"
            : "Gaussian KDE";

    $("rangeStatus").textContent =
        `Showing ${Math.min(20, data.length)} of ${data.length} rows`;

    // Populate observation table
    $("dataTable").innerHTML = data
        .slice(0, 20)
        .map((p, i) =>
            `<tr>
                <td>${i + 1}</td>
                <td>${fmt(p.x)}</td>
                <td>${fmt(p.y)}</td>
            </tr>`
        )
        .join("");
}
  function render() {
    try {
      stats=summarize(data); currentModel=$("model").value;
      plotResolution=Number($("resolutionParam")?.value || 45);
      buildGrid(); updateMetrics();
      drawSurface(); drawContour(); drawMarginals(); drawScatter();
      $("probResult").textContent="—"; $("probNote").textContent="Set bounds and calculate a probability.";
    } catch(err) { alert(err.message); }
  }
  function calculateProbability() {
    const a=Number($("xmin").value), b=Number($("xmax").value), c=Number($("ymin").value), d=Number($("ymax").value);
    if (![a,b,c,d].every(Number.isFinite) || a>=b || c>=d) { alert("Enter valid bounds where each minimum is less than its maximum."); return; }
    // Midpoint quadrature over the rectangle; finer grid improves accuracy at additional computational cost.
    const nx=70, ny=70, dx=(b-a)/nx, dy=(d-c)/ny;
    let total=0;
    for(let i=0;i<nx;i++) for(let j=0;j<ny;j++) total+=density(a+(i+.5)*dx,c+(j+.5)*dy)*dx*dy;
    $("probResult").textContent=(Math.max(0,Math.min(1,total))*100).toFixed(2)+"%";
    $("probNote").textContent=`Numerical midpoint estimate · ${currentModel==="normal"?"fitted bivariate normal":"Gaussian KDE"} · bounds [${fmt(a)}, ${fmt(b)}] × [${fmt(c)}, ${fmt(d)}]`;
  }
  function parseCSV(text) {
    const rows=[]; let row=[], cell="", quoted=false;
    for(let i=0;i<text.length;i++){
      const ch=text[i];
      if(ch==='"' && quoted && text[i+1]==='"'){cell+='"';i++;}
      else if(ch==='"') quoted=!quoted;
      else if(ch===',' && !quoted){row.push(cell.trim());cell="";}
      else if((ch==='\n'||ch==='\r')&&!quoted){
        if(ch==='\r'&&text[i+1]==='\n')i++;
        row.push(cell.trim()); if(row.some(v=>v!==""))rows.push(row); row=[];cell="";
      } else cell+=ch;
    }
    row.push(cell.trim()); if(row.some(v=>v!==""))rows.push(row);
    if(rows.length<2) throw new Error("CSV must contain at least two data rows.");
    // Detect a header if either of the first two cells in row 1 is not numeric.
    const first=rows[0], hasHeader=first.length<2 || !Number.isFinite(Number(first[0])) || !Number.isFinite(Number(first[1]));
    const start=hasHeader?1:0, result=[];
    for(let i=start;i<rows.length;i++){
      const x=Number(rows[i][0]), y=Number(rows[i][1]);
      if(rows[i].length>=2 && rows[i][0]!=="" && rows[i][1]!=="" && Number.isFinite(x)&&Number.isFinite(y)) result.push({x,y});
    }
    if(result.length<2) throw new Error("Could not find at least two valid numeric pairs in the first two columns.");
    return result;
  }
  function exportCSV() {
    const lines=["x,y",...data.map(p=>`${p.x},${p.y}`)];
    const blob=new Blob([lines.join("\r\n")],{type:"text/csv;charset=utf-8;"});
    const url=URL.createObjectURL(blob), a=document.createElement("a");
    a.href=url;a.download="bivariate-data.csv";document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);
  }
  function loadExample() {
    dataSource="example";
    data=[
      {x:-2.1,y:-1.5},{x:-1.8,y:-1.2},{x:-1.6,y:-1.7},{x:-1.4,y:-.8},{x:-1.2,y:-.9},
      {x:-1.1,y:-.3},{x:-.9,y:-1.1},{x:-.7,y:-.4},{x:-.5,y:-.8},{x:-.4,y:.1},
      {x:-.2,y:-.5},{x:0,y:.2},{x:.1,y:-.2},{x:.3,y:.7},{x:.4,y:.2},
      {x:.6,y:.8},{x:.7,y:.3},{x:.9,y:1.2},{x:1.1,y:.6},{x:1.2,y:1.5},
      {x:1.4,y:.9},{x:1.6,y:1.7},{x:1.8,y:1.1},{x:2.0,y:2.2},{x:2.2,y:1.5},
      ...generate(75,.72,97).map(p=>({x:p.x*1.05+.1,y:p.y*.9+.1}))
    ];
    render();
  }
  $("sampleSize").addEventListener("input",()=> $("nOut").textContent=$("sampleSize").value);
  $("rho").addEventListener("input",()=> $("rhoOut").textContent=Number($("rho").value).toFixed(2));
  function regenerateFromSettings(randomSeed = false, useAdvancedRho = false) {
    try {
        const s = generationSettings();

        if (randomSeed) {
            $("seed").value = String(
                1 + Math.floor(Math.random() * 999998)
            );
        }

        const rho = useAdvancedRho
            ? s.rho
            : Number($("rho").value);

        data = generate(
            Number($("sampleSize").value),
            rho,
            Number($("seed").value) || 1,
            s.mx,
            s.my,
            s.sx,
            s.sy
        );

        $("rho").value = rho;
        $("rhoOut").textContent = rho.toFixed(2);

        $("targetRhoParam").value = rho;

        dataSource = "generated";

        render();

    } catch (err) {
        alert(err.message);
    }
}
  $("generateBtn").addEventListener("click", () =>
    regenerateFromSettings(false, false)
  );
  $("randomizeBtn").addEventListener("click", () =>
    regenerateFromSettings(true, false)
  );
  $("settingsToggle").addEventListener("click",()=>{
    const panel=$("settingsPanel"), opening=panel.hidden;
    panel.hidden=!opening; $("settingsToggle").setAttribute("aria-expanded",String(opening));
  });
  $("closeSettingsBtn").addEventListener("click",()=>{
    $("settingsPanel").hidden=true; $("settingsToggle").setAttribute("aria-expanded","false");
  });
  $("applySettingsBtn").addEventListener("click", () =>
    regenerateFromSettings(false, true)
  );
  $("model").addEventListener("change",render);
  $("csvFile").addEventListener("change",async e=>{
    const file=e.target.files[0]; if(!file)return;
    try{data=parseCSV(await file.text());dataSource="csv";render();}catch(err){alert(err.message);} e.target.value="";
  });
  $("exportBtn").addEventListener("click",exportCSV);
  $("probBtn").addEventListener("click",calculateProbability);
  $("exampleBtn").addEventListener("click",loadExample);
  $("resetBtn").addEventListener("click",()=>{
    $("model").value="normal";$("sampleSize").value=300;$("nOut").textContent="300";$("rho").value=.65;$("rhoOut").textContent=".65";$("seed").value=42;
    $("meanXParam").value=0;$("meanYParam").value=0;$("sdXParam").value=1;$("sdYParam").value=1;$("targetRhoParam").value=.65;$("resolutionParam").value="45";plotResolution=45;
    data=generate(300,.65,42);dataSource="generated";render();
  });
  data=generate(300,.65,42);dataSource="generated";render();
})();