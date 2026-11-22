#include "mainwindow.h"
#include <QDoubleSpinBox>
#include <QSpinBox>
#include <QLabel>
#include <QPushButton>
#include <QFormLayout>
#include <QVBoxLayout>
#include <QString>
#include "confidenceInterval.h"

MainWindow::MainWindow(QWidget *parent) : QWidget(parent) {
    setWindowTitle("Confidence Interval Calculator");
    resize(450,300);
    meanBox = new QDoubleSpinBox;
    meanBox->setRange(-1000000.0,1000000.0);
    meanBox->setDecimals(6);
    stdDevBox = new QDoubleSpinBox;
    stdDevBox->setRange(0.0,1000000.0);
    stdDevBox->setDecimals(6);
    sizeBox = new QSpinBox;
    sizeBox->setRange(1,100000000);
    confidenceBox = new QDoubleSpinBox;
    confidenceBox->setRange(0.01,0.9999);
    confidenceBox->setDecimals(4);
    confidenceBox->setSingleStep(0.01);
    confidenceBox->setValue(0.95);
    QPushButton* calculateButton = new QPushButton("Calculate");
    zLabel = new QLabel("-");
    seLabel = new QLabel("-");
    lowerLabel = new QLabel("-");
    upperLabel = new QLabel("-");
    auto *formLayout = new QFormLayout;
    formLayout->addRow("Population Mean (x̄):", meanBox);
    formLayout->addRow("Standard Deviation (σ):", stdDevBox);
    formLayout->addRow("Population Size (n):", sizeBox);
    formLayout->addRow("Confidence Level:", confidenceBox);
    auto *resultsLayout = new QFormLayout;
    resultsLayout->addRow("z Critical Value:", zLabel);
    resultsLayout->addRow("Estimated SE:", seLabel);
    resultsLayout->addRow("Lower Bound:", lowerLabel);
    resultsLayout->addRow("Upper Bound:", upperLabel);
    auto *mainLayout = new QVBoxLayout;
    mainLayout->addLayout(formLayout);
    mainLayout->addWidget(calculateButton);
    mainLayout->addLayout(resultsLayout);
    setLayout(mainLayout);
    connect(calculateButton,&QPushButton::clicked,this,&MainWindow::calculateInterval);
}

void MainWindow::calculateInterval() {
    double mean = meanBox->value();
    double stdDev = stdDevBox->value();
    int size = sizeBox->value();
    double confidenceLevel = confidenceBox->value();
    ConfidenceInterval ci = confidenceInterval(mean,stdDev,size,confidenceLevel);
    zLabel->setText(QString::number(ci.zCritical,'f'));
    seLabel->setText(QString::number(ci.standardError, 'f', 6));
    lowerLabel->setText(QString::number(ci.lower, 'f', 6));
    upperLabel->setText(QString::number(ci.upper, 'f', 6));
}