import tkinter as tk
from tkinter import ttk
from tkinter.scrolledtext import ScrolledText
from data_loader import load_data as ld
from data_loader2 import load_data as ld2
from mean import mean as m1,mean_of as mo1
from median import median as m2,median_of as mo2
from standard_deviation import standard_deviation as std,standard_deviation_of as stdo
from variance import variance as v ,variance_of as vo
from covariance import covariance as cov
from correlation_coefficient import correlation_coefficient as corr
from confidence_interval_95 import confidence_interval_95


output = None


def generate_report():
    output.delete('1.0',tk.END)
    report = f'''Data from "data.json"

Mean: {m1()}
Median: {m2()}
Variance: {v()}
Standard Deviation: {std()}

=================================================================

'''
    data = ld('confidence_data.json')['data']
    size = ld('confidence_data.json')['size']
    sample_mean,lower,upper = confidence_interval_95(data,size)
    report += f'''95%-Confidence Interval from "confidence_data.json"

Sample Mean: {sample_mean:.2f}
95%-Confidence Interval: ({lower:.2f}, {upper:.2f})

=================================================================

Data from "data2.json"

'''
    x = ld2('data2.json')['x']
    y = ld2('data2.json')['y']
    size = ld2('data2.json')['size']
    report += f'''Mean of X: {mo1(x,size)}
Median of X: {mo2(x,size)}
Variance of X: {vo(x,size)}
Standard Deviation of X: {stdo(x,size)}

Mean of Y: {mo1(y,size)}
Median of Y: {mo2(y,size)}
Variance of Y: {vo(y,size)}
Standard Deviation of Y: {stdo(y,size)}

Covariance of X and Y: {cov()}

Correlation Coefficient of X and Y: {corr()}
'''
    output.insert(tk.END,report)


def run_gui():
    global output
    root = tk.Tk()
    root.configure(bg='#282832')
    style = ttk.Style()
    style.theme_use('clam')
    style.configure('TButton',font=('Segoe UI', 11),background='#3f3f4e',foreground='#ecf0f1',borderwidth=1,bordercolor='#3f3f4e',focuscolor='none')
    style.map('TButton',background=[('pressed', '#282832'), ('active', '#4f4f61')],foreground=[('active', '#ffffff')],bordercolor=[('active', '#4f4f61')])
    style.configure('TLabel',background='#282832',foreground='#ecf0f1')
    root.title('Statistics Calculator')
    root.geometry('800x600')
    title = ttk.Label(root,text='Statistics Calculator',font=('Segoe UI',16,'bold'))
    title.pack(pady=5)
    calculate_button = ttk.Button(root,text='Calculate Statistics',command=generate_report)
    calculate_button.pack(pady=5)
    output = ScrolledText(root,width=90,height=30,font=('Consolas', 12),background='#282832',foreground='#ecf0f1',insertbackground='#ecf0f1',highlightbackground='#3f3f4e',highlightcolor='#00adb5',relief='flat')
    output.pack(padx=10,pady=10,fill=tk.BOTH,expand=True)
    root.mainloop()