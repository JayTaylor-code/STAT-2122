# Joint Density & Marginals Viewer

A browser-based statistics explorer built with HTML, CSS, JavaScript, and Plotly.js.

## Features
- Interactive rotatable 3D joint-density surface
- 2D joint-density contour/heatmap
- Marginal density curves for X and Y
- Generated bivariate-normal sample data with adjustable sample size, seed, target means, standard deviations, and correlation
- Randomize sample set action for a new random seed
- Expandable Parameters & Settings panel with plot-resolution control
- CSV import and export
- Fitted bivariate-normal density and Gaussian kernel density estimation (KDE)
- Pearson correlation, descriptive statistics, and sample-mean estimates of E[X] and E[Y]
- Numerical joint-probability estimate over a user-selected rectangle
- Responsive layout for desktop, tablet, and mobile

## Run it
1. Extract the ZIP file.
2. Open `index.html` in a modern browser.
3. Keep an internet connection available so Plotly.js can load from its CDN.

No build step or server is required for typical use. If a browser restricts local file behavior, run a local static server from this folder:
- Python: `python -m http.server 8000`
- Then open `http://localhost:8000`

On iPad/iPhone, the easiest option is to host the three files on a static site (for example, GitHub Pages) and open the resulting HTTPS page in Safari. The Plotly CDN requires internet access.

## CSV format
The app reads the first two columns as numeric X and Y values. A header row is optional. Example:

```csv
x,y
-1.2,-0.7
0.4,1.1
1.3,0.8
```

Rows without two valid numeric values are skipped. Extra columns are ignored. Export downloads all current observations as `bivariate-data.csv`.

## Model notes
### Fitted bivariate normal
The normal model uses the sample means and sample covariance matrix to estimate a bivariate normal density. Its marginal curves are the corresponding univariate normal densities.

### KDE
The KDE is a Gaussian-kernel estimate over the observed pairs. Separate X and Y bandwidths use a Scott-style scale rule, `n^(-1/6)`. KDE marginal curves are estimated from the same observations using the corresponding one-dimensional Gaussian kernels.

### Rectangle probability
The app approximates the integral of the selected joint density over the rectangle using midpoint quadrature. The displayed percentage is a numerical estimate, not an exact symbolic probability. For KDE, the estimate can be affected by the finite plotting/sample support and bandwidth.

## Files
- `index.html` — page structure and Plotly CDN reference
- `styles.css` — responsive dark UI styling
- `app.js` — data generation, CSV handling, density estimation, plotting, and probability integration


## Statistics and settings update
- Sample means, sample standard deviations, covariance, and Pearson correlation are shown in the summary cards.
- `E[X]` and `E[Y]` are displayed as the means of the fitted normal model or Gaussian KDE mixture. For this Gaussian KDE, these equal the corresponding sample means.
- The model-correlation card reports the fitted correlation parameter for the bivariate normal model; for KDE, it reports the sample Pearson correlation as a descriptive statistic.
- Expand **Parameters & settings** to adjust density model, generated sample size, target correlation for newly generated data, seed, and KDE bandwidth multiplier.
- **Randomize sample set** chooses a fresh random seed and generates a new sample while preserving sample size and target correlation settings.
